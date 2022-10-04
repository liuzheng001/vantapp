<template>
  <Button @click="FmFind()">查看记录</Button>
</template>
<script>
import { Button} from 'vant';
import Axios from "@/plugins/axiosInstance";

export default {
  name: "RestfulApiContent",
  components: {
    Button
  },
  setup(){
    //后台登录
    const FmFind = () => {
      Axios({
        url:'/mdjfresturl/FMFind',
        method:'get',
        //query params
        // params:{
        // },
        //body params
        // data:{}
        headers: {
          'authorization':localStorage.getItem('token'),
        }
      }).then((res)=>{
        // alert('登录成功,token:'+token);
        const total = res.data.content.length
        alert("总共有:"+total+"个记录")
        console.log(res);
      }).catch((error)=>{
            console.log(JSON.stringify(error))
          }
      );
    };
    return{
     FmFind
    }
  },

}
</script>

<style scoped>

</style>