<!--章节管理页面-->
  <template>
<section>
    <el-table id='course'
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column align='center' label="课程信息列表" class="head">
    <el-table-column
      prop="courseId"
      label="课程编号"
      border
      width="180">
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名称"
      width="180"
      border>
    </el-table-column>
    <el-table-column
      prop="majorName"
      label="所属专业"
      border
      >
    </el-table-column>
    <el-table-column
      prop="courseEdition"
      label="课程版本"
      border>
    </el-table-column>
    <el-table-column
      prop="courseClass"
      label="课程类别"
      border
      >
    </el-table-column>
    <el-table-column
      prop="courseCreateDateStr"
      label="创建时间"
      border>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="$router.push('/section_detail')"  type="text" size="small">管理章节</el-button>
      </template>
    </el-table-column>
    </el-table-column>
  </el-table>



</section>
 
 
</template>

<script>
import routes from '../../routes'
  export default {
    data() {
      return {
        tableData: [{
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        {
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        {
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        {
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        {
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        {
          courseId: '1',
          courseName: 'Java语言基础',
          majorName:'计算机应用技术',
          courseEdition:'2017年春版本',
          courseClass:'计算机专业课程',
          courseCreateDateStr:'2017-6-29'
        },
        ]
      }
    },
    methods: {
        manager:function(id){
            let cid=this.tableData[id].courseId;
            this.$router.push('/section_detail/'+cid);
        }
    }
  }
</script>
<<style>
    #course{
        margin-top:15px;
    }
</style>
