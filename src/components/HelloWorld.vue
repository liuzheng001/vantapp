<template>

  <div class="hello">
    <Space :size="30"  >
      <Button type="primary" @click="alert()">弹出框</Button>
      <Button type="success" @click="confirm()">选择框</Button>
      <Button type="default" @click="show=true">打开遮罩层</Button>
      <Button type="warning">警告按钮</Button>
      <Button  type="danger" @click="notify()">危险按钮</Button>
    </Space>
    <Row justify="center">
    <Space :align="start" style="padding: 16px; background: #f3f2f5">
      <div type="primary">a</div>
      <div style="padding: 40px 20px; background: #fff">Block</div>
    </Space>
    </Row>

    <CellGroup inset>
      <Cell  icon="location-o" is-link title="单元格" value="内容" />
      <Cell title="单元格" value="内容" label="描述信息" />
    </CellGroup>

    <CellGroup title="分组1">
      <Cell title="单元格" value="内容" />
      <Cell title="单元格" value="内容" label="描述信息" />
    </CellGroup>

    <VanImage
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />

    <Overlay :show="show" >
      <div class="wrapper"  >
        <div class="block" @click="show = false"/>
      </div>
    </Overlay>
    <Cell title="选择单个日期" :value="date" @click="show = true" />
    <Calendar v-model:show="show" @confirm="onConfirm"  :show-confirm="false"/>

    <CellGroup inset>
      <!-- 输入任意文本 -->
      <Field v-model="text" label="文本" />
      <!-- 输入手机号，调起手机号键盘 -->
      <Field v-model="tel" type="tel" label="手机号" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <Field v-model="digit" type="digit" label="整数" />
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <Field v-model="number" type="number" label="数字" />
      <!-- 输入密码 -->
      <Field v-model="password" type="password" label="密码" />
      <Field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
      >
        <template #button>
          <Button size="small" type="primary">发送验证码</Button>
        </template>
      </Field>
    </CellGroup>
<!--    级联组件-->
    <Row  justify="center" gutter="30">
      <Col span="8" style="background: blue;background-clip:content-box">span: 6</Col>
      <Col span="8" style="background: green;background-clip:content-box">span: 8</Col>
      <Col span="8" style="background: gray;background-clip:content-box">span: 6</Col>
    </Row>

    <Field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
    />
    <Popup v-model:show="show" round position="bottom">
      <Cascader
          v-model="cascaderValue"
          title="请选择加工产品:"
          :options="options"
          @close="onClose"
          @finish="onFinish"
          @change="onChange"
      />
      <VanImage
          width="100"
          height="100"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </Popup>
    tree组件
    <TreeSelect
        v-model:active-id="activeId"
        v-model:main-active-index="activeIndex"
        :items="items"
    />
  </div>


</template>

<script>
import { ref} from 'vue';

// 1. 引入你需要的组件
import { Button,Cell, Field,CellGroup } from 'vant';
import { Image as VanImage } from 'vant';
import { Dialog } from 'vant';
import { Overlay } from 'vant';
import { Calendar } from 'vant';
import { Cascader } from 'vant';
import { Popup } from 'vant';
import { Col, Row } from 'vant';
import { Space } from 'vant';
import { TreeSelect } from 'vant';


// import { Notify } from 'vant';



// 2. 引入组件样式
import 'vant/lib/index.css';
// import 'vant/es/dialog/style';
import { getCurrentInstance } from "vue";

export default {
  name: 'HelloWorld',
  components: {
    Button: Button,
    Cell,
    CellGroup,
    VanImage,
    Overlay,
    Calendar,
    Field,Popup,Cascader,
    Col, Row,
    Space,
    TreeSelect
  },
  props: {
    msg: String
  },

  setup(){
    const { appContext } = getCurrentInstance();
    const globalProxy = appContext.config.globalProperties;

    let show = ref(false);
    let date = ref("");

    // const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const formatDate = (date) =>{return (date.getMonth() + 1)+"-"+date.getDate()};
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };
    const notify =()=>{
          globalProxy.$notify({ type: 'danger', message: '通知内容' })
    }

    let alert = ()=>{
      console.log("this is alert")
     Dialog.alert({
        title: '标题',
        message: '代码是写出来给人看的，附带能在机器上运行。',
      }).then(() => {
        // on close
      });
    }
    let confirm = ()=> {

    /*  this.$dialog.confirm({
        title: '标题',
        message:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
      })
          .then(() => {
            // on confirm
            console.log(("this is confirm true"))
          })
          .catch(() => {
            // on cancel
            console.log(("this is confirm false"))

          });*/

    }
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
  //Field组件
    const tel = ref('');
    const text = ref('');
    const digit = ref('');
    const number = ref('');
    const password = ref('');
    const sms = ref('');
    const start =ref('start');

  //tree组件
    const activeId = ref(1);
    const activeIndex = ref(0);
    const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 ,children:[{text:'西湖区',id:6}]},
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ];
    return{
      alert,confirm,
      show,onConfirm,date,
      options, onFinish, fieldValue, cascaderValue,onClose,onChange,
      tel, text, digit, number, password,sms,
      start,
      notify,
      items, activeId, activeIndex,

    }
  },
  mounted() {
    /*this.$dialog.alert({
      message: '弹窗内容',
    });*/
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
 .wrapper {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
 }

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
