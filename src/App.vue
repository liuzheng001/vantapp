<template>
  <SelectItem
      video_url = "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
      poster="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0627%2Fc38a82dcj00qvbzi0000zc000hs00hsc.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
      title="abc"
      volume="0.4"
  />
</template>

<script>
    // import { ref} from 'vue';
    // import { Toast } from 'vant';
    import SelectItem from '@/components/SelectItem'

    export default {
        name: 'App',
        components: {
            SelectItem
        },

        setup() {

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
