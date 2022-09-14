<template>
  <SelectItem />

</template>

<script>
import { ref} from 'vue';
import { Toast } from 'vant';
import SelectItem from '@/components/SelectItem'
export default {
  name: 'App',
  components: {
    SelectItem
  },
  setup() {

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
