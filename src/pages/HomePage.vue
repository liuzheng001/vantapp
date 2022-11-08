<template>
 <p style="text-align: center"> <label for="" >产品选型智能推荐系统</label>
 </p>
  <Button type="primary" block>切削液</Button>
  <Button type="primary" block >清洗剂</Button>
  <Button type="primary" block >防锈剂</Button>
  <Button type="primary" block >防锈油</Button>
  <Button type="warning" block to="ListPage">更多</Button>
</template>

<script>
import { Button} from 'vant';
export default {
  name: "HomePage",
  components: {
    Button
  },


}
</script>

<style scoped>

</style>