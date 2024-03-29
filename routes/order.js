import Rst from '../utils/result';
import Order, {entity} from '../models/order';
import Activity from '../models/activity';
import request from 'request'
import { fetchPost, getSid, getSidQuery,getQueryObj } from '../service/user';
import Users, { operateIDS, checkUserLogin as checkULogin } from '../models/users';
import { checkAdminLogin as checkALogin } from '../models/admin';

const {router,entity:postOrder} = Rst.initRoute({
  prefix:'/order',
  entity
});
// 接口说明 items/show
const show = ()=>{
  return {
    "GET  /order" : {限制:"必须普通用户登录才能调用",example: "/order?page=1&pSize=10&keyword=书架&order=price desc", 成功:{errCode:0},失败:{errCode:1,msg:"失败原因"}},
    "GET  /order/all" : {限制:"必须管理员登录才能调用", 参数:"与 GET  /order 相同", 成功:{errCode:0},失败:{errCode:1,msg:"失败原因"}},
    "GET  /order/:id" : {example: "/items/1", "成功":{id:1, ...postOrder}, "备注":"若为空对象{},则表示该id对应的商品不存在"},
    "POST /order" : {参数:postOrder, 成功:{errCode:0,id:"新建的商品的id"},失败:{errCode:1,msg:"失败原因"}},
    "PUT  /order/status/:status" : {参数:"body内容:id数组[1,2,3]或[1],或单个的id如1,:status为订单状态值",成功:{errCode:0},失败:{errCode:1,msg:"失败原因"}},
    "DEL  /order" : {参数:"与/order/status/:status相同", 成功:{errCode:0},失败:{errCode:1,msg:"失败原因"}}
  }
}
// 用户获取自己 id 和 sid 下的所有订单
router.get('/', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    let q=ctx.query
    q.where = {user_id:user.id, sid: user.sid, status:{$gt: -1}} // status==-1 为已删除的订单
    ctx.body = await Order.retrieve({query:getQueryObj(q)}); // q.page, q.pSize, q.keyword, q.order
  }});
});
// 管理员获取自己 sid 下的所有订单
router.get('/all', async (ctx, next) => {
  await checkALogin(ctx).then(async ({flag,admin})=>{ if(flag){
    let q={where:{}, ...ctx.query}
    if(admin.sid>0){
      q.where = {sid: admin.sid};
    }
    q.where.status = {$gt: -1} // status==-1 为已删除的订单
    ctx.body = await Order.retrieve({query:getQueryObj(q)}); // q.page, q.pSize, q.keyword, q.order
  }});
});
// 取消订单有两种, 一种是要调用api_post, 另一种是不存在api_post的
// status : -1已删除订单(不可见),0订单已取消
// 订单的取消操作, 这里只是发起请求第三方的接口, 真正取消是由第三方接口调用 /order/cancelOrder 接口
// 这里建议使用两步验证: 返回积分的时候, 要将积分同步到接入积分商城的系统,
router.put('/cancel', async (ctx, next) => {
  // 这里不将 order status 改为 -1, 只负责调用 同步积分的接口(api_post) 并传递 orderId
  // 然后由(api_post)调用 /order/cancelOrder/:id/:phone/:checkpwd
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var {id} = ctx.request.body;
    var ord = await Order.retrieve({id})
    if(!ord.id){
      ctx.body = Rst.fail("订单不存在")
    }else if (ord.status==0) {
      ctx.body = Rst.fail("订单已取消")

    }else if(ord.user_id == user.id && ord.sid == user.sid){
      var acty = await Activity.retrieve({id:user.sid});
      if(acty.id>0){
        var {api_post,sign} = acty;
        // 取消订单有两种, 一种是要调用api_post, 另一种是不存在api_post的 TODO
        // 区别就是, 存在api_post的系统, 有记录用户使用的积分, 而不存在api_post的系统, 用户使用的积分记录在积分商城,
        // 不存在api_post的系统, 只提供api_get接口获取该用户获取过的总积分(即包含已消耗的积分),需要减去使用了的积分才是该用户当前积分
        if(sign=="lecture" || sign=="test"){
          var uri = `/order/cancelOrder/${ord.id}/${ord.phone}/${user.checkpwd}/${sign}`
          await new Promise((resolve, reject) => {
            request.get(process.env.ORIGIN + uri, async (error, response, data)=>{
              // 这里将用 user.used_balance 减掉 data.balance 作为 used_balance 最新的值
              if(user.used_balance > data.balance){
                user.used_balance -= data.balance
              }else {
                user.used_balance = 0
              }
              var uRst = await Users.update({id:user.id, used_balance:user.used_balance})
              if(uRst[0]>0){
                ctx.body = Rst.suc("取消成功")
              }else {
                ctx.body = Rst.suc("取消失败")
              }
              resolve()
            })
          })
        }else {
          await fetchPost({ctx, api_post, phone:user.phone, checkpwd:user.checkpwd, sign, orderId:id, callBackFn:async (data)=>{
            ctx.body = Rst.suc("取消成功")
          }})
        }
      }else {
        ctx.body = Rst.fail("活动不存在")
      }

    }else {
      ctx.body = Rst.fail(`您没有权限取消此订单uid:${user.id}==ouid:${ord.user_id}, osid:${ord.sid}==usid:${user.sid}`)
    }
  }});
});
// 提供给第三方系统取消订单, 除了修改status之外, 还需要将 订单 包含的积分返还给用户!
// 若第三方系统不调用此接口,则需要在/order/cancel接口加入该系统的sign值作为例外,并在该处调用此接口
router.get('/cancelOrder/:orderId/:phone/:checkpwd/:sign', async (ctx, next) => {
  // 检查 phone 和 checkpwd 和 sign 对应的用户是否存在, 获取其user_id
  // 然后将 user_id 及 orderId 对应的 status 改为0, 将 price 作为 balance 的值返回
  var {orderId, phone, checkpwd, sign} = ctx.params
  var activitys = await Activity.retrieve({query:{where:{sign}}});
  if(activitys.length>0){
    var user = await Users.retrieve({query:{where:{phone,checkpwd,sid:activitys[0].id}}});
    if(user.length>0 && user[0].id){
      user = user[0]
      var ord = await Order.retrieve({id:orderId, user_id:user.id})
      // 若修改前, orderId 对应的 status 的值为0 或 -1, 则返回的 balance 值为0
      if(!ord.id>0 || ord.status==0 || ord.status==-1){
        ctx.body = {balance:0, ...(Rst.fail("order status 已经是:"+ord.status))}
      }else {
        // user.balance = user.balance + ord.price
        // var uRst = await Users.update(user)
        // var oRst = await Order.update({...ord, status:0})
        var uRst = await Users.update({id:user.id, balance:user.balance + ord.price})
        var oRst = await Order.update({id:ord.id, status:0})
        if(uRst[0]>0 && oRst[0]>0){
          // 清除缓存中的该 user 下次获取时会从数据库取得最新的数据
          operateIDS({id:user.id},false);
          ctx.body = {balance:ord.price, ...(Rst.suc())}
        }else{
          if(oRst[0]==0){
            Rst.log({ content:`用户id:${user.id}取消订单id:${ord.id}时,该订单不存在或已取消(已取消的在前面有验证,除非有两次调用!)`,
               type:1, tag:"[/order/cancelOrder 01]" });
          }else {
            Rst.log({ content:`用户id:${user.id}取消订单id:${ord.id}时,更新user结果为${uRst},未知错误(该错误逻辑上不会出现)`,
               type:1, tag:"[/order/cancelOrder 02]" });
          }
          ctx.body = {balance:0}
        }
      }
    }else {
      ctx.body = Rst.fail("帐号或密码错误",401)
    }
  }else {
    ctx.body = Rst.fail("sign对应的活动不存在")
  }
});


// 用户获取自己 id 和 sid 下的所有订单
router.get('/:id', async (ctx, next) => {
  if(ctx.params.id=='show'){
    ctx.body = show();
  }else {
    await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
      ctx.body = await Order.retrieve({id:ctx.params.id});
    }});
  }
});
// 用户生成订单, 需要减掉用户相应的积分
router.post('/', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var body = ctx.request.body;
    if(user.balance >= body.price){

      var {api_post, sign} = await Activity.retrieve({id:user.sid});
      var orderPost = async () => {
        // TODO 这里可能需要把 缓存的 user 数据删除, 或更新其缓存的 balance和used_balance
        var order = await Order.create({...body, sid: user.sid, user_id: user.id, status: 1})
        await Users.update({id:user.id, balance:user.balance - body.price, used_balance: user.used_balance + body.price})
        ctx.body = {id: order.id, ...(Rst.suc("添加订单成功"))}
      }
      if(sign=="lecture" || sign=="test"){
        await orderPost()
      } else {
        await fetchPost({ctx, api_post, phone:user.phone, checkpwd:user.checkpwd, sign, balance: body.price, callBackFn:async (data)=>{
          // 第三方系统已成功更新积分, 可以进行本地操作
          await orderPost()
        }})
      }
    }else {
      ctx.body = Rst.fail("积分余额不足")
    }
  }});
});
router.put('/status/:status', async (ctx, next) => {
  var status = ctx.params.status
  if(status==-1 || status==0){
    ctx.body = Rst.fail("取消或删除订单请使用专用接口")
  }if(status==2){
    ctx.body = Rst.fail("该订单已发货,若要取消,请收货后再申请退货")
  }else {
    const setStatus = async (sid)=>{
      var ids = ctx.request.body;
      var res = await Order.chgStatus({ids, status:status,sid})
      Rst.putRst(res, ctx);
    }
    const sid = await getSid(ctx.cookies);

    if(sid==-1){
      ctx.body = Rst.fail("请先登录", 401)
    }else {
      await setStatus(sid)
    }
  }

});
// 删除订单只是将 status 值改为 -1
// TODO 此处应加上订单状态为 0(订单已取消) 或者 3(订单已完成) 的订单才能删除的筛选条件,
// 并获取修改的数量与ids长度对比, 若修改的数量小于ids长度,则返回 "状态非已取消或已完成的订单不可删除"
router.del('/', async (ctx, next)=>{
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var ids = ctx.request.body;
    var where = {ids, status:-1}
    if(user.sid>0){
      where.sid = user.sid
    }
    var res = await Order.chgStatus(where)
    Rst.putRst([res], ctx);
  }});
});

module.exports = router
