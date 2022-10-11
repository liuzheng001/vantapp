<template>
  <SelectItem @videoUrl = "onVideo" :cascaderOptions = "cascaderOptions" />
  <SelectItem @videoUrl = "onVideo"/>
<!--  videoShow,src,poster通过SelectItem传递-->
  <Popup v-model:show="videoShow" round position="bottom" @close="closePopup()" >
<!--    <vue3VideoPlay ref="video"
                   v-bind="options"
                   :poster="poster"
    />-->
        <video
            ref="video"
            :src="options.src"
            :controls="options.controls"
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
    // import { ref} from 'vue';
    // import { Toast } from 'vant';
    import SelectItem from '@/components/SelectItem'
    import {onMounted, reactive, ref, toRefs} from "vue";
    // import "vue3-video-play/dist/style.css";
    // import  vue3VideoPlay from "vue3-video-play";// 2. 引入组件样式
    import { Popup } from 'vant';
    import Axios from "@/plugins/axiosInstance";
    // import Axios from '../plugins/axiosInstance';
    // import '../mock/index.js'

    export default {
        name: 'SelectCategory',
        components: {
            SelectItem,
          // vue3VideoPlay,
          Popup
        },

        setup() {
          //数据
          const testData = reactive({
            list:[]
          });
          // 从fm后台获取标签树
          const getLabelTree = ()=>{
            Axios({
              url:'/mdjfresturl/getLabelTree',
              method:'get',
              headers: {
                'authorization':localStorage.getItem('token'),
              }
            }).then((res)=>{
              // alert('请求成功了!');
              const result =   res.data.content;
              cascaderOptions = result[0].cascarder;
            }).catch((error)=>{
                  console.log(JSON.stringify(error))
                }
            );
          }

          //
          onMounted(()=>{
              getLabelTree();
            });

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
              src:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4", //默认视频源url地址
            },
            // poster:props.poster
            poster: "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0627%2Fc38a82dcj00qvbzi0000zc000hs00hsc.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
          })

          // 选项列表，children 代表子选项，支持多级嵌套
          let cascaderOptions = []
              /*[
          {
          text: '汽车配件',
          value: '330000',
          url:"https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4",
          children: [
            { text: '缸体',
              value: '330100',
              url:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
              children:[
                {
                  text: '铸铁',
                  value:330110,
                  key:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
                },
                {
                  text: '铝合金',
                  value:330120,
                  url:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4",
                },
              ]
            },
            { text: '缸盖',
              value: '330200',
              url:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4",},
          ],
        },
        {
          text: '摩托车配件',
          value: '320000',
          url:"https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4",
          children: [{ text: '缸体', value: '320100',  url:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4", }],
        },
        {
          text: '通机配件',
          value: '310000',
          children: [{ text: '缸体', value: '310100',  url:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4", }],
        },
      ];*/
          const onVideo = (url) => {
            videoShow.value = true;
            // video.value.options.src = url;
            data.options.src =url;
          };
          const closePopup =()=>{
            video.value.pause();
          }

          return{
            video,videoShow,
            closePopup,onVideo,
            cascaderOptions,
            ...toRefs(data),
            testData,
          }
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
