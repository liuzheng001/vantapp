<template>
 <p style="text-align: center"> <label for="" >产品选型智能推荐系统</label>
 </p>
  <Button type="primary" block @click="linkToCategory('切削液')">切削液</Button>
  <Button type="primary" block @click="linkToCategory('水基清洗剂')">水基清洗剂</Button>
  <Button type="primary" block >防锈剂</Button>
  <Button type="primary" block @click="linkToCategory('防锈油')" >防锈油</Button>
  <Button type="warning" block to="ListPage">更多</Button>
</template>

<script>
import { Button} from 'vant';
import {onBeforeRouteLeave, useRouter} from "vue-router";
export default {
  name: "HomePage",
  components: {
    Button
  },
setup(){
  //路由到selectCategory
  const router = useRouter()

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

  //路由到SelectCategory清空缓存
  onBeforeRouteLeave((to, from,next)=> {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false;
    next();
  })

  return{
    linkToCategory
  }
}
}
</script>

<style scoped>

</style>