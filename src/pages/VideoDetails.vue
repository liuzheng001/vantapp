<template>
  <!--    产品使用视频list-->
  <NavBar
      title="产品使用视频集"
      left-text="返回"
      left-arrow
      @click-left="onBack"
  />
      <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadMore"
      >
        <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo('https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4')"/>
        <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo('https://www.w3school.com.cn/example/html5/mov_bbb.mp4')"/>
        <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo('https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4')"/>
      </List>

  <Popup v-model:show="videoShow" round position="bottom" @close="closePopup()" >
    <vue3VideoPlay ref="video"
                   v-bind="options"
                   :poster="poster"
    />
    <!--    <video
            :src="videoOptions.src"
            :controls="videoOptions.controls"
            class="video-js vjs-big-play-centered vjs-fluid"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-playsinline
            style="width: 100%;"
            @play="onPlayerPlay"
            @seeking="seeking"
            ref="video"
            width="200"
            height="300"
        >
        </video>-->
  </Popup>

</template>

<script>
import {reactive, ref, toRefs} from "vue";
import {List,Popup,Cell,NavBar} from 'vant'
import "vue3-video-play/dist/style.css";
import  vue3VideoPlay from "vue3-video-play";
import {useRouter} from "vue-router";
// 2. 引入组件样式

export default {
  name: "VideoDetails",
  components:{
    List,Popup,Cell,
    vue3VideoPlay,
    NavBar
  },
  setup() {
    let videoShow = ref(false);
    const video = ref();
    let data = reactive({
      options: {
        width: "100%", //播放器高度
        height: "450px", //播放器高度
        color: "#409eff", //主题色
        // title: props.title, //视频名称
        // src: props.video_url, //视频源
        src: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4", //视频源
        muted: true, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: true, //循环播放
        mirror: false, //镜像画面
        ligthOff: true, //关灯模式
        // volume: props.volume, //默认音量大小
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
      poster: "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0627%2Fc38a82dcj00qvbzi0000zc000hs00hsc.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
    })
    const onVideo = (url) => {
      videoShow.value = true;
      // video.value.options.src = url;
      data.options.src = url;
    };
    const closePopup = () => {
      video.value.pause();
    }

    const router = useRouter()

    const onBack =()=>{
      router.go(-1)
    }

    const loading = ref(false);
    const finished = ref(true);

    const onLoadMore = () => {}
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      /*  setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };*/
      return {
        loading, finished, onLoadMore,
        video,videoShow,
        closePopup,onVideo,
        onBack,
        ...toRefs(data),
      }
    }

}
</script>

<style scoped>

</style>