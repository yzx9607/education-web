#### education_student_vue

#### 该项目主要包含功能为学生对课程的学习
#### 1.系统公告
#### 2.学费缴纳状态
#### 3.学生主页
#### 4.学籍信息
#### 5.教学计划
#### 6.学生成绩
#### 7.考试安排
#### 8.打印准考证
#### 9.毕业论文
#### 10.异动申请

#### 这是后台管理系统的前台VUE工程,需要node_modules（依赖库，要技术员要）支持，需要将依赖放到vue_project下 
#### vue.js环境搭建
#### 1.node.js下载地址  https://nodejs.org/en/download/
#### 2.安装完成后重启命令行工具，切换到安装目录，输入 node -v 如果有版本号说明安装成功
#### 3. npm -v 如果有版本号说明安装成功
#### 4.在命令行中输入 npm install -g cnpm --registry=http://registry.npm.taobao.org 


### vue.js项目运行
#### 1.将项目下载下来，进入到vue_project目录中，
#### 2.安装依赖包，在命令行中输入 cnpm install ,等待安装 多出一个node_modules文件夹（找技术员要）
#### 3.运行命令 npm run dev 

### vue.js项目发布
#### 1.将项目下载下来，进入到vue_project目录中，
#### 2.注意要将  vue_project/vuex/main.js文件中的注释掉，这时将模拟数据屏蔽掉，运行模式要注释掉
		//打包时候注意把MOCK删除
		//import Mock from './mock'
		//Mock.bootstrap();

#### 3.编译vue项目，在命令行中输入 cnpm run build ,等待安装 多出一个文件夹dist或覆盖原有的dist文件夹
#### 4.将dist文件夹下的static文件夹和index.html文件复制到web项目的webapp即可

#### 附：vue.js代码编辑工具Visudio Code工具


