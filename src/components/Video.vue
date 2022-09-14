<template>
  <div>
    <video
        :src="golfMp4"
        :controls="videoOptions.controls"
        class="video-js vjs-big-play-centered vjs-fluid"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        style="width: 100%;"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @seeking="seeking"
        autoplay="autoplay"
        ref="video">
    </video>
  </div>
</template>

<script>
import {/*getCurrentInstance,*/ onBeforeUnmount, onMounted,ref} from "vue"
import golfMp4 from "/src/assets/golf.mp4"
import screenfull from 'screenfull'

export default {
  name: "showVideo",
  setup() {

    const video = ref("");
    /*const  initVideo = ()=> {
      //原生初始化视频方法
      let myVideo = appContext;
      //ontimeupdate
      myVideo.ontimeupdate = function () {
        myFunction()
      };
      // let _this = this;

      function myFunction() {
        let playTime = myVideo.currentTime
        setTimeout(function () {
          localStorage.setItem("cacheTime", playTime)
        }, 500)
        let time = localStorage.getItem("cacheTime")
        // 当前播放位置发生变化时触发。
        if (playTime - Number(time) > 2) {
          myVideo.currentTime = Number(time)
        } else {
          console.log("位置更改失败")
        }
      }
    }*/

    const onPlayerPlay = (player)=>
    {
      // this.globalSetting = true
      console.log("player play!", player);
      const element = player.target
      screenfull.toggle(element)

      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
    }

    // 暂停回调
   const onPlayerPause = ()=>
    {
      // this.globalSetting.controls = false;
      // console.log("player pause!", player);
      // var video = document.getElementById("video");
      // video.controls=false;
      // document.getElementsByClassName("vjs-control-bar").style.display = "none";
    }

    onMounted(()=>{
      // initVideo();
      /*const { appContext } = getCurrentInstance();
      const globalProxy = appContext.config.globalProperties;*/
      console.log(video.value)
    })

    onBeforeUnmount(()=>{
      if (this.player) {
        this.player.dispose()
      }
    })
    return {
      videoOptions: {
        controls: true,
        src:golfMp4, // url地址
      },
      player: null,
      playTime: '',
      seekTime: '',
      current: '',
      onPlayerPlay,
      onPlayerPause,
      golfMp4,
      video

    }


  }
}
</script>