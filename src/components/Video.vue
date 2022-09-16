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

    const onPlayerPlay = (player)=>
    {
      // this.globalSetting = true
      console.log("player play!", player);
      const element = player.target
      screenfull.toggle(element)


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
      golfMp4,
      video
    }


  }
}
</script>