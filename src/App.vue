<template>
  <router-view v-slot="{ Component }">
    <transition>
<!--      <keep-alive>
        <component :is="Component" />
      </keep-alive>-->
      <keep-alive include="SelectCategory" exclude="VideoDetails">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import 'vant/lib/index.css';//vant3样式文件

export default {
  name: "App",
}
</script>

<style scoped>

</style>