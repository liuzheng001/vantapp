<template>
  <Button type="primary">测试</Button>
  <Field
      v-model="fieldValue"
      is-link
      readonly
      label="产品:"
      placeholder="请选择加工产品"
      @click="show = true"
  />
  <Popup v-model:show="show" round position="bottom">
      <Cascader
          v-model="cascaderValue"
          title="请选择加工产品:"
          :options="cascaderOptions"
          @close="onClose"
          @finish="onFinish"
          @change="onChange">
      <template #options-bottom>
        <!--    选项介绍图片或视频,最好是视频-->
        <Grid  :column-num="4">
          <GridItem>
            <VanImage
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
            />
            <div>图片1</div>
          </GridItem>
          <GridItem >
            <VanImage
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
            />
            <div>视频1</div>
          </GridItem>
          <GridItem >
            <VanImage
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
            />
            <div>汽车缸体</div>
          </GridItem>
        </Grid>
      </template>
      </Cascader>
  <!--    产品使用视频list-->
<!--    <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <Cell v-for="item in list" :key="item" :title="item" size="large"/>
    </List>-->
    <CellGroup  title="推荐产品">
      <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo()"/>
      <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo()"/>
      <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo()"/>
      <Cell center title="更多..."  size="large"/>
    </CellGroup>
  </Popup>
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
import {reactive, ref, toRefs} from 'vue';
// import golfMp4 from "/src/assets/golf.mp4"

// 1. 引入你需要的组件
import {Button, Cell, Field, CellGroup, /*Overlay, Calendar*/} from 'vant';
import { Image as VanImage } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
/*import { Col, Row } from 'vant';
import { Space } from 'vant';*/
// import { List } from 'vant';
import { Grid, GridItem } from 'vant';
// import VideoPlay from '/src/components/VideoPlay'
import "vue3-video-play/dist/style.css";
import  vue3VideoPlay from "vue3-video-play";// 2. 引入组件样式

import 'vant/lib/index.css';

export default {
  name: "SelectItem",
  components: {
    Button,
    VanImage,
    // Overlay,
    // Calendar,
    Field,Popup,Cascader,
    // Col, Row,
    // Space,
   Grid,
  GridItem,
    // List,
    Cell,CellGroup,
    // VideoPlay
    vue3VideoPlay
  },
  props:['video_url','poster','title','volume'],
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
        poster:""

      });
    const video=ref();
    let show = ref(false);
    let videoShow = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const cascaderOptions = [
      {
        text: '汽车配件',
        value: '330000',
        children: [
          { text: '缸体',
            value: '330100',
            children:[
              {
                text: '铸铁',
                value:330110,
              },
              {
                text: '铝合金',
                value:330120,
              },
            ]
          },
          { text: '缸盖', value: '330200' },
        ],
      },
      {
        text: '摩托车配件',
        value: '320000',
        children: [{ text: '缸体', value: '320100' }],
      },
      {
        text: '通机配件',
        value: '310000',
        children: [{ text: '缸体', value: '310100' }],
      },
    ];
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    };
    //点close,触发
    const onChange = ({ selectedOptions }) => {
      // show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    };
    const onClose = () => {
      show.value = false;
    };
    const onVideo = () => {
      videoShow.value = true;
    };
    const closePopup =()=>{
     video.value.pause();
    }



    //产品使用列表
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
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
    };
    return{
      show,fieldValue,cascaderValue, cascaderOptions, onClose, onFinish, onChange,
      list, onLoad, loading, finished,
      videoShow,onVideo,video,closePopup,
      ...toRefs(data),
      videoOptions: {
        controls: true,
        src:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4", // url地址
      },
    }
  },


}
</script>

<style >
  :root {
    --van-cascader-options-height:200px;
    --van-cell-group-title-color:blue;
    /*--van-cell-group-title-font-size:24px;*/
  }
</style>