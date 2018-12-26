<template>
	<div class="allActive">
		<el-row class="head">
		  <el-col :span="18" style="padding:20px 0;background: #33CCCC;">
			<el-col :span="8">
			  {{ allCardSum }}<br>
			  <span>所有卡号(张)</span>
			</el-col>
			<el-col :span="8">
			  {{ normalCardSum }}<br>
			  <span>正常卡号(张)</span>
			</el-col>
			<el-col :span="8" style="border: none;">
			  {{ activeCardSum }}<br>
			  <span>待激活卡(张)</span>
			</el-col>
		  </el-col>

		  <el-col :span="5" :offset="1" style="background:  #3091F2;padding:40px 0;">
			{{ stopCardSum }}<br>
			<span>停机卡号(张)</span>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
import { getCardStat } from '../../api/api';
export default {
    name: 'allActive',
    data: function () {
      return {
        allCardSum: 0,
		normalCardSum: 0,
		activeCardSum: 0,
        stopCardSum: 0
      }
    },
    methods: {
		
    },
	mounted() {
		//从本地会话中获取用户
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			//获取用户的卡数量统计信息
			getCardStat(user).then((res) => {
					this.allCardSum = res.data.allCardSum;
					this.normalCardSum = res.data.normalCardSum;
					this.activeCardSum = res.data.activeCardSum;
					this.stopCardSum = res.data.stopCardSum;
			});
		}

	}
	
  }
</script>

<style>
  .allActive > .head > .el-col > .el-col {
    padding: 20px 0;
    border-right: solid 1px #fff;
  }

  .allActive .head {
    text-align: center;
    color: #fff;
    font-size: 30px;
    margin-bottom: 50px;
  }

  .allActive .head span {
    font-size: 16px;
  }
</style>