<template>
  <router-view v-slot="{Component}"  v-if="isRouterAlive">
<!--    <transition>
      <keep-alive  exclude="VideoDetails,SelectCategory">
        <component :is="Component"   />
      </keep-alive>
    </transition>-->
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
  </router-view>
</template>

<script>
import 'vant/lib/index.css';//vant3样式文件
import { provide, ref, nextTick } from 'vue'

export default {
  name: "App",
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide("reload", reload);

    return{
      isRouterAlive
    }
  }
}

</script>

<style scoped>
</style>