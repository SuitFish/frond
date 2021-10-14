<template>
  <div>
    <el-form ref="form" :model="IndexForm" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="IndexForm.name" ></el-input>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="IndexForm.age"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="IndexForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="爱好">
        <el-checkbox-group v-model="IndexForm.hobby">
          <el-checkbox label="篮球" name="hobby"></el-checkbox>
          <el-checkbox label="游泳" name="hobby"></el-checkbox>
          <el-checkbox label="羽毛球" name="hobby"></el-checkbox>
          <el-checkbox label="跑步" name="hobby"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="简介">
        <el-input type="textarea" v-model="IndexForm.summary"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      IndexForm:{
        name:'',
        sex:'',
        age:'',
        hobby:[],
        summary:''
      }
    }
  },
  created() {
    this.save()
  },
  methods:{
    save(){
      this.$ajax.post('http://localhost/',this.IndexForm)
      // console.log(this.$ajax)
      // console.log(111111111)
    }
  }
}
</script>

<style scoped>

</style>
