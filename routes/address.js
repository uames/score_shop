import Rst from '../utils/result';
import Address, {entity} from '../models/address';
import Users from '../models/users';
import { getSidQuery,getQueryObj } from '../service/user';
import { checkAdminLogin as checkALogin } from '../models/admin';
import { checkUserLogin as checkULogin } from '../models/users';

const {router,entity:postAddress} = Rst.initRoute({
  prefix:'/address',
  entity:{
    ...entity,
    status: 0
  }
});
// 接口说明 items/show
const show = ()=>{
  return {
    "GET  /address" : "用户获取自己地址列表",
    "GET  /address/:id" : "用户根据id获取单个地址信息",
    "POST /address" : "用户[新增]地址",
    "PUT  /address" : "用户[修改]单条地址数据",
    "PUT  /address/on/:id" : "用户设置默认地址, id为要设置的address的id",
    "DEL  /address" : {说明:"删除地址",参数:{"body中的数据":"[要删除的id数组]"}}
  }
}

// 用户获取自己地址列表
router.get('/', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    let q={}
    q.where = {user_id:user.id}
    ctx.response.body = await Address.retrieve({query:q}); // q.page, q.pSize, q.keyword, q.order
  }});
});
router.get('/:id', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    if(ctx.params.id=='show'){
      ctx.response.body = show();
    }else {
      ctx.response.body = await Address.retrieve({id:ctx.params.id});
    }
  }});
});

// 用户新增地址
router.post('/', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var body = ctx.request.body;
    var address = await Address.create({...body, user_id: user.id, status: 0})
    if(address && address.id){
      var _r = Rst.suc()
      ctx.response.body = {id: address.id, ..._r};
    }
  }});
});
router.put('/', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var body = ctx.request.body;
    var status = body.status;
    delete body.status;
    var res = await Address.update(body)
    // if(status){
    //
    // }
    Rst.putRst(res, ctx);
  }});
});
// 这里修改用户默认地址
// 1.将address表中要改为默认地址的status置为1, 将该用户address表中其它数据status置为0.
// 2.将要设置的默认地址报错到user表中该用户的address字段中
router.put('/on', async (ctx, next) => {
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var address_id = ctx.request.body.id
    var a = (await Address.retrieve({query:{where:{id:address_id,user_id:user.id}}}))[0]; // 取出当前要设为默认的地址数据
    if(a && a.id>0){
      if(a.status==1){
        ctx.response.body = Rst.suc('该地址已是默认地址');
      }else {
        var res = await Address.chgStatus({status:0,where:{user_id:user.id}}) // 先将该用户所有地址status置为0
        if(Rst.putRst(res, ctx)){
          res = await Address.chgStatus({where:{id:address_id, user_id:user.id},status:1}) // 再将选中的id的status置为1
          if(res && res[0]>0){
            res = await Users.update({id:user.id, address:a.province+" "+a.city+" "+a.district+" "+a.details});
            // TODO 此处应该清一次该id在 models/users 中的 IDS 的缓存,避免修改后关闭网页再重新打开的时候显示的不是最新的默认地址!
            Rst.putRst(res, ctx);
          }else{
            ctx.response.body = Rst.fail(res);
          }
        }
      }
    }else {
      ctx.response.body = Rst.fail('该id对应的地址非该用户地址或该数据不存在');
    }

  }});
});

router.del('/', async (ctx, next)=>{
  await checkULogin(ctx).then(async ({flag,user})=>{ if(flag){
    var {ids} = ctx.request.body;
    var res = await Address.del(ids)
    Rst.putRst([res], ctx);
  }});
});

module.exports = router
