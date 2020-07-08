<template>
    <div class="about">
        <h1>{{id ? '编辑' : '新建'}}广告位</h1>
		
        <el-form label-width="120px"  @submit.native.prevent="save">
			<el-form-item label="广告名称">
                <el-input v-model="model.name"></el-input>
				            </el-form-item>
				
			<el-form-item label="广告">
		<el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
		<el-row type="flex" style="flex-wrap:wrap">
			<el-col :md="24" v-for="(item,i) in model.items" :key="i">
				<el-form-item label="跳转链接">
					<el-input v-model="item.url"></el-input>
				</el-form-item>
				<el-form-item label="图片" style="margin-top: 0.5rem;">
					<!-- :on-success="res=>item.icon = res.url"    将res的值传进去  -->
				<el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
				 :on-success="res=>$set(item,'image',res.url)">  
					<img v-if="item.image" :src="item.image" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				</el-form-item>
	
				<el-form-item>
					<el-button style="margin-left: 7rem;" size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
				</el-form-item>
			</el-col>
		</el-row>
				            </el-form-item>	
							
				

			
             <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
	props:{
		id:{}
	},
    data(){
        return{
            model:{ 
				items:[]
			}
        }
    },
    methods:{
          async save(){
			  let res
			  if(this.id){
				  //修改
				   res = await this.$http.put(`rest/ads/${this.id}`,this.model)           // eslint-disable-line no-unused-vars
			  }else{
				  //新建
				  res = await this.$http.post('rest/ads',this.model)        
			  }
            this.$router.push('/ads/list')
            this.$message({
                type:'success',
                message:'保存成功'
            })
       },
	   async fetch(){
		   const res = await this.$http.get(`rest/ads/${this.id}`)
		  //直接用以下方法给model赋值，会直接覆盖原定义在里面的东向
		  // this.model = res.data
		  this.model = Object.assign({},this.model,res.data)
	   }

    },
	created(){
		//如果有这个id，才执行fetch方法
		this.id && this.fetch()
	}
}
</script>