<template>
    <div class="about">
        <h1>{{id ? '编辑' : '发表'}}文章</h1>
		
        <el-form label-width="120px"  @submit.native.prevent="save">
          <el-form-item label="所属分类">
              <el-select v-model="model.categories" multiple>
				  <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
			  </el-select>
          </el-form-item>
			<el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
			<el-form-item label="详情" >
			    <vue-editor v-model="model.body" 
				useCustomImageHandler
				 @image-added="handleImageAdded"/>
			</el-form-item>
             <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import { VueEditor } from 'vue2-editor'
	
export default {
	props:{
		id:{}
	},
	  components: { VueEditor },
    data(){
        return{
            model:{ 
			},
			categories:[]
        }
    },
    methods:{
          async save(){
			  let res
			  if(this.id){
				  //修改
				   res = await this.$http.put(`rest/articles/${this.id}`,this.model)           // eslint-disable-line no-unused-vars
			  }else{
				  //新建
				  res = await this.$http.post('rest/articles',this.model)        
			  }
            this.$router.push('/articles/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
       },
	   async fetch(){
		   const res = await this.$http.get(`rest/articles/${this.id}`)
		  this.model = res.data
	   },
	   async fetchCategories(){
	   		   const res = await this.$http.get(`rest/categories`)
	   		  this.categories = res.data
	   },
	   //详情查看案例     https://www.vue2editor.com/examples/#custom-image-handler
	   async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
	         // An example of using FormData
	         // NOTE: Your key could be different such as:
	         // formData.append('file', file)
	   
	         const formData = new FormData();
	         formData.append("file", file);
	   
			const res = await this.$http.post('upload',formData) ;             // eslint-disable-line no-unused-vars
			Editor.insertEmbed(cursorLocation, "image", res.data.url);
			resetUploader();
			
			//通过案例修改，以下是异步的写法，通过es6可以将异步方法改成类似同步的方法，如上
	       //   axios({
	       //     url: "https://fakeapi.yoursite.com/images",
	       //     method: "POST",
	       //     data: formData
	       //   })
	       //     .then(result => {
	       //       let url = result.data.url; // Get url from response
	       //       Editor.insertEmbed(cursorLocation, "image", url);
	       //       resetUploader();
	       //     })
	       //     .catch(err => {
	       //       console.log(err);
	       //     });
	       }
    },
	created(){
		this.fetchCategories()
		//如果有这个id，才执行fetch方法
		this.id && this.fetch()
	}
}
</script>