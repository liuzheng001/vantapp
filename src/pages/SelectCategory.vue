<template>
  <NavBar title="产品推荐" left-text="返回" left-arrow @click-left="onBack" @click-right="onRefresh">
    <template #right>
      <Icon name="replay" size="18" />
    </template>
  </NavBar>
  <SelectItem  v-for="option in cascaderOptions " @videoUrl = "onVideo" :cascaderOptions = "option.cascarder" :category="option.category" :key="option.value" @changeCategory = "onChangeCategory" :selectedIds = "selectedIds" :markList = "markList" @closeCascader="onCloseCascader" @userMark = "onUserMark"/>
  <!--  videoShow,src,poster通过SelectItem传递-->
<!--  推荐产品综合分-->
  <CellGroup   title="综合推荐">
    <!--  动态异步加载-->
    <Cell  v-for="(rank) in rankList.slice(0,6)" center :title="rank" :key="rank"  :value="rank" size="large" @click="linkToRecommend(rank)" />
<!--    <Cell center title="所有..."  @click= "onMore()" size="large"/>-->
  </CellGroup>
  <CellGroup   title="感兴趣">
    <!--  动态异步加载-->
    <Cell  v-for="(rank) in markList.slice(0,6)" center :title="rank" :key="rank"  :value="rank" size="large" @click="linkToRecommend(rank)" />
<!--    <Cell center title="更多..."  @click= "onMore()" size="large"/>-->
  </CellGroup>
  <Popup v-model:show="videoShow" round position="bottom" @close="closePopup()" >
<!--    <vue3VideoPlay ref="video"
                   v-bind="options"z
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
    // import { ref} from 'vue';
    // import { Toast } from 'vant';
    import SelectItem from '@/components/SelectItem'
    import {inject, onMounted, reactive, ref, toRefs} from "vue";
    import {useRoute, useRouter} from "vue-router";
    // import "vue3-video-play/dist/style.css";
    // import  vue3VideoPlay from "vue3-video-play";// 2. 引入组件样式
    import {Popup, Toast} from 'vant';
    import Axios from "@/plugins/axiosInstance";
    // import Axios from '../plugins/axiosInstance';
    // import '../mock/index.js'
    import {Cell,  CellGroup,NavBar,Icon /*Overlay, Calendar*/} from 'vant';

    export default {
        name: 'SelectCategory',
        components: {
            SelectItem,
          Cell, CellGroup,NavBar,Icon,
          // vue3VideoPlay,
          Popup,
        },

        setup() {
          const route = useRoute();
          const selectCategory = route.query.selectCategory;
          //数据
          const testData = reactive({
            list:[]
          });
          //级联数据
          let cascaderOptions = ref();
          let category = ref();

          //获取选择的级联类型的id值
          let selectedIds = {};

          //综合排名列表
          let rankList= ref([]);
          //用户标识的列表
          let markList= ref([]);

          //路由到recommendList
          const router = useRouter()

          // 从fm后台获取标签树
          const getLabelTree = ()=>{
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
            });
            Axios({
              url:'/mdjfresturl/getLabelTree',
              method:'get',
             /* headers: {
                'authorization':localStorage.getItem('token'),
              },*/
              params:{
                categoryName:selectCategory
              }
            }).then((res)=>{
              // alert('请求成功了!');
              Toast.clear();
              const result =   res.data.content;
              cascaderOptions.value = result;
              category.value = result[0].category
            }).catch((error)=>{
              Toast.clear();
              console.log(JSON.stringify(error))
                }
            );
          }
          //
          onMounted(()=>{
            // alert(route.query.selectCategory)
            getLabelTree();
            });

          /*onBeforeRouteLeave(() => {

            notification && notification.destroy()

          })*/

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
          const onChangeCategory = (changeCategory) => {
           Object.assign(selectedIds, changeCategory);
            // alert(JSON.stringify(selectedIds))
          }

          //子组件selectItem选择isLike后
          const onUserMark = (userMark) => {
            if (userMark.isLike) {
              markList.value.push(userMark.model)
            }else{
              markList.value.splice(markList.value.findIndex(item => item===userMark.model),1)
              // markList.value.$remove(userMark.model)
            }
          }

          const onCloseCascader = (category)=>{
            if (category) {
              delete selectedIds[category];
            }
            //在级联关闭时候触发
            // alert(JSON.stringify(selectedIds));
            getRankList(selectedIds)
          }
          //后台获取recommnedContent数据
          const getRankList = (selectedIds)=>{

            if (Object.keys(selectedIds).length==0) {
              rankList.value=[];
              return;
            }
            //加载
            Toast.loading({
              message: '加载中...',
              forbidClick: true,
            });
            const ids = Object.values(selectedIds).toString()
            Axios({
              url:'/mdjfresturl/rankList?selectedIds='+ids ,
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
              const map =   res.data.content;
              rankList.value = Object.keys(map)
              // showLoading.value = false
            }).catch((error)=>{
              // loading.value = "载入失败,请刷新";
              Toast.clear();
              console.log(JSON.stringify(error))
                }
            );
          }
          const linkToRecommend = (productType)=>{
            //去掉汉字
            const index = escape(productType).indexOf( "%u" );
            productType = productType.substring(0,index)

            router.push({
              // path:'/selectCategory',
              name: 'RecommentDetail',
              params:{
                productType
              },
              query:{
                productType
              }
            })
          }

          //路由返回
          const onBack =()=>{
            router.go(-1)
          }
          //刷新页面
            /*const onRefresh =()=>{
              const reload = inject("reload");
              reload()
            }
*/
          const reload = inject("reload");
          const onRefresh =()=>{
            reload()
          }
          return{
            video,videoShow,
            closePopup,onVideo,onChangeCategory,onCloseCascader,
            cascaderOptions,category,selectedIds,rankList,
            ...toRefs(data),
            testData,
            linkToRecommend,onBack,onRefresh,
            onUserMark,markList
          }
        }


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
