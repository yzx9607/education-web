<template>
  <section>

	<el-row v-loading="videoLoading">
	
		<el-col :span="10" :offset="3" >
				<!--视频显示-->
			<!--<video  width="150%" height="100%" :src='video_url'  controls="controls" loop>
				<source  type="video/mp4">
				your browser doesn't suppot video.
			</video>-->
			<video width="150%" type="application/x-shockwave-flash" height="100%" :src='video_url' controls>
		
<embed type="application/x-shockwave-flash"  :src='video_url' name="MediaPlayer" autostart=true  showstatusbar="1" showdisplay="1" showcontrols="1" loop="0" videoborder3d="0" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" width="800" height="600"></embed>

</video>
 		</el-col>

  
	</el-row>

	<el-button :plain="true" type="info" @click="forback">返回</el-button>
  </section>
</template>

<script>

import { getVideo } from '../../api/api';

export default {
  data() {
	  return{
		 video_url:'',
		
		 data: [],
     defaultProps: {
          children: 'children',
          label: 'label'
        },
				
		 listLoading: false,
		 videoLoading: false
      };
			
    },
    methods: {
			//返回前一页
			forback() {
				console.log("编号:"+this.$route.params.partId+"........."+this.$route.params.courseId);
				this.$router.push({name: '课程详细信息',path:'/courseInfo',params:{id:this.$route.params.partId,courseId:this.$route.params.courseId}});
			},

			//获取视频
			getVideos() {
				let para = {
					partId:this.$route.params.partId
				}
				console.log("视频路径是:"+this.video_url );
				this.videoLoading =true;
					getVideo(para).then((res) => {
						
                this.video_url = res.resData.videoPath;
								this.videoLoading = false;
            });
			},

    },
	mounted() {

		
		this.getVideos();
	}
	 
  
}
</script>

<style>

</style>