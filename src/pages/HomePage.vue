<template>
 <p style="text-align: center;font-size: 18px;font-weight: bold"> <label for="" >产品选型智能推荐系统</label>
 </p>

  <!--  <Button type="primary" block @click="linkToCategory('切削液')">切削液</Button>
    <Button type="primary" block @click="linkToCategory('水基清洗剂')">水基清洗剂</Button>
    <Button type="primary" block >防锈剂</Button>
    <Button type="primary" block @click="linkToCategory('防锈油')" >防锈油</Button>
    <Button type="warning" block to="ListPage">更多</Button>-->
<!--  <Button type="warning" block @click="authorApi()">jsapi鉴权</Button>
  <Button type="warning" block @click="getImportantContent()">获取用户关重信息</Button>
  <Button type="warning" block @click="getImportantContent2()">获取用户关重信息</Button>-->
  <Grid border="true" column-num="2">
    <GridItem  @click="linkToCategory('切削液')"  >
      <Image src="https://img.yzcdn.cn/vant/apple-1.jpg"  style="width: 100%; height: 120px;"
      />
      <h1>切削液</h1>
    </GridItem>
    <GridItem  @click="linkToCategory('水基清洗剂')"  >
      <Image src="https://img.yzcdn.cn/vant/apple-2.jpg"  style="width: 100%; height: 120px;"
      />
      <h1>水基清洗剂</h1>
    </GridItem>
    <GridItem  @click="linkToCategory('防锈油')" >
      <Image src="https://img.yzcdn.cn/vant/apple-3.jpg"  style="width: 100%; height: 120px;"
      />
      <h1>防锈油(剂)</h1>
    </GridItem>
    <GridItem  url="/#/ListPage/"  >
      <Image src="https://img.yzcdn.cn/vant/apple-4.jpg"  style="width: 100%; height: 120px;"
      />
      <Button type="warning" block >更多</Button>
    </GridItem>
  </Grid>
</template>


<script>
import { Button,Grid,GridItem,Image} from 'vant';
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {inject, onBeforeMount, onMounted} from "vue";
import Axios from "@/plugins/axiosInstance";
// import async from "async";
export default {
  name: "HomePage",
  components: {
    Button,Grid,GridItem,Image
  },
setup() {
  //路由到selectCategory
  const router = useRouter()
  let config;

  // eslint-disable-next-line no-unused-vars
  let selectCategory = null;//进入的产品类别
  // eslint-disable-next-line no-unused-vars
  let isReconmend = false;//是否正在推荐的产品

  const linkToCategory = async (selectCategory) => {
    let isCancel = false;
 /*   //真机
      await dd.util.domainStorage.getItem({
      name: 'SelectCategory', // 存储信息的key值
      onSuccess: async function (info) {
        /!*{
             value: 'value' // 获取存储的信息
         }*!/
        alert(JSON.stringify(info));
        //info.value为空字符串代表未有存储值
        if (info.value !="" && info.value) {
          // selectCategory = info.value;
          if (selectCategory != info.value) {//选择了不同的产品类别
            if(confirm("上次未完成的产品推荐类别为："+info.value+"是否重新开始？")){
              // alert(isReconmend + info.value);
              await  onRefresh()
            }
            else{
              isCancel = true;
            }
          }
        }

        // getRankList(selectedIds.value)
        // alert(JSON.stringify(info));
      },
      onFail: async function (err){
        alert(JSON.stringify(err));
      }
    });
    if (isCancel) {
      return
    }
    await dd.util.domainStorage.setItem({
      name: 'SelectCategory', // 存储信息的key值
      value: selectCategory, // 存储信息的Value值
      onSuccess: function (info) {
        alert("selectCategory set:"+JSON.stringify(info));
      },
      onFail: function (err) {
        alert("fail1:" + JSON.stringify(err));
      }
    });*/
    await  router.push({
      // path:'/selectCategory',
      name: 'SelectCategory',
      params: {
        selectCategory
      },
      query: {
        selectCategory
      }
    })

  }

  //判断Storage里的数据，若存在则返回
  const   getDomainStorage = async ()=>{
    /*//真机
    await dd.util.domainStorage.getItem({
      name: 'SelectCategory', // 存储信息的key值
      onSuccess: function (info) {
        /!*{
             value: 'value' // 获取存储的信息
         }*!/
        alert("selectCategory get"+JSON.stringify(info));
        if (info.value != "") {
          selectCategory = info.value;
        }
        // getRankList(selectedIds.value)
        // alert(JSON.stringify(info));
      },
      onFail: function (err) {
      }
    });
    await dd.util.domainStorage.getItem({
      name: 'selectedValues', // 存储信息的key值
      onSuccess: function (info) {
        // alert("this")
        isReconmend = true;
      },
      onFail: function (err) {
      }
    });*/
  }
  // const reload = inject("reload");
  const onRefresh = () => {
   /* //真机
    dd.util.domainStorage.removeItem({
      name: 'selectedIds', // 存储信息的key值
      onSuccess: function (info) {
        alert("success1" + JSON.stringify(info));
      },
      onFail: function (err) {
        alert("fail1" + JSON.stringify(err));
      }
    });
    dd.util.domainStorage.removeItem({
      name: 'SelectCategory', // 存储信息的key值
      onSuccess: function (info) {
        alert("remove SelectCategory" + JSON.stringify(info));
      },
      onFail: function (err) {
        alert("fail1" + JSON.stringify(err));
      }
    });
    dd.util.domainStorage.removeItem({
      name: 'selectedValues', // 存储信息的key值
      onSuccess: function (info) {
        alert("success2" + JSON.stringify(info));
      },
      onFail: function (err) {
        alert("fail1" + JSON.stringify(err));
      }
    });
    dd.util.domainStorage.removeItem({
      name: 'markList', // 存储信息的key值
      onSuccess: function (info) {
        // alert("success"+JSON.stringify(info));
      },
      onFail: function (err) {
        alert("fail" + JSON.stringify(err));
      }
    });*/
    // reload()
  }

  onBeforeMount(async () => {
     await getDomainStorage();
     if (isReconmend && selectCategory!=null) {
       if(confirm("上一次产品推荐尚未结束,是否继续?")){
         alert(isReconmend + selectCategory);
         linkToCategory(selectCategory);       }
       else{
         onRefresh()
       }
     }
       /*dd.confirm({
         title: '上一次产品查询尚未结束',
         content: '是否继续',
         confirmButtonText: '继续',
         cancelButtonText: '清除，重新选择',
         success: (result) => {
           alert(JSON.stringify(result))
           if (result) {//继续
             alert(isReconmend + selectCategory);
             linkToCategory(selectCategory);
           }else{//清除
            onRefresh()
           }
         },
       });*/
  })
    onMounted(()=>{
   /* //判断是否存在selectCategory,
    let href = location.href;
    href =href.replace('#','');
    href = href.slice(0,href.length-1);
    // alert(href)
    Axios({
      url:'/serviceApi/jsapiAuth.php?href='+href,
      // url:'/jsapiAuthorize/getOapiByName.php?event=jsapi-oauth&agentId=2261375440&href='+href,
      // url:'/jsapiAuthorize/getOapiByName.php?event=jsapi-oauth&agentId=2261375440&href='+'http://14.105.19.170:8081/?crmMenuType=app&crmMenuData=selfOfficialAccountApp-2261375440/#/',
      method:'get',
      /!* data:{
         href:"",
         agentId: "1883392782",
         event:"jsapi-oauth"
       },*!/
    }).then((res)=>{
      alert(JSON.stringify(res.data.content));
       config =   res.data;
    }).catch((error)=>{
          // loading.value = "载入失败,请刷新";
          console.log(JSON.stringify(error))
          alert("config failure:"+JSON.stringify(error));

        }
    );*/
  })


  //路由到SelectCategory清空缓存
  onBeforeRouteLeave((to, from,next)=> {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false;
    next();
  })

  const  authorApi = ()=>{
    // alert("config value:" + JSON.stringify(config));//注意服务窗应用要使用服务窗的corpId，后台得到对应的accessToken和Ticket
    dd.config({
      agentId: config.agentId, // 必填，微应用ID
      corpId: config.corpId,//必填，企业ID
      timeStamp: config.timeStamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填l;'
      signature: config.signature, // 必填，签名
      type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
      jsApiList : [
        /*'runtime.info',
        'biz.contact.choose',
        'biz.ding.post',
        'biz.util.openLink',*/
        'biz.auth.requestAuthInfo', //服务窗获取用户授权，
        // 'biz.util.chooseImage',
          'biz.util.scanCard','biz.telephone.call',//可用
        'biz.contact.externalComplexPicker',//可用
        'biz.contact.complexPicker',//可用

      ] // 必填，需要使用的jsapi列表，注意：不要带dd。
    });
    alert("this")
    dd.error(function (err) {
      alert('dd permission: ' + JSON.stringify(err));
    })//该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
  }


 const getImportantContent =()=>{
   /*
   //该方法已停止使用
   dd.ready(async function () {
      //免登
       dd.runtime.permission.requestAuthCode({
        corpId: "ding6dbd739069b325bcbc961a6cb783455b", // 企业id
        onSuccess: function (info) {
          alert("免登码" + info.code) // 通过该免登授权码可以获取用户身份
          dd.biz.auth.requestAuthInfo({
            authorizeType: 1,
            ext: '{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
            onSuccess: (res) => {
              console.log(res)
              alert("已授权" + JSON.stringify(res))
            },
            onFail: (err) => {
              console.log(err)
              alert("授权失败"+JSON.stringify(err))

            }
          });
          Axios({
            // url:'/eapp-corp/getOapiByName.php?event=jsapi-oauth&agentId=1883392782&href=http://r1w8478651.imwork.net:9998',
            url: '/eapp-corp/getServiceWindowContactsPhone.php',
            // url:'/jsapiAuthorize/getOapiByName.php?event=jsapi-oauth&agentId=2261375440&href='+'http://14.105.19.170:8081/?crmMenuType=app&crmMenuData=selfOfficialAccountApp-2261375440/#/',
            method: 'get',
            /!* data:{
               href:"",
               agentId: "1883392782",
               event:"jsapi-oauth"
             },*!/
          }).then((res) => {
            // alert(JSON.stringify(res.data.content));
            alert(JSON.stringify(res));

          }).catch((error) => {
                // loading.value = "载入失败,请刷新";
                console.log(JSON.stringify(error))
              }
          );
        }
      });

      /!* dd.biz.auth.requestAuthInfo({
         authorizeType: 1,
         ext:'{"dataType":1,"rpcScope":["send_dingmi_message"]}',
         onSuccess:(res) => {
           console.log(res)
           alert('dd error: ' + JSON.stringify(res));

         },
         onFail:(err) => {
           console.log(err)
           alert('dd error: ' + JSON.stringify(err));

         }
       });*!/

      /!* dd.biz.auth.requestAuthInfo({
         authorizeType: 1,
         ext:'{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
         onSuccess:(res) => {
           alert('dd error: ' + JSON.stringify(res));
           console.log(res)
         },
         onFail:(err) => {
           alert('dd error: ' + JSON.stringify(err));
           console.log(err)
         }
       });*!/
      /!* dd.biz.telephone.call({
         users: ['1960580858678987'], //用户列表，工号
         corpId: 'ding1fdec36666e1349d35c2f4657eb6378f', //企业id
         onSuccess : function() {

         },
         onFail : function() {}
       })*!/
      /!*dd.biz.util.scanCard({ // 无需传参数
        // eslint-disable-next-line no-unused-vars
        onSuccess: function(data) {
          //onSuccess将在扫码成功之后回调
          /!* data结构
           {
             "ADDRESS": "深圳市南山区软件产业基地",
             "COMPANY": "深圳市李乔科技有限公司",
             "NAME": "李乔",
             "MPHONE": "861333567890",
             "PHONE": "01087654321",
             "POSITION": "CEO",
             "IMAGE": "http://www.taobao.com/xxx.jpg",
             "dt_tranfer": "BusinessCard",
             "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
          }
          *!/
          alert('dd error: ' + JSON.stringify(data));

        },
        onFail : function(err) {
          alert('dd error: ' + JSON.stringify(err));
        }
      })*!/
    })
    dd.error(function (err) {
      alert('dd error: ' + JSON.stringify(err));
    })//该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
    */
   //钉钉授权登录，获取用户手机信息或auth2登录等
   const url = encodeURIComponent("http://14.108.238.27:8081/#/auth")
   window.location.href =" https://login.dingtalk.com/oauth2/auth?redirect_uri="+url+"&response_type=code&client_id=dingvkpczzejwmr90v9f&scope=openid&state=success&prompt=consent"

 }
  const getImportantContent2 = ()=>{
    /* dd.biz.auth.requestAuthInfo({
       authorizeType: 1,
       ext:'{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
       onSuccess:(res) => {
         console.log(res)
       },
       onFail:(err) => {
         console.log(err)
       }
     });*/
    dd.ready(function() {
      /*dd.biz.auth.requestAuthInfo({
        authorizeType: 1,
        ext:'{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
        onSuccess:(res) => {
          console.log(res)
        },
        onFail:(err) => {
          console.log(err)
        }
      });*/

      /* dd.biz.auth.requestAuthInfo({
         authorizeType: 1,
         ext:'{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
         onSuccess:(res) => {
           alert('dd error: ' + JSON.stringify(res));
           console.log(res)
         },
         onFail:(err) => {
           alert('dd error: ' + JSON.stringify(err));
           console.log(err)
         }
       });*/
      /* dd.biz.telephone.call({
         users: ['1960580858678987'], //用户列表，工号
         corpId: 'ding1fdec36666e1349d35c2f4657eb6378f', //企业id
         onSuccess : function() {

         },
         onFail : function() {}
       })*/
       dd.biz.util.scanCard({ // 无需传参数
        // eslint-disable-next-line no-unused-vars
        onSuccess: function(data) {
          //onSuccess将在扫码成功之后回调
          /* data结构
           {
             "ADDRESS": "深圳市南山区软件产业基地",
             "COMPANY": "深圳市李乔科技有限公司",
             "NAME": "李乔",
             "MPHONE": "861333567890",
             "PHONE": "01087654321",
             "POSITION": "CEO",
             "IMAGE": "http://www.taobao.com/xxx.jpg",
             "dt_tranfer": "BusinessCard",
             "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
          }
          */
          alert('dd error: ' + JSON.stringify(data));

        },
        onFail : function(err) {
          alert('dd error1: ' + JSON.stringify(err));
        }
      })
      /*dd.biz.contact.externalComplexPicker({
        "title":"测试标题",
        "corpId":"ding6dbd739069b325bcbc961a6cb783455b",
        "multiple":false, //默认只有单选
        "limitTips":"超出了",
        "maxUsers":1000, //默认不限制
        "pickedUsers":[],  //已选，但可取消，只针对多选生效
        "disabledUsers":[], //不可选，，只针对多选生效
        "requiredUsers":[], //必选，只针对多选生效
        onSuccess: function(data) {
          /!* data结构
            [
              {
                  "emplId":"123",//选人的员工id
                  "name":"name",//员工姓名
                  "avatar":"avatarURL",//头像url
                  "orgName":"org"//公司名字
              },
             ...
            ]
          *!/
        },
        onFail : function(err) {}
      });
    })*/
     /* dd.biz.contact.complexPicker({
        title: "标题",
        corpId: "ding1fdec36666e1349d35c2f4657eb6378f",
        multiple: true,
        limitTips: "超出了",
        maxUsers: 1000,
        pickedUsers: [],
        pickedDepartments: [],
        disabledUsers: [],
        disabledDepartments: [],
        requiredUsers: [],
        onSuccess: function (result) {
          /!**
           {
            selectedCount:1,                              //选择人数
            users:[{"name":"","avatar":"","emplId ":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
            departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
           *!/
        },
        onFail: function (err) {
        }
      });*/
    })
    dd.error(function (err) {
      alert('dd error: ' + JSON.stringify(err));
    })//该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
  }
  return{
    linkToCategory,
    authorApi,getImportantContent,getImportantContent2
  }
}
}

</script>

<style scoped>

</style>