
<template>
    <div>
    <vue3VideoPlay
        v-bind="options"
        :poster="poster"
        @play="onPlay"
        @pause="onPause"
    />
  </div>
</template>

<script>

import "vue3-video-play/dist/style.css";
import  vue3VideoPlay from "vue3-video-play";
import { reactive, toRefs } from "vue";
import 'vant/lib/index.css';

// import screenfull from 'screenfull'

export default {
    components: {
    vue3VideoPlay,
    },
    props:['video_url','poster','title','volume','full_Screen'],

    setup(props){
      // let fullScreen = false;
      // const url = "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"

    let data = reactive({
      options:{
        width: "100%", //播放器高度
        height: "450px", //播放器高度
        color: "#409eff", //主题色
        title: props.title, //视频名称
        src: props.video_url, //视频源
        muted: false, //静音
        webFullScreen: props.full_Screen,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: true, //循环播放
        mirror: false, //镜像画面
        ligthOff: true, //关灯模式
        volume: props.volume, //默认音量大小
        control: true, //是否显示控制
        controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        "pip",
        // "pageFullScreen",
        "fullScreen",
        ], //显示所有按钮,
      },
      // poster:props.poster
      poster:""

    });

   /*   const full=(element)=>{
      /!*  data.options.webFullScreen.value = true;
        data.options.volume.value = 0.5*!/
        // data.options.src = url;//更换src地址有效,其它无效

        screenfull.toggle(element)
        // data.poster = props.poster
        //做兼容处理
             /!* if (element.requestFullscreen) {
                element.requestFullscreen();
              } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
              } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
              } else if (element.oRequestFullscreen) {
                element.oRequestFullscreen();
              } else if (element.webkitRequestFullscreen) {//ios和mac的safari无效
                element.webkitRequestFullScreen();
              }*!/
      }
     const onPlay = (ev) => {
        console.log(ev)
        const proxy = ev.target;
        full(proxy)
      }*/
     /* const onPause = (ev) => {
        console.log(ev)
        const proxy = ev.target;

      }*/

      return {
      ...toRefs(data),
      }
    } ,
  // 全屏播放
  //方法



};
</script>

