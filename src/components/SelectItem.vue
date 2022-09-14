<template>
  <Field
      v-model="fieldValue"
      is-link
      readonly
      label="产品:"
      placeholder="请选择加工产品"
      @click="show = true"
  />
  <Popup v-model:show="show" round position="bottom">
    <div  style="height: 400px">
      <Cascader
          v-model="cascaderValue"
          title="请选择加工产品:"
          :options="options"
          @close="onClose"
          @finish="onFinish"
          @change="onChange">
      <template #options-bottom>
        <!--    选项介绍图片或视频,最好是视频-->
        <Grid  :column-num="3">
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
    </div>
<!--    产品使用视频list-->
    <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <Cell v-for="item in list" :key="item" :title="item" />
    </List>
  </Popup>
</template>

<script>
import {ref} from 'vue';

// 1. 引入你需要的组件
import {Button, Cell, Field, CellGroup, Overlay, Calendar, TreeSelect} from 'vant';
import { Image as VanImage } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
import { Col, Row } from 'vant';
import { Space } from 'vant';
import { List } from 'vant';
import { Grid, GridItem } from 'vant';

// 2. 引入组件样式
import 'vant/lib/index.css';

export default {
  name: "SelectItem",
  components: {
    Button,
    VanImage,
    Overlay,
    Calendar,
    Field,Popup,Cascader,
    Col, Row,
    Space,
   Grid,
  GridItem,
    List,Cell
  },
  setup(){
    let show = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const options = [
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
      show,fieldValue,cascaderValue, options, onClose, onFinish, onChange,
      list, onLoad, loading, finished,
    }
  },


}
</script>

<style scoped>

</style>