<template>

  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData1()">test axios 请求数据</button>
    <p>这是请求到的数据{{testData.list}}</p>
  </div>

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
    import Axios from '../plugins/axiosInstance';
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
          const getData1 = ()=>{
            Axios({
              url:'/test',
              method:'post',
              data: {
                id:33010}
            }).then((res)=>{
              alert('请求成功了!');
              testData.list = res.data.dataList;
              testData.list.push(23);
            }).catch((error)=>{
                  console.log(JSON.stringify(error))
                }
            );
          }
          onMounted(()=>{
            //测试请求方法
              Axios({
                url:'/test',
                method:'post',
                data: {
                  id:33010}
              }).then((res)=>{
                alert('请求成功了!');
                testData.list = res.data.dataList;
              }).catch((error)=>{
                    console.log(JSON.stringify(error))
                  }
              );
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
            ...toRefs(data),
            testData,getData1
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
