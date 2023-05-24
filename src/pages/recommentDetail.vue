<template>
  <NavBar
      title="视频集"
      left-text="返回"
      left-arrow
      @click-left="onBack"
  />
  <Grid :border="false" :column-num="3">
<!--    <GridItem>
      <Image src="https://unpkg.com/@vant/assets/apple-1.jpeg" />
    </GridItem>
    <GridItem>
      <Image src="https://unpkg.com/@vant/assets/apple-2.jpeg" />
    </GridItem>
    <GridItem>
      <Image src="https://unpkg.com/@vant/assets/apple-3.jpeg" />
    </GridItem>-->

    <GridItem v-for="recommend in recommendList" :key="recommend.url">
      <Image :src="recommend.coverURL" height="150px" @click="onVideo(recommend.url)" />
      <h5>{{recommend.description?recommend.description:"无描述"}}</h5>
    </GridItem>
  </Grid>

  <Popup v-model:show="videoShow" round position="bottom" closeable :close-on-click-overlay=true	 @close="closePopup()" >
    <!--    <vue3VideoPlay ref="video"
                       v-bind="options"
                       :poster="poster"
        />-->
    <video
        ref="video"
        :src="options.src"
        :controls="options.controls"
        autoplay
        muted
        class="video-js vjs-big-play-centered vjs-fluid"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        style="width: 100%;"
        @seeking="seeking"
        width="200"
        height="300"
    >
    </video>
  </Popup>
</template>

<script>
import {Grid, GridItem,Popup,Image,NavBar} from 'vant';
import Axios from "@/plugins/axiosInstance";
import {onMounted, reactive, ref, toRefs} from "vue";
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
// import router from "@/router";
export default {
  name: "RecommentDetail",
  components:{
    Grid, GridItem,Popup,Image,NavBar
  },
  setup(){
    const route = useRoute();
    const router = useRouter()

    const productType = route.query.productType;

    //视频操作
    let videoShow = ref(false);
    const video=ref();
    let data = reactive({
      options: {
        /*width: "100%", //播放器高度
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
        ], //显示所有按钮,*/
        controls: true,
        src: "https://www.w3school.com.cn/example/html5/mov_bbb.mp4", //默认视频源url地址
      },
    })

    //综合排名列表
    let recommendList= ref([]);
    // 从fm后台获取推荐产品的视频清单
    const getRecommend = ()=>{
      Axios({
        url:'/mdjfresturl/contentList',
        method:'get',
        params:{
          productType
        }
      }).then((res)=>{
        // alert('请求成功了!');
        const result =   res.data.content;
        recommendList.value = result;
      }).catch((error)=>{
            console.log(JSON.stringify(error))
          }
      );
    }
    onMounted(()=>{
      // alert(route.query.productType)
      getRecommend();
    });
    const onVideo = (url) => {
      // alert(url);
      videoShow.value = true;
      // video.value.options.src = url;
      data.options.src =url;
    };
    const closePopup =()=>{
      // alert("sadf")
      video.value.pause();
      videoShow.value = false;

    }
    //路由返回
    const onBack =()=>{
      router.go(-1)
    }

    //路由返回到SelectCategory保留缓存
    onBeforeRouteLeave((to, from,next)=> {
      // 设置下一个路由的 meta
      to.meta.keepAlive = true;
      next();
    })

    return{
      video,onVideo,closePopup,videoShow,recommendList,...toRefs(data),
      onBack
    }
  }
}
</script>

<style scoped>

</style>