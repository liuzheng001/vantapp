<template>
  <div ref="hello" id="dom">小猪课堂</div>
</template>
<script >
import { onMounted, ref } from "vue";


export default
  {
    name: "TestRef",
    setup(){
      const hello = ref(null);
      onMounted(() => {
        console.log(hello.value); // <div>小猪课堂</div>
        // 修改dom元素
        const proxy = hello.value;
        proxy.innerHTML = "走哇，喝点去~！"
        proxy.style.color = "red"; // 通过代理对象修改dom元素样式

      });
      return{
        hello
      }
    }
  }
// eslint-disable-next-line no-undef


</script>