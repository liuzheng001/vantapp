<template>
  <PullRefresh v-model="loading" @refresh="onRefresh">

    <p>刷新次数: {{ count }}</p>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
<!--    <Video/>-->
<!--    <TestRef/>-->
<!--    video_url = "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"-->
    <VideoPlay
        video_url = "https://media.w3.org/2010/05/sintel/trailer.mp4"
        poster="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0627%2Fc38a82dcj00qvbzi0000zc000hs00hsc.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
        title="abc"
        volume="0.4"
        full_screen="true"
      />
  </PullRefresh>
</template>

<script>
import { ref} from 'vue';

import HelloWorld from './components/HelloWorld.vue'
import Video from './components/Video.vue'
import VideoPlay from "@/components/VideoPlay";
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import TestRef from "@/components/TestRef";

export default {
  name: 'App',
  components: {
    TestRef,
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    Video,
    VideoPlay,
    PullRefresh,
  },
  setup() {
    const count = ref(0);
    const loading = ref(false);
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
        count.value++;
      }, 1000);
    };

    return {
      count,
      loading,
      onRefresh,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
