<template>
  <Form @submit="onSubmit">
    <CellGroup inset>
      <Field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <Field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </CellGroup>
    <div style="margin: 16px;">
      <Button round block type="primary" native-type="submit">
        提交
      </Button>
    </div>
  </Form>
</template>
<script>
import { Field, CellGroup,Form,Button} from 'vant';
import { ref} from 'vue';
import Axios from "@/plugins/axiosInstance";
import {useRouter} from "vue-router";
Axios.defaults.baseURL = "/api";

export default {
  name: "RestfulApiLogin",
  components: {
    Field, CellGroup,Form,Button
  },
  setup(){
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    //后台登录
    const onSubmit = (values) => {
      console.log(values);
      Axios({
        url:'/mdjfresturl',
        method:'post',
        //query params
        params:{
          username:values.username,
          password:values.password
        },
        //body params
        // data:{}
      }).then((res)=>{
        const token = res.data.content.userId +"_"+res.data.content.token
        localStorage.setItem('token', token)
        alert('登录成功,token:'+token);
        router.push('/');

        // console.log(res);
      }).catch((error)=>{
            console.log(JSON.stringify(error))
          }
      );
    };
    return{
      username,password,
      onSubmit
    }
  },

}
</script>

<style scoped>

</style>