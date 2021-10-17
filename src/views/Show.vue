<template>
  <div>
    <el-container>
      <el-header>
        Header
      </el-header>
      <el-main>
        <template>
          <el-button type="primary" @click="adddialogVisible = true">添加</el-button>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>

            <el-table-column prop="sex" label="性别" width="180">
            </el-table-column>

            <el-table-column prop="age" label="年龄">
            </el-table-column>

            <el-table-column prop="hobbyName" label="爱好">
            </el-table-column>

            <el-table-column prop="summary" label="简介">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          添加表单-->
          <el-dialog
              title="添加"
              :visible.sync="adddialogVisible"
              width="40%">
            <span>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>

                <el-form-item label="年龄">
                  <el-input v-model="form.age"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="爱好" prop="hobbyName">
                  <el-checkbox-group v-model="hobbyName" >
                    <el-checkbox v-for="hobby in hobbyOptions" @change="hobbyListToStr" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="简介">
                  <el-input type="textarea" v-model="form.summary"></el-input>
                </el-form-item>

              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addSave()">保存</el-button>
              <el-button @click="adddialogVisible = false">取消</el-button>
          </span>
          </el-dialog>
<!--          编辑表单-->
          <el-dialog
              title="编辑"
              :visible.sync="editdialogVisible"
              width="40%">
            <span>
              <el-form ref="form" :model="editForm" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="editForm.name" ></el-input>
                </el-form-item>

                <el-form-item label="年龄">
                  <el-input v-model="editForm.age"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                  <el-radio-group v-model="editForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="爱好" prop="hobbyName">
                  <el-checkbox-group v-model="editForm.hobbyName" >
                    <el-checkbox v-for="hobby in hobbyOptions" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="简介">
                  <el-input type="textarea" v-model="editForm.summary"></el-input>
                </el-form-item>

              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editsave()" >修改</el-button>
              <el-button @click="editdialogVisible = false">取消</el-button>
          </span>
          </el-dialog>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const hobbyOptions = ['篮球','游泳','羽毛球','跑步'];
export default {
  data() {
    return {
      tableData: [],
      adddialogVisible: false,
      hobbyName:[],
      hobbyOptions,
      form:{
        name:'',
        sex:'',
        age:'',
        hobbyName:[''],
        summary:''
      },
      editdialogVisible: false,
      editForm:{
        name:'',
        sex:'',
        age:'',
        hobbyName: [''],
        summary:''
      }
    }
  },
  created() {
    this.getList()
  },
  methods:{
    hobbyListToStr(){
      this.form.hobbyName = this.hobbyName.join(",")
    },
    async getList(){
      const {data:res} = await this.$ajax.get('http://localhost/index.php/Index/index/index')
      this.tableData=res.data
    },
    async del(id){
      const {data:res} = await this.$ajax.get('http://localhost/index.php/Index/index/delete',{params:{id:id}})
      if(res.code==1){
        this.$msg.success(res.msg)
        await this.getList()
      }else{
        this.$msg.error(res.msg)
      }
    },
    async addSave(){
      const {data:res} = await this.$ajax.get('http://localhost/index.php/Index/index/save',{params:this.form})
      this.adddialogVisible = false
      if(res.code==1){
        this.$msg.success(res.msg)
        await this.getList()
      }else{
        this.$msg.error(res.msg)
      }
    },
    edit(info){
      this.editdialogVisible=true
      this.editForm.id = info.id
      this.editForm.name = info.name
      this.editForm.sex = info.sex
      this.editForm.age = info.age
      this.editForm.hobbyName = info.hobbyName.split(',')
      this.editForm.summary = info.summary
    },
    async editsave(){
      this.editForm.hobbyName = this.editForm.hobbyName.join(",")
      const {data:res} = await this.$ajax.get('http://localhost/index.php/Index/index/save',{params:this.editForm})
      this.editdialogVisible = false
      if(res.code==1){
        this.$msg.success(res.msg)
        await this.getList()
      }else{
        this.$msg.error(res.msg)
      }
    },
  }
}
</script>

<style scoped>

</style>
