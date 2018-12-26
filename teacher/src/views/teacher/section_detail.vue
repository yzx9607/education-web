  <template>
  <div class="all">
  
    <div class="tree">
      全部章节
      <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
      <br></br>
      尚未录入视频的章节
      <el-tree :data="dataOfNovideo" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="right">
      <h2 class="content" style="line-height:20px;">{{mylab}}(您的课程：
        <span style="color:red">{{kecheng }}</span>)</h2>
      <el-carousel indicator-position="outside" v-show="lunbo">
        <el-carousel-item v-for="item in data" :key="item">
          <h3>{{ item.label }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="motify">
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加章节(节点)" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="请选择父章节">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              </el-select>
            </el-form-item>
            <el-form-item label="新节点名称" prop="context">
              <el-input v-model="form.context" placeholder="请输入内容"></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
  
        </el-tab-pane>
        <el-tab-pane label="修改章节(节点)" name="second">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="请选择章节">
              <div class="block">
                <span class="demonstration"></span>
                <el-cascader :options="options2" v-model="selectedOptions2" :show-all-levels="true" change-on-select="true"></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="新节点名称">
              <el-input v-model="form.context" placeholder="请输入内容"></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click.native="modifyClass">保存</el-button>
              <el-button @click.native="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="删除章节" name="third">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="请选择章节">
              <div class="block">
                <span class="demonstration"></span>
                <el-cascader :options="options2" v-model="selectedOptions3" change-on-select="true">
                </el-cascader>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="deleteSection">删除此章节</el-button>
            </el-form-item>
          </el-form> 
        </el-tab-pane>


        <el-tab-pane label="上传视频" name="fource">

           <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="请选择章节">
              <div class="block">
                <span class="demonstration"></span>
                <el-cascader :options="options2" v-model="selectedOptions3" @change="handleChange">
                </el-cascader>
              </div>
            </el-form-item>

            <el-upload class="upload-demo" drag action="api/teacher/sectionManager/videoUpLoad" 
              ref="upload"  
              multiple="false"
              accept="audio/mp4, video/mp4"
              :data="aa" 
              :file-list="fileList"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__text">只能上传mp4格式的视频文件</div>
            </el-upload>
            <el-form-item>
              <el-button type="primary" @click.native="upvideo">确认上传</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getTreeList,addNewClass,modifyOneClass,deleteOneSection,videoUpLoad,getTreeListOfNoVideo } from '../../api/api';
export default {
  data() {
    return {
      cId:'',
      activeName2: 'first',
      mylab: '欢迎来到章节管理模块',
      kecheng: '',
      lunbo: true,
      data: [],
      dataOfNovideo:[],
      aa:{sectionId:''},
      value: null,
      form: {
        context: '',
      },
      rules: {
        context: [
          { required: true, message: '请输入新节点名称', trigger: 'blur' },
        ],
      },
      options: [{
        label: '一级章节',
        value: 0,
        children: [],
      }],
      options2: [],
      activeName: 'first',
      selectedOptions: [],
      selectedOptions2: [],
      selectedOptions3: []
    };
    // aa:[{sectionId:"111",cad:"asdfasd"}];
    
    // fileList: [{name: '', url: ''}];
  },
  mounted() {
    this.cId=this.$route.params.cid;
    let param = { cid: this.cId };//没有具体意义
    getTreeListOfNoVideo(param).then(res=>{
      var tree=res.resData;
      this.dataOfNovideo=tree;
    })
    getTreeList(param).then(res => {
      // 首先个课程赋值
      this.kecheng=res.kecheng;
      //判断从后台所获取的数据是否为空
      var tree = res.resData;
      this.data = tree;
      if (this.data.length === 0) {
        //为空时提示用户添加章节
        this.mylab = "暂无章节，请添加";
        this.lunbo = false;
      } else {
        //遍历菜单，添加到下拉框
        for (var index in tree) {
          //定义一个变量，用来接收
          var tree_temp = tree[index];
          var temp = {
            label: tree_temp.label,
            value: tree_temp.id - 0,
            children: [],
          }
          //遍历所有子节点
          if (tree_temp.children) {
            for (var childindex in tree_temp.children) {
              //存储子节点数据
              var child_temp = tree_temp.children[childindex];
              var tempChild = {
                label: child_temp.label,
                value: child_temp.id - 0,
              }
              temp.children[childindex] = tempChild;
            }
          }

          var newIndex = index - 0 + 1;
          this.options2[index - 0] = temp;
          this.options[newIndex] = temp;
        }

        this.$message({
          type: 'success',
          message: res.resMsg,
        });
      }

    })
  },





  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.lunbo = false;
    }, 
    //添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var newclass={section:this.value,knot:this.form.context};
          // alert("前端"+newclass.section);
          addNewClass(newclass).then(res=>{
            // alert(res.resMsg);
            window.location.reload();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
      // 取消
    cancel(ev){
      // alert("aaaaa");
      this.form.context="";
    },
    // 修改
    modifyClass(){
      
      this.$refs.form.validate((valid) => {
        if (valid) {
          var modify={section:this.selectedOptions2,newclassname:this.form.context};
          // alert(modify.section);
          modifyOneClass(modify).then(res=>{
            // alert(res.resMsg);
          });
          //页面中的东西重新加载
          window.location.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 删除章节
    deleteSection(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          var deleteSection={section:this.selectedOptions3};
          deleteOneSection(deleteSection).then(res=>{
            // alert(res.resMsg);
          });
          //页面中的东西重新加载
          window.location.reload();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleChange(){
      var sectId=this.selectedOptions3;
      this.aa.sectionId=sectId;
    },
    //视频上传
    upvideo(){
      if(this.aa.sectionId==''){
        alert("请选择要添加的章节");
      }else{
        this.$refs.upload.submit(); 
        // alert("上传成功");
        window.location.reload();
      }
    }


  }
};
</script>
<style>
.all {
  width: 100%;
  margin-top: 20px;
}

.tree {
  width: 25%;
  float: right;
}

.right {
  width: 74%;
  border: 1px solid #ccc;
  float: left;
  text-align: center;
}

.el-carousel__item h3 {
  color: white;
  font-size: 18px;
  opacity: 0.9;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #1D8CE0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #13CE66;
}

.motify {
  width: 73%;
  margin-top: 20px;
  border: 1px solid #1D8CE0;
  padding: 10px;
  float: left;
  text-align: left;
}
</style>
