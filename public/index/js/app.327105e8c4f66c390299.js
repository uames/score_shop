webpackJsonp([1],[,,,,,,function(t,e,s){"use strict";var i=s(26),n=s.n(i),a=s(5),r=s(129),o=s(106),d=s.n(o);a.default.use(r.a);var c=location.host.match("localhost")||location.host.match("8080")?"/api":"/shop",u=["post","get","delete","put"],l={order:"/order",items:"/items",users:"/users",address:"/address",me:"/users/me"},v=function(t,e){var s={};for(var i in t)for(var n in e){var a=e[n]+i[0].toUpperCase()+i.slice(1);s[a]={url:t[i],method:e[n]}}return s}(l,u),p={userLogin:{url:"/users/jumpLogin/test123456/18825053886/654321",method:"get"},putOrderStatus:{url:"/order/status",method:"put",rest:!0},addressOn:{url:"/address/on",method:"put"}},f={};n()(f,v,p);var m={};for(var h in f)!function(){var t=f[h],e=t.url,s=t.method,i=t.rest;m[h]=function(t){return i?"delete"===s?a.default.http[s](c+e+"/"+t.url,t):a.default.http[s](c+e+"/"+t.url,t.body):"delete"===s?a.default.http[s](c+e,{body:t}):"get"!==s?a.default.http[s](c+e,t):a.default.http[s](c+e+"?"+d.a.stringify(t))}}();e.a=m},function(t,e,s){"use strict";function i(t,e){t.errCode?s.i(r.Toast)(t.msg):e(t)}function n(t,e){return t.filter(function(t){return t.id!==e})}e.a=i,e.b=n;var a=s(61),r=(s.n(a),s(4));s.n(r)},,,,,,,function(t,e,s){"use strict";var i=s(5),n=s(130),a=s(110),r=s.n(a),o=s(112),d=s.n(o),c=s(111),u=s.n(c),l=s(115),v=s.n(l),p=s(116),f=s.n(p),m=s(114),h=s.n(m),_=s(113),g=s.n(_),y=s(118),b=s.n(y),k=s(117),C=s.n(k);i.default.use(n.a),e.a=new n.a({routes:[{path:"/login",name:"Index",component:r.a},{path:"/items",name:"items",component:d.a},{path:"/ItemDetail",name:"itemDetail",component:u.a},{path:"/Order",name:"Order",component:v.a},{path:"/paySuccess",name:"paySuccess",component:f.a},{path:"/MyOrder",name:"MyOrder",component:h.a},{path:"/me",name:"me",component:g.a},{path:"/address",name:"address",component:b.a},{path:"/addAddress",name:"addAddress",component:C.a}]})},,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";var i=s(5),n=s(39),a=s(6),r=s(7),o=s(14),d=s(46),c=s(45),u=s(48),l=s(47),v=s(4);s.n(v);i.default.use(n.a);var p=new n.a.Store({state:{login:!1},mutations:{loginSuccess:function(t,e){t.login=!0}},actions:{userLogin:function(t,e){var i=t.commit;t.state;a.a.userLogin().then(function(t){var e=t.body;s.i(r.a)(e,function(){i("loginSuccess"),o.a.push("/items")})})},toast:function(t,e){var i=(t.commit,t.state,e.msg);s.i(v.Toast)(i)}},modules:{items:d.a,address:c.a,order:u.a,me:l.a}});e.a=p},function(t,e){},function(t,e,s){function i(t){s(96)}var n=s(0)(s(49),s(119),i,null,null);t.exports=n.exports},,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(5),n=s(42),a=s.n(n),r=s(14),o=s(40),d=s(41),c=(s.n(d),s(4)),u=s.n(c);i.default.config.productionTip=!1,i.default.use(u.a),new i.default({el:"#app",router:r.a,store:o.a,template:"<App/>",components:{App:a.a}})},function(t,e,s){"use strict";var i=s(6),n=s(7),a=s(4),r=(s.n(a),function(t){var e=t.body,a=t.status,r=t.id;s.i(n.a)(e,function(){a?i.a.addressOn({id:r}).then(function(t){var e=t.body;s.i(n.a)(e,function(){history.back()})}):history.back()})});e.a={state:{list:[],loading:!0},mutations:{listAddress:function(t,e){t.loading=e.loading,t.list=e.list}},actions:{getAddress:function(t){var e=t.commit;t.state;i.a.getAddress().then(function(t){var i=t.body;s.i(n.a)(i,function(){e("listAddress",{list:i})})})},postAddress:function(t,e){t.commit,t.state;a.Indicator.open(),i.a.postAddress(e).then(function(t){var s=t.body;r({body:s,status:e.status,id:s.id}),a.Indicator.close()})},putAddress:function(t,e){t.commit,t.state;a.Indicator.open(),i.a.putAddress(e).then(function(t){var s=t.body;r({body:s,status:e.status,id:e.id}),a.Indicator.close()})},deleteAddress:function(t,e){var r=t.commit,o=t.state;a.MessageBox.confirm("确定删除该地址?").then(function(t){var a=o.list;i.a.deleteAddress(e).then(function(t){var i=t.body;s.i(n.a)(i,function(){var t=a.filter(function(t){return t.id!==e.ids[0]});r("listAddress",{list:t})})})})},addressOn:function(t,e){var r=t.commit,o=t.state,d=o.list;r("listAddress",{list:d,loading:!0}),i.a.addressOn(e).then(function(t){var i=t.body;s.i(n.a)(i,function(){var t=d.map(function(t){return t.status&&(t.status=0),t.id===e.id&&(t.status=1),t});s.i(a.Toast)(i.msg),r("listAddress",{list:t,loading:!1})})})}}}},function(t,e,s){"use strict";var i=s(25),n=s.n(i),a=s(15),r=s.n(a),o=s(6),d=s(7),c=function(t,e,s,i){for(var n=[],a=0;a<e;a++)n.push.apply(n,t["page"+(a+1)]);i("listItems",r()({list:n},s))};e.a={state:{page:void 0,keyword:void 0,list:[]},mutations:{listItems:function(t,e){t.list=e.list,e.keyword&&(t.keyword=e.keyword),e.page&&(t.page=e.page)}},actions:{getItems:function(t,e){var i=t.commit,a=(t.state,localStorage.items?JSON.parse(localStorage.items):{}),r=e&&e.page?e.page:1;e=e||{},(a.keyword!==e.keyword||1===r&&a&&a._time&&a._time<Date.now())&&(localStorage.items=void 0,a={});var u="page"+r;a&&a[u]&&a[u].length>0?c(a,r,e,i):o.a.getItems(e).then(function(t){var o=t.body;a[u]=o,a._time=Date.now()+18e4,a.page=r,a.keyword=e.keyword,localStorage.items=n()(a),s.i(d.a)(o,function(){c(a,r,e,i)})})}},getters:{listOfIntro:function(t,e){return t.list.map(function(t){return t.img=JSON.parse(t.specifications)[0].img[0],t})}}}},function(t,e,s){"use strict";var i=s(25),n=s.n(i),a=s(6),r=s(7);e.a={state:{me:{}},mutations:{listMe:function(t,e){t.me=e}},actions:{getMe:function(t,e){var i=t.commit,o=(t.state,localStorage.user);o=o?JSON.parse(o):void 0,o&&o._time>Date.now()?i("listMe",o):a.a.getMe(e).then(function(t){var e=t.body;s.i(r.a)(e,function(){e._time=Date.now()+6e4,localStorage.user=n()(e),i("listMe",e)})})}}}},function(t,e,s){"use strict";var i=s(15),n=s.n(i),a=s(6),r=s(7),o=s(14),d=s(4);s.n(d);e.a={state:{page:void 0,keyword:void 0,list:[]},mutations:{listOrder:function(t,e){t.list=e.list,e.page&&(t.page=e.page),e.keyword&&(t.keyword=e.keyword)}},actions:{getOrder:function(t,e){var i=t.commit;t.state;a.a.getOrder(e).then(function(t){var a=t.body;s.i(r.a)(a,function(){i("listOrder",n()({list:a},e))})})},postOrder:function(t,e){var i=t.commit,n=t.state,c=n.list;d.MessageBox.confirm("确定兑换该商品?").then(function(t){a.a.postOrder(e).then(function(t){var n=t.body;s.i(r.a)(n,function(){e.id=n.id,c.push(e),i("listOrder",{list:c}),o.a.push({path:"/paysuccess",query:e})})})})},putOrder:function(t,e){var i=t.commit,n=t.state,o=n.list;a.a.putOrder(e.body).then(function(t){var n=t.body;s.i(r.a)(n,function(){var t=o.map(function(t){return t.id===e.body[0]&&(t.status=e.url),t});i("listOrder",{list:t})})})},cancelOrder:function(t,e){var i=t.commit,n=t.state,o=n.list;a.a.cancelOrder(e).then(function(t){var n=t.body;s.i(r.a)(n,function(){var t=o.map(function(t){return t.id===e.id&&(t.status=0),t});i("listOrder",{list:t})})})},deleteOrder:function(t,e){var i=t.commit,n=t.state,o=n.list;a.a.deleteOrder(e).then(function(t){var n=t.body;s.i(r.a)(n,function(){i("listOrder",{list:s.i(r.b)(o,e[0])})})})},putOrderStatus:function(t,e){var i=t.commit,n=t.state,o=n.list;a.a.putOrderStatus({url:3,body:[e]}).then(function(t){var n=t.body;s.i(r.a)(n,function(){var t=o.map(function(t){return t.id===e&&(t.status=2),t});i("listOrder",{list:t})})})}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={beforeRouteEnter:function(t,e,s){s(function(t){t.$store.dispatch("userLogin")})}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{popup:!1,current:"0"}},computed:{goods:function(){var t=this.$route.query.id,e=this.$store.state.items.list;if(!e||0===e.length)for(var s=localStorage.items?JSON.parse(localStorage.items):{},i=0;i<s.page;i++)e.push.apply(e,s["page"+(i+1)]);var n=e.filter(function(e){return e.id===Number(t)})[0];return n||(n={}),n},cIdx:function(){"0"===this.current&&this.specName[0];var t=this.specName.indexOf(this.current);return-1===t?0:t},spec:function(){return this.goods&&this.goods.specifications?JSON.parse(this.goods.specifications):[]},specName:function(){return this.spec.map(function(t,e){return t.name})},imgs:function(){return this.spec[this.cIdx]?this.spec[this.cIdx].img:""},store:function(){return this.spec[this.cIdx]?this.spec[this.cIdx].store:"请不要直接使用本商品链接"},price:function(){return this.spec[this.cIdx]?this.spec[this.cIdx].price:"请不要直接使用本商品链接"}},methods:{onPopup:function(){this.popup=!0,"0"===this.current&&(this.current=this.specName[0])},createOrder:function(){var t=this.cIdx;this.$router.push({path:"/order",query:{item_id:this.goods.id,name:this.goods.name+" - "+this.spec[t].name,price:this.spec[t].price,img:this.spec[t].img[0]}})},back:function(){history.back()}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(15),n=s.n(i),a=s(39);e.default={computed:n()({},s.i(a.b)({list:"listOfIntro"}),{keyword:{get:function(){return this.$store.state.items.keyword},set:function(t){this.$store.dispatch("getItems",{keyword:t})}}}),beforeRouteEnter:function(t,e,s){s(function(t){t.$store.dispatch("getItems")})},methods:{gotoDetail:function(t){this.$router.push({path:"/ItemDetail",query:{id:t}})},buy:function(){this.$router.push("/items")},myInfo:function(){this.$router.push("/me")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{me:function(){return this.$store.state.me.me},loading:function(){return!this.$store.state.me.me.name}},beforeRouteEnter:function(t,e,s){s(function(t){t.$store.dispatch("getMe")})},methods:{buy:function(){this.$router.push("/items")},myInfo:function(){this.$router.push("/me")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{orders:function(){return this.$store.state.order.list}},beforeRouteEnter:function(t,e,s){document.title="我的订单",s(function(t){t.$store.dispatch("getOrder")})},methods:{confirm:function(t){this.$store.dispatch("putOrderStatus",t)},back:function(){history.back()}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},computed:{address:function(){return this.$store.state.address.list.filter(function(t){return t.status})[0]},allAddress:function(){var t=void 0===this.address?{}:this.address;return t.province+t.city+t.district+t.details},goods:function(){return this.$route.query}},beforeRouteEnter:function(t,e,s){s(function(t){t.$store.dispatch("getAddress")})},methods:{addAddress:function(){this.$store.state.address.list.length>0?this.$router.push("/address"):this.$router.push("/addAddress")},addressList:function(){this.$router.push("/address")},postOrder:function(){var t=this.address,e=this.goods,s=this.allAddress;void 0===t?this.$store.dispatch("toast",{msg:"请先完善地址信息"}):this.$store.dispatch("postOrder",{item_id:e.item_id,name:e.name,price:e.price,img:e.img,user_name:t.name,phone:t.phone,address:s})},back:function(){history.back()}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{order:function(){return this.$route.query}},methods:{index:function(){this.$router.push("/items")},seeOrder:function(){this.$router.push("/MyOrder")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(62),n=s.n(i),a={"四川":["凉山","资阳","成都","自贡","泸州","攀枝花","绵阳","德阳","遂宁","广元","乐山","内江","南充","宜宾","眉山","达州","广安","巴中","雅安","甘孜","阿坝"],"重庆":["酉阳","彭水","合川","永川","江津","南川","铜梁","大足","荣昌","璧山","长寿","綦江","潼南","梁平","城口","石柱","秀山","万州","渝中","涪陵","江北","大渡口","九龙坡","沙坪坝","北碚","南岸","黔江","巫溪","双桥","万盛","巴南","渝北","忠县","武隆","垫江","丰都","巫山","奉节","云阳","开县"],"陕西":["商洛","西安","宝鸡","铜川","渭南","咸阳","汉中","延安","安康","榆林"],"甘肃":["定西","庆阳","陇南","甘南","临夏","兰州","金昌","嘉峪关","天水","白银","张掖","武威","酒泉","平凉"],"青海":["海南","果洛","玉树","海东","海北","黄南","海西","西宁"],"宁夏":["银川","吴忠","石嘴山","中卫","固原"],"云南":["红河","文山","楚雄","怒江","德宏","西双版纳","大理","迪庆","昆明","曲靖","保山","玉溪","丽江","昭通","临沧","普洱"],"澳门":["澳门"],"贵州":["毕节","黔东南","黔南","铜仁","黔西南","贵阳","遵义","六盘水","安顺"],"香港":["香港"],"辽宁":["盘锦","辽阳","朝阳","铁岭","葫芦岛","沈阳","鞍山","大连","本溪","抚顺","锦州","丹东","阜新","营口"],"吉林":["延边","长春","四平","吉林","通化","辽源","松原","白山","白城"],"黑龙江":[" 黑河"," 牡丹江"," 绥化"," 哈尔滨"," 大兴安岭"," 鸡西"," 齐齐哈尔"," 双鸭山"," 鹤岗"," 伊春"," 大庆"," 七台河"," 佳木斯"],"海南":["乐东","昌江","白沙","西沙","琼中","保亭","陵水","中沙","南沙","海口","三亚","五指山","儋州","琼海","文昌","东方","万宁","定安","屯昌","澄迈","临高"],"广东":["揭阳","中山","广州","深圳","韶关","汕头","珠海","江门","佛山","茂名","湛江","惠州","肇庆","汕尾","梅州","阳江","河源","东莞","清远","潮州","云浮"],"广西":["贺州","百色","来宾","河池","崇左","南宁","桂林","柳州","北海","梧州","钦州","防城港","玉林","贵港"],"湖北":["黄冈","荆州","随州","咸宁","神农架","恩施","武汉","十堰","黄石","宜昌","鄂州","襄樊","孝感","荆门","潜江","仙桃","天门"],"湖南":["永州","郴州","娄底","怀化","湘西","长沙","湘潭","株洲","邵阳","衡阳","常德","岳阳","益阳","张家界"],"河南":["漯河","许昌","南阳","三门峡","信阳","商丘","驻马店","周口","济源","郑州","洛阳","开封","安阳","平顶山","新乡","鹤壁","濮阳","焦作"],"台湾":["屏东县","澎湖县","台东县","花莲县","台北市","基隆市","高雄市","台南市","台中市","嘉义市","新竹市","宜兰县","台北县","新竹县","桃园县","台中县","苗栗县","南投县","彰化县","嘉义县","云林县","高雄县","台南县"],"北京":["房山","大兴","顺义","通州","昌平","密云","平谷","延庆","东城","怀柔","崇文","西城","朝阳","宣武","石景山","丰台","门头沟","海淀"],"河北":["衡水","廊坊","石家庄","秦皇岛","唐山","邢台","邯郸","张家口","保定","沧州","承德"],"天津":["西青","东丽","北辰","津南","宁河","武清","静海","宝坻","和平","河西","河东","河北","南开","塘沽","红桥","大港","汉沽","蓟县"],"内蒙古":[" 锡林郭勒"," 兴安"," 阿拉善"," 呼和浩特"," 乌海"," 包头"," 通辽"," 赤峰"," 呼伦贝尔"," 鄂尔多斯"," 乌兰察布"," 巴彦淖尔"],"山西":["吕梁","临汾","太原","阳泉","大同","晋城","长治","晋中","朔州","忻州","运城"],"浙江":["丽水","台州","杭州","温州","宁波","湖州","嘉兴","金华","绍兴","舟山","衢州"],"江苏":["镇江","扬州","宿迁","泰州","南京","徐州","无锡","苏州","常州","连云港","南通","盐城","淮安"],"上海":["杨浦","南汇","宝山","闵行","浦东新","嘉定","松江","金山","崇明","奉贤","青浦","黄浦","卢湾","长宁","徐汇","普陀","静安","虹口","闸北"],"山东":["日照","威海","临沂","莱芜","聊城","德州","菏泽","滨州","济南","淄博","青岛","东营","枣庄","潍坊","烟台","泰安","济宁"],"江西":["上饶","抚州","南昌","萍乡","景德镇","新余","九江","赣州","鹰潭","宜春","吉安"],"福建":["福州","莆田","厦门","泉州","三明","南平","漳州","宁德","龙岩"],"安徽":["滁州","黄山","宿州","阜阳","六安","巢湖","池州","亳州","宣城","合肥","蚌埠","芜湖","马鞍山","淮南","铜陵","淮北","安庆"],"西藏":["那曲","阿里","林芝","昌都","山南","日喀则","拉萨"],"新疆":["博尔塔拉","吐鲁番","哈密","昌吉","和田","喀什","克孜勒苏","巴音郭楞","阿克苏","伊犁","塔城","乌鲁木齐","阿勒泰","克拉玛依","石河子","图木舒克","阿拉尔","五家渠"]},r=function(t,e,s){setTimeout(function(){t.setSlotValue(s,e)},50)},o=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),s=window.location.hash.substr(1).match(e);return null!=s?decodeURI(s[2]):null};e.default={data:function(){var t=this.$route.query,e=t.status;return"string"==typeof e&&(e="false"!==e),{id:t.id,val:[t.province,t.city],username:t.name,phone:t.phone,district:t.district,details:t.details,status:e}},computed:{slots:function(){var t=o("province");return t=void 0===t?"广东":t,[{flex:1,values:["四川","重庆","广东","陕西","甘肃","青海","宁夏","云南","澳门","贵州","香港","辽宁","吉林","黑龙江","海南","广西","湖北","湖南","河南","台湾","北京","河北","天津","内蒙古","山西","浙江","江苏","上海","山东","江西","福建","安徽","西藏","新疆"],textAlign:"right"},{divider:!0,content:"-"},{flex:1,values:a[t],textAlign:"left"}]}},methods:{onValuesChange:function(t,e){this.val=e[0]&&e[1]?e:this.val,void 0===e[0]?r(t,this.val[0]?this.val[0]:"广东",0):void 0===e[1]?r(t,this.val[1]?this.val[1]:"广州",1):t.setSlotValues(1,a[e[0]])},postAddress:function(){var t=this.username,e=this.phone,s=n()(this.val,2),i=s[0],a=s[1],r=this.district,o=this.details,d=this.status;if(void 0===t||""===t)this.$store.dispatch("toast",{msg:"请填写收货人姓名"});else if(/^1[0-9]{10}$/.test(e))if(void 0===r||""===r)this.$store.dispatch("toast",{msg:"请填写区镇"});else if(void 0===o||""===o)this.$store.dispatch("toast",{msg:"请填写街道地址"});else{var c={name:t,phone:e,province:i,city:a,district:r,details:o,status:d};this.id&&this.id>0?(c.id=this.id,this.$store.dispatch("putAddress",c)):this.$store.dispatch("postAddress",c)}else this.$store.dispatch("toast",{msg:"请填写正确的手机号码"})},back:function(){history.back()}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{list:function(){return this.$store.state.address.list},loading:function(){return this.$store.state.address.loading}},beforeRouteEnter:function(t,e,s){document.title="管理收货地址",s(function(t){t.$store.dispatch("getAddress")})},methods:{deleteAddress:function(t){this.$store.dispatch("deleteAddress",{ids:[t]})},addressOn:function(t){t.status||this.$store.dispatch("addressOn",{id:t.id})},editAddress:function(t){this.$router.push({path:"/addAddress",query:t})},addAddress:function(){this.$router.push("/addAddress")},back:function(){history.back()}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,function(t,e,s){var i=s(0)(s(50),s(121),null,null,null);t.exports=i.exports},function(t,e,s){function i(t){s(101)}var n=s(0)(s(51),s(125),i,null,null);t.exports=n.exports},function(t,e,s){function i(t){s(103)}var n=s(0)(s(52),s(127),i,null,null);t.exports=n.exports},function(t,e,s){function i(t){s(104)}var n=s(0)(s(53),s(128),i,"data-v-72094a9a",null);t.exports=n.exports},function(t,e,s){function i(t){s(99)}var n=s(0)(s(54),s(123),i,"data-v-399e09f7",null);t.exports=n.exports},function(t,e,s){function i(t){s(98)}var n=s(0)(s(55),s(122),i,"data-v-36a48983",null);t.exports=n.exports},function(t,e,s){function i(t){s(102)}var n=s(0)(s(56),s(126),i,null,null);t.exports=n.exports},function(t,e,s){function i(t){s(97)}var n=s(0)(s(57),s(120),i,null,null);t.exports=n.exports},function(t,e,s){function i(t){s(100)}var n=s(0)(s(58),s(124),i,"data-v-47eb0009",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",[s("mt-button",{attrs:{size:"large"},on:{click:t.back}},[t._v("返回")])],1),t._v(" "),s("mt-field",{attrs:{label:"收货人",placeholder:"收货人"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),s("mt-field",{attrs:{label:"联系电话",placeholder:"联系电话",type:"number"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t._v(" "),s("mt-field",{attrs:{label:"选择城市",type:"text",value:"",readonly:""}}),t._v(" "),s("mt-picker",{attrs:{slots:t.slots,visibleItemCount:5},on:{change:t.onValuesChange}}),t._v(" "),s("mt-field",{attrs:{label:"区镇",placeholder:"请填写所在区镇"},model:{value:t.district,callback:function(e){t.district=e},expression:"district"}}),t._v(" "),s("mt-field",{attrs:{label:"街道地址",placeholder:"请填写街道地址",type:"textarea",rows:"4"},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}}),t._v(" "),!t.id>0?s("mt-cell",{attrs:{title:"设为默认"}},[s("mt-switch",{model:{value:t.status,callback:function(e){t.status=e},expression:"status"}})],1):t._e(),t._v(" "),s("mt-button",{staticClass:"saveBtn",attrs:{type:"primary",size:"large"},on:{click:t.postAddress}},[t._v("保存")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("mt-button",{attrs:{size:"large"},on:{click:t.back}},[t._v("返回")]),t._v(" "),t.address?t._e():s("div",{staticClass:"addressAdd"},[s("mt-button",{attrs:{size:"large"},on:{click:t.addAddress}},[t._v("设置收货地址")])],1),t._v(" "),t.address?s("div",{staticClass:"address",on:{click:t.addressList}},[s("div",{staticClass:"top"},[s("div",{staticClass:"user-name"},[t._v("收货人："+t._s(t.address.name))]),t._v(" "),s("div",{staticClass:"phone"},[t._v(t._s(t.address.phone))])]),t._v(" "),s("div",{staticClass:"middle"},[t._v("\n      收货地址："+t._s(t.allAddress)+"\n    ")]),t._v(" "),s("i",{staticClass:"mint-cell-arrow-right"})]):t._e(),t._v(" "),s("div",{staticClass:"goods"},[s("div",{staticClass:"goods-img",style:{backgroundImage:"url("+t.goods.img+")"}}),t._v(" "),s("div",{staticClass:"goods-info"},[s("div",{staticClass:"goods-n"},[t._v(t._s(t.goods.name))]),t._v(" "),s("div",{staticClass:"goods-price"},[t._v("价格: ¥"+t._s(t.goods.price))])])]),t._v(" "),s("mt-button",{staticClass:"submit-order",attrs:{type:"primary",size:"large"},on:{click:t.postOrder}},[t._v("确认兑换")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.orders.length>0?s("div",[s("div",[s("mt-button",{attrs:{size:"large"},on:{click:t.back}},[t._v("返回")])],1),t._v(" "),t._l(t.orders,function(e){return s("div",{key:e.id,staticClass:"order-wrap"},[s("div",{staticClass:"order"},[s("div",{staticClass:"order-img",style:{backgroundImage:"url("+e.img+")"}}),t._v(" "),s("div",{staticClass:"order-right"},[s("div",{staticClass:"order-name"},[t._v("\n            "+t._s(e.name)+"\n          ")]),t._v(" "),s("div",{staticClass:"order-price"},[t._v("\n            ¥"+t._s(e.price)+"\n          ")])])]),t._v(" "),s("div",{staticClass:"op"},[0==e.status?s("mt-button",{attrs:{size:"small",disabled:""}},[t._v("已取消")]):t._e(),t._v(" "),1==e.status?s("mt-button",{attrs:{size:"small",disabled:""}},[t._v("待发货")]):t._e(),t._v(" "),2==e.status?s("mt-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.confirm(e.id)}}},[t._v("确认收货")]):t._e(),t._v(" "),3==e.status?s("mt-button",{attrs:{size:"small",disabled:""}},[t._v("已完成")]):t._e()],1)])})],2):t._e(),t._v(" "),0==t.orders.length?s("div",{staticClass:"no-orders"},[t._v("\n    还没有订单哦~\n    "),s("div",{staticStyle:{marginTop:"20px"}},[s("mt-button",{attrs:{size:"small"},on:{click:t.back}},[t._v("返回")])],1)]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.loading?t._e():s("div",{staticClass:"container"},[s("div",[s("mt-button",{attrs:{size:"large"},on:{click:t.back}},[t._v("返回")])],1),t._v(" "),t._l(t.list,function(e){return s("div",{key:e.id,staticClass:"address-item"},[s("div",{staticClass:"top"},[s("div",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"phone"},[t._v(t._s(e.phone))])]),t._v(" "),s("div",{staticClass:"middle"},[t._v(t._s(e.province+e.city+e.district+e.details))]),t._v(" "),s("div",{staticClass:"bottom"},[e.status?s("mt-badge",{attrs:{type:"warning",size:"large"}},[t._v("默认地址")]):t._e(),t._v(" "),e.status?t._e():s("mt-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){t.addressOn(e)}}},[t._v("设为默认")]),t._v(" "),s("div",{staticClass:"op-panel"},[s("mt-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){t.editAddress(e)}}},[t._v("编辑")]),t._v(" "),s("mt-button",{attrs:{size:"small",plain:""},on:{click:function(s){t.deleteAddress(e.id)}}},[t._v("删除")])],1)],1)])}),t._v(" "),0==t.list.length?s("div",{staticClass:"no-address"},[t._v("\n      还没有收货地址哦~\n    ")]):t._e(),t._v(" "),s("div",{staticClass:"addressAdd"},[s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:t.addAddress}},[t._v("添加新地址")])],1)],2),t._v(" "),t.loading?s("div",{staticClass:"loading"},[s("mt-spinner",{staticClass:"loading2",attrs:{color:"#26a2ff",size:80,type:"fading-circle"}})],1):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"back",on:{click:t.back}}),t._v(" "),s("mt-swipe",{staticClass:"swipe",attrs:{auto:4e3}},t._l(t.imgs,function(t,e){return s("mt-swipe-item",{key:e,staticClass:"swipe-img",style:{backgroundImage:"url("+t+")"}})})),t._v(" "),s("mt-cell",{attrs:{title:"商品名称"}},[s("span",{staticClass:"goods-name"},[t._v(t._s(t.goods.name))])]),t._v(" "),s("mt-cell",{attrs:{title:"所需积分"}},[s("span",{staticClass:"goods-name"},[t._v(t._s(t.price))])]),t._v(" "),s("mt-cell",{attrs:{title:"库存"}},[s("span",{staticClass:"goods-name"},[t._v(t._s(t.store))])]),t._v(" "),s("mt-field",{attrs:{label:"商品详情",readonly:"",type:"textarea",rows:"6",value:t.goods.details}}),t._v(" "),s("footer",[s("div",{staticClass:"btn btn-buy",on:{click:t.onPopup}},[t._v("立即购买")])]),t._v(" "),s("mt-popup",{staticClass:"my-popup",attrs:{position:"bottom"},model:{value:t.popup,callback:function(e){t.popup=e},expression:"popup"}},[s("img",{staticClass:"goods-image",attrs:{src:t.spec[t.cIdx]?t.spec[t.cIdx].img[0]:""}}),t._v(" "),s("mt-radio",{attrs:{title:"规格",options:t.specName},model:{value:t.current,callback:function(e){t.current=e},expression:"current"}}),t._v(" "),s("mt-field",{attrs:{label:"所需积分",type:"number",value:t.price,readonly:""}}),t._v(" "),s("mt-field",{attrs:{label:"库存",type:"number",value:t.store,readonly:""}}),t._v(" "),s("div",{staticClass:"generate-order",on:{click:t.createOrder}},[t._v("确定")])],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pay-success"},[t._m(0),t._v(" "),s("div",{staticClass:"pay-success-body"},[s("div",{staticClass:"pay-info-card"},[s("mt-cell",{attrs:{title:"商品名称",label:t.order.name}}),t._v(" "),s("mt-cell",{attrs:{title:"地址",label:t.order.address}}),t._v(" "),s("mt-cell",{attrs:{title:"收货人",value:t.order.user_name}}),t._v(" "),s("mt-cell",{attrs:{title:"手机号",value:t.order.phone}})],1)]),t._v(" "),s("div",{staticClass:"pay-footer"},[s("div",{staticClass:"pay-footer-btn",on:{click:t.seeOrder}},[t._v("查看订单")]),t._v(" "),s("div",{staticClass:"pay-footer-btn",on:{click:t.index}},[t._v("返回首页")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pay-success-header"},[s("div",{staticClass:"pay-header-inner"},[s("div",{staticClass:"pay-header-inner-top"},[t._v("已成功兑换礼品")]),t._v(" "),s("div",{staticClass:"pay-header-inner-bottom"},[t._v("您的礼品正整装待发")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("mt-search",{attrs:{"cancel-text":"取消",placeholder:"搜索",show:!0},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},t._l(t.list,function(e){return s("div",{key:e.id,staticClass:"goods",on:{click:function(s){t.gotoDetail(e.id)}}},[s("div",{staticClass:"goods-img",style:{backgroundImage:"url("+e.img+")"}}),t._v(" "),s("div",{staticClass:"goods-info"},[s("div",{staticClass:"goods-title"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"goods-desc"},[t._v(t._s(e.description))])])])})),t._v(" "),s("div",{staticClass:"items-footer"},[s("div",{staticClass:"items-footer-btn",on:{click:t.buy}},[t._v("商品列表")]),t._v(" "),s("div",{staticClass:"items-footer-btn",on:{click:t.myInfo}},[t._v("我的信息")])]),t._v(" "),s("div")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.loading?t._e():s("div",[s("div",{staticClass:"me-header"},[s("div",{staticClass:"me-header-inner"},[s("div",{staticClass:"me-name"},[t._v("您好,"),s("span",{staticClass:"me-namew"},[t._v(t._s(t.me.name))])]),t._v(" "),s("div",{staticClass:"me-count"},[t._v("余额："+t._s(t.me.balance))])])]),t._v(" "),s("mt-cell",{attrs:{title:"我的订单","is-link":"",to:"/MyOrder"}}),t._v(" "),s("mt-cell",{attrs:{title:"我的收货地址","is-link":"",to:"/address"}}),t._v(" "),s("mt-cell",{attrs:{title:"积分兑换奖品规则","is-link":""}}),t._v(" "),s("div",{staticClass:"items-footer"},[s("div",{staticClass:"items-footer-btn",on:{click:t.buy}},[t._v("商品列表")]),t._v(" "),s("div",{staticClass:"items-footer-btn",on:{click:t.myInfo}},[t._v("我的信息")])])],1),t._v(" "),s("div",{staticClass:"loading"},[t.loading?s("mt-spinner",{staticClass:"loading2",attrs:{color:"#26a2ff",size:80,type:"fading-circle"}}):t._e()],1)])},staticRenderFns:[]}},,,,,function(t,e){}],[44]);
//# sourceMappingURL=app.327105e8c4f66c390299.js.map