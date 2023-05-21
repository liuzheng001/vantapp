<template>

  <SwipeCell >
    <Field
        v-model="fieldValue"
        is-link
        readonly
        :label="category"
        placeholder="请选择"
        @click="show = true"
    />
    <template #right>
      <Button square text="清空" type="danger" class="delete-button" @click="onClearCategory()" />
    </template>
  </SwipeCell>

<!--  introduce修改vant3 组件,增加的事件-->
  <Popup v-model:show="show" round position="bottom" :close-on-click-overlay=false>
      <Cascader
          v-model="cascaderValue"
          title="请选择:"
          :options="cascaderOptions"
          @introduce="onIntroduce"
          @close="onClose"
          @change="onChange">
      </Cascader>
    <CellGroup  title="推荐产品" inset>
<!--  动态异步加载-->
      <Cell  v-for="(recommend) in recommendContent.slice(0,4)" center :title="recommend.model" :key="recommend.id" :label="recommend.description" :value="recommend.resume" size="large"  @click="onVideo(recommend.url)">
        <template #right-icon>
          <Icon v-if="markList.includes(recommend.model)" name="like"  color="#ee0a24" class="search-icon" @click.stop="onSelectedLike(recommend.model,false)" />
          <Icon v-else name="like-o" class="search-icon" @click.stop="onSelectedLike(recommend.model,true)"/>
        </template>
      </Cell>
      <Cell center title="更多..."  @click= "onMore()" size="large"/>
    </CellGroup>
  </Popup>

  <Popup v-model:show="showMore" round position="right">
    <CellGroup title="推荐产品列表">
      <Cell  v-for="  (recommend) in recommendContent" center :title="recommend.model" :key="recommend.id" :label="recommend.description" :value="recommend.resume" size="large"  @click="onVideo(recommend.url)" />
    </CellGroup>
  </Popup>
</template>

<script>
import {ref,} from 'vue';
// import golfMp4 from "/src/assets/golf.mp4"

// 1. 引入你需要的组件
import {Cell, Field, CellGroup, Icon, Toast, Notify,SwipeCell,Button} from 'vant';
// import { Image as VanImage } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
/*import { Col, Row } from 'vant';
import { Space } from 'vant';*/
// import { List } from 'vant';
// import { Grid, GridItem } from 'vant';
// import VideoPlay from '/src/components/VideoPlay'
//引入路由
// import { useRouter } from 'vue-router'
import Axios from "@/plugins/axiosInstance";

// import 'vant/lib/index.css';

function getSelcetedOptions(cascaderValue,cascaderOptions) {
  const length = cascaderValue.length;
  let count = 0;
  // const value = cascaderValue.substr(cascaderValue, 0, 8);
  const selectedOptions = cascaderOptions.filter((current)=>{
    let value = cascaderValue.substr(0, 12 + count * 4);
    if (value === current.value && value.length<=length){
      count++
      return true;
    }else return false;
  })
  return selectedOptions;
}

export default {
  name: "SelectItem",
  components: {
    // VanImage,
    // Overlay,
    // Calendar,
    Field,Popup,Cascader,Icon,SwipeCell,Button,
    // Col, Row,
    // Space,
  //  Grid,
  // GridItem,
    // List,
    Cell,CellGroup,
    // VideoPlay
  },
  props:
    ['cascaderOptions','category',"selectedIds","markList","selectedValues"]
  ,
  emit :["videoUrl"],

  setup(props,ctx){
      // let fullScreen = false;
      // const url = "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
    console.log("mark="+JSON.stringify(props.markList));
    const video=ref();
    let show = ref(false);
    let videoShow = ref(false);
    const showMore = ref(false);

    const fieldValue = ref('');
    let cascaderValue = ref('');
    // alert("prpps"+ JSON.stringify(props))
    // eslint-disable-next-line vue/no-setup-props-destructure

    // eslint-disable-next-line vue/no-setup-props-destructure
    const selectId = props.selectedIds[props.category]
    // eslint-disable-next-line vue/no-setup-props-destructure
    const selectValue = props.selectedValues[props.category]
    // alert("sel1+value:" + JSON.stringify(selectId)+JSON.stringify(selectValue));
    cascaderValue.value = selectId;
    fieldValue.value = selectValue;


   /* const selectedOptions = getSelcetedOptions(cascaderValue.value,props.cascaderOptions)
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');*/

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
    /*const onFinish = ({ selectedOptions,value }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      const changeCategory = {[props.category]:value}
      // alert(changeCategory)
      ctx.emit("changeCategory",changeCategory)
    };*/

    //vant3组件,点按介绍按钮
    const onIntroduce = (option)=>{
      // alert(JSON.stringify(option))
      //冒泡向上传递,在父组件打开url连接
      ctx.emit("videoUrl",option.url)
    };
    //后台获取recommnedContent数据
    const getData = (value,selectedIds)=>{

      const ids = Object.values(selectedIds).toString()
      //加载
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      Axios({
        url:'/mdjfresturl/recommendList?labelId='+value+'&selectedIds='+ids ,
        method:'get',
       /* data:{
          labelId:value
        },*/
       /* headers: {
          'authorization':localStorage.getItem('token'),
        }*/
      }).then((res)=>{
        // alert('请求成功了!');
        Toast.clear();
        recommendContent.value =   res.data.content;
      }).catch((error)=>{
        Toast.clear();
            Notify({ type: 'warning', message: '载入失败,请重载.',  duration: 3000,
            });
            console.log(JSON.stringify(error))
      }
      );
    }
    //选项更换触发,value为option中的key值
    const onChange = ({ selectedOptions,value }) => {
      // show.value = false;
      // alert("selectedOptions"+ JSON.stringify(selectedOptions));
      // alert("cascaderValue"+cascaderValue.value)
      //排出当前级联的值
      const copy = { ...props.selectedIds }
      delete copy[props.category];
      getData(value,copy)
      /*if (value == 330100 || value == 330200) {
        recommendContent.value = [
          {title:"二级no1"},{title:"二级no2"},{title:"二级no3"}
        ]}
      else{
        recommendContent.value = [{title:"no1"},{title:"no2"},{title:"no3"}]
        }*/
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      const changeCategory = {
          //将选择的values和text都返回父组件
        [props.category]:JSON.stringify({
          value,
          fieldValue: fieldValue.value
        })
      }
      /*const selected = getSelcetedOptions(cascaderValue.value,props.cascaderOptions)
      alert(JSON.stringify(selected));*/
      // alert("changeCategory" +JSON.stringify(changeCategory))
      ctx.emit("changeCategory",changeCategory)

    };
    //滑动清除Field时
    const onClearCategory = ()=>{
      fieldValue.value="";
      ctx.emit("closeCascader",props.category)
    }
    //点close,触发
    const onClose = () => {
      show.value = false;
      ctx.emit("closeCascader","")
    };
    // const router = useRouter()
    const onMore =()=>{
      // router.push("./VideoDetails")
      showMore.value = true
    }
    const onVideo = (url) => {
      // videoShow.value = true;
      ctx.emit("videoUrl",url)
    };
    const closePopup =()=>{
     video.value.pause();
    }

    //用户自行标记产品
    const onSelectedLike = (model,isLike)=>{
      let userMark = {
        model,
        isLike
      }
      ctx.emit("userMark",userMark)
    }

    //产品使用列表
    const list = ref([]);

    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };
    return{
      show,fieldValue,onClearCategory,
      cascaderValue, onClose,  onChange,
      list, onLoad,  finished,
      recommendContent,getData,
      videoShow,onVideo,video,closePopup,onIntroduce,
      showMore,onSelectedLike,
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