<template>
<section>
    <table class="border-table">  
					
        <tr >  
            <td  align="right">课程编号</td> 
            <td class="alt">

                <span>{{id}}</span>
            </td> 
            
        </tr>
        					
        <tr>  
            <td  align="right">课程名称</td> 
            <td class="alt">

                <span>{{course_name}}</span>  
            </td> 
            
        </tr>
        					
        <tr>  
            <td  align="right">课程版本</td> 
            <td class="alt">

                <span>{{course_vers}}</span>  
            </td> 
            
        </tr>
        					
        <tr>  
            <td  align="right">小节名称</td> 
            <td class="alt">

                <span>{{part_section}}</span>     
            </td> 
            
        </tr>
        					
        <tr>  
            <td  align="right">访问次数</td> 
            <td class="alt">

                <span>{{visit}}</span>     
            </td> 
            
        </tr>
        					
        <tr>  
            <td  align="right" style="color:red;">视频点播</td> 
            <td class="alt">

                <el-button type="text" @click.native="play()">单击这里点播该课件</el-button>   
          
            </td> 
            
        </tr>
    
    </table> 
    <el-button :plain="true" type="info" @click="forback">返回</el-button>
</section>
  </template>
  <style>
    .border-table {   
		 
		width: 50%; 
        height: 50%;
       
        margin-top:10%;
        margin-left: 10%;
        
	}   
	.border-table td {   
		
		background: #fff; 
		font-size:14px; 
		padding: 6px 6px 6px 12px; 
		color: black; 	
		line-height:28px;
        			
	} 

    .alt{
        border: solid #dfe8ec 1px;  
    }
  </style>
  <script>

  
    import { getCourseInfos } from '../../api/api';

    export default {
      data() {
        return {
            id:'',
            course_name:'',
            course_vers:'',
            part_section:'',
            visit:'',
            listLoading: false,
        }
      },
      methods:{
          	//返回前一页
			forback() {
                console.log("详细信息的课程编号："+this.$route.query.courseId)
				this.$router.push({name: '学习课程',path:'/stu_course',query:{courseId:this.$route.params.courseId}});
			},
            //根据小节编号获得课程所有信息
            getCourseInfo() {

                let para = {
                    
                    partId:this.$route.params.id     
                };

                 this.listLoading = true;

                getCourseInfos(para).then((res) => {

                   
              
                   this.id = res.resData.courseId;
                   this.course_name = res.resData.courseName;
                   this.course_vers = res.resData.courseEdition;
                   this.part_section = res.resData.partName; 
                   this.visit = res.resData.partFrequence;
                    this.listLoading = false;
                });
            },
            //播放视频
            play() {
            
            this.$router.push({name: '视频播放',path:'/play_video',params:{partId:this.$route.params.id,courseId:this.$route.params.courseId}}); //跳转到另一个vue页面
            }
      },
      mounted() {
          this.getCourseInfo();
      }
    }

   
  </script>