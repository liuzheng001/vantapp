<template>
  <h1>authpage</h1>
  {{authCode}}
</template>

<script>
import {ref} from "vue";

export default {
  name: "authPage",
  setup() {
    //正则获取url参数
    function getUrlParams(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    let authCode  = ref();
    authCode.value =getUrlParams("authCode");
    return{
      authCode
    }
  }
}

</script>

<style scoped>

</style>