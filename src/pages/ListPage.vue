<template>
  <NavBar
      title="产品类别"
      left-text="返回"
      left-arrow
      @click-left="onBack"
  />

<!--  <IndexBar :index-list="indexList">
    <IndexAnchor index="1">切削介质</IndexAnchor>
    <Cell title="切削液"  @click="linkToSelectCategory('切削液')" />
    <Cell title="文本" />
    <Cell title="文本" />

    <IndexAnchor index="2">标题2</IndexAnchor>
    <Cell title="文本"   />
    <Cell title="文本" />
    <Cell title="文本" />
    <IndexAnchor index="3">标题1</IndexAnchor>
    <Cell title="文本" />
    <Cell title="文本" />
    <Cell title="文本" />
    <IndexAnchor index="4">标题1</IndexAnchor>
    <Cell title="文本" />
    <Cell title="文本" />
    <Cell title="文本" />
    <IndexAnchor index="5">标题1</IndexAnchor>
    <Cell title="文本" />
    <Cell title="文本" />
    <Cell title="文本" />

  </IndexBar>-->
  <IndexBar :index-list="indexList" >
       <IndexAnchor v-for="(items,key) in categoryMap" :key="key" >{{key}}
          <Cell  v-for="(item) in items" center :title="item" :key="item"  size="large" @click="linkToSelectCategory(item)" />
       </IndexAnchor>
  </IndexBar>


</template>

<script>
import {NavBar, IndexBar, IndexAnchor,Cell,Button } from 'vant';
import {onBeforeRouteLeave, useRouter} from "vue-router";
import Axios from "@/plugins/axiosInstance";
import {onMounted, ref} from "vue";

export default {
  name: "HomePage",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Button,NavBar, IndexBar, IndexAnchor,
    Cell
  },
  setup() {

    const router = useRouter()
    const indexList =ref()

    const categoryMap =ref()
    const onBack =()=>{
      router.go(-1)
    }

    const linkToSelectCategory = (selectCategory)=>{
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

    const getCategoryList = ()=>{
     /* showLoading.value = true
      loading.value = "正在载入..."*/
      Axios({
        url:'/mdjfresturl/getCategoryLists',
        method:'get',
        /* data:{
           labelId:value
         },*/
      }).then((res)=>{
        alert(JSON.stringify(res.data.content));
        categoryMap.value =   res.data.content;
        indexList.value = Object.keys(res.data.content)

      }).catch((error)=>{
            // loading.value = "载入失败,请刷新";
            console.log(JSON.stringify(error))
          }
      );
    }

    onMounted(()=>{
      getCategoryList()
    })
    return{
      onBack,
      indexList,
      linkToSelectCategory,categoryMap,
    }
  },

}
</script>

<style scoped>

</style>