<template>
<!--  <Button type="primary">测试</Button>-->
  <Field
      v-model="fieldValue"
      is-link
      readonly
      :label="category"
      placeholder="请选择加工产品"
      @click="show = true"
  />
<!--  introduce修改vant3 组件,增加的事件-->
  <Popup v-model:show="show" round position="bottom">
      <Cascader
          v-model="cascaderValue"
          title="请选择加工产品:"
          :options="cascaderOptions"
          @introduce="onIntroduce"
          @close="onClose"
          @finish="onFinish"
          @change="onChange">
      </Cascader>

    <CellGroup  title="推荐产品">
<!--  动态异步加载-->
      <Cell  v-for="(recommend) in recommendContent" center :title="recommend.productModel+recommend.productName" :key="recommend.productId" :label="recommend.description" :value="recommend.resume" size="large"  @click="onVideo(recommend.url)"/>
<!--      <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo('https://www.w3school.com.cn/example/html5/mov_bbb.mp4')"/>
      <Cell center title="HJ-67微乳切削液" label="适用于汽车缸体、缸盖加工" value="半合成" size="large"  @click="onVideo('https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4')"/>-->
      <Cell center title="更多..."  @click= "onMore()" size="large"/>
    </CellGroup>
  </Popup>
</template>

<script>
import {ref,} from 'vue';
// import golfMp4 from "/src/assets/golf.mp4"

// 1. 引入你需要的组件
import {Cell, Field, CellGroup, /*Overlay, Calendar*/} from 'vant';
// import { Image as VanImage } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
/*import { Col, Row } from 'vant';
import { Space } from 'vant';*/
// import { List } from 'vant';
// import { Grid, GridItem } from 'vant';
// import VideoPlay from '/src/components/VideoPlay'
//引入路由
import { useRouter } from 'vue-router'
import Axios from "@/plugins/axiosInstance";

// import 'vant/lib/index.css';

export default {
  name: "SelectItem",
  components: {
    // VanImage,
    // Overlay,
    // Calendar,
    Field,Popup,Cascader,
    // Col, Row,
    // Space,
  //  Grid,
  // GridItem,
    // List,
    Cell,CellGroup,
    // VideoPlay
  },
  props:
    ['cascaderOptions','category']
  ,
  emit :["videoUrl"],

  setup(props,ctx){
      // let fullScreen = false;
      // const url = "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"

    const video=ref();
    let show = ref(false);
    let videoShow = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    // const cascaderOptions = toRefs(props.cascaderOptions)
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
    const recommendContent =ref([
      /*{title:"no1"},{title:"no2"},{title:"no3"}*/
    ])
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');

    };
    //vant3组件,点按介绍按钮
    const onIntroduce = (option)=>{
      // alert(JSON.stringify(option))
      //冒泡向上传递,在父组件打开url连接
      ctx.emit("videoUrl",option.url)
    };
    //后台获取recommnedContent数据
    const getData = (value)=>{
      Axios({
        url:'/mdjfresturl/recommendList?labelId='+value,
        method:'get',
       /* data:{
          labelId:value
        },*/
        headers: {
          'authorization':localStorage.getItem('token'),
        }
      }).then((res)=>{
        // alert('请求成功了!');
        recommendContent.value =   res.data.content;
      }).catch((error)=>{
            console.log(JSON.stringify(error))
          }
      );
    }
    //选项更换触发,value为option中的key值
    const onChange = ({ selectedOptions,value }) => {
      // show.value = false;
      //更新recommendContent值
       getData(value)
      /*if (value == 330100 || value == 330200) {
        recommendContent.value = [
          {title:"二级no1"},{title:"二级no2"},{title:"二级no3"}
        ]}
      else{
        recommendContent.value = [{title:"no1"},{title:"no2"},{title:"no3"}]
        }*/
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    };
    //点close,触发
    const onClose = () => {
      show.value = false;
    };
    const router = useRouter()

    const onMore =()=>{
      router.push("./VideoDetails")
    }
    const onVideo = (url) => {
      // videoShow.value = true;
      ctx.emit("videoUrl",url)
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
      show,fieldValue,cascaderValue, onClose, onFinish, onChange,
      list, onLoad, loading, finished,
      recommendContent,getData,
      videoShow,onVideo,video,closePopup,onIntroduce,
      onMore
      /*videoOptions: {
        controls: true,
        src:"https://www.w3school.com.cn/example/html5/mov_bbb.mp4", // url地址
      },*/
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