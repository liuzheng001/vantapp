<template>
 <p style="text-align: center"> <label for="" >产品选型智能推荐系统</label>
 </p>
  <Button type="primary" block @click="linkToCategory('切削液')">切削液</Button>
  <Button type="primary" block @click="linkToCategory('水基清洗剂')">水基清洗剂</Button>
  <Button type="primary" block >防锈剂</Button>
  <Button type="primary" block @click="linkToCategory('防锈油')" >防锈油</Button>
  <Button type="warning" block to="ListPage">更多</Button>
  <Button type="warning" block @click="authorApi()">jsapi鉴权</Button>
  <Button type="warning" block @click="getImportantContent()">获取用户关重信息</Button>

</template>


<script>
import { Button} from 'vant';
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {onMounted} from "vue";
import Axios from "@/plugins/axiosInstance";
export default {
  name: "HomePage",
  components: {
    Button
  },
setup(){
  //路由到selectCategory
  const router = useRouter()
  let config;
  const linkToCategory = (selectCategory)=>{
    router.push({
      // path:'/selectCategory',
      name: 'SelectCategory',
      params:{
        selectCategory
      },
      query:{
        selectCategory
      }
    })
  }
  onMounted(()=>{
    Axios({
      url:'/eapp-corp/getOapiByName.php?event=jsapi-oauth&agentId=1883392782&href=',
      method:'get',
       data:{
         href:"",
         agentId: "1883392782",
         event:"jsapi-oauth"
       },
    }).then((res)=>{
      // alert(JSON.stringify(res.data.content));
       config =   res.data.config;
    }).catch((error)=>{
          // loading.value = "载入失败,请刷新";
          console.log(JSON.stringify(error))
        }
    );
  })


  //路由到SelectCategory清空缓存
  onBeforeRouteLeave((to, from,next)=> {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false;
    next();
  })

  const  authorApi = ()=>{
    dd.config({
      agentId: config.agentId, // 必填，微应用ID
      corpId: config.corpId,//必填，企业ID
      timeStamp: config.timeStamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，自定义固定字符串。
      signature: config.signature, // 必填，签名
      type:1,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
      jsApiList : [
        /*'runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post',
        'biz.util.openLink',*/
        dd.biz.auth.requestAuthInfo //服务窗获取用户授权
      ] // 必填，需要使用的jsapi列表，注意：不要带dd。
    });

    dd.error(function (err) {
      alert('dd error: ' + JSON.stringify(err));
    })//该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
  }


  const getImportantContent = ()=>{
    dd.biz.auth.requestAuthInfo({
      authorizeType: 1,
      ext:'{"dataType":1,"fieldScope":["mobile","mainOrgName"]}',
      onSuccess:(res) => {
        console.log(res)
      },
      onFail:(err) => {
        console.log(err)
      }
    });
  }

  return{
    linkToCategory,
    authorApi,getImportantContent
  }
}
}
</script>

<style scoped>

</style>