<template>
	<div>
		<h1>视频列表</h1>
		
		<el-table :data="items">
			 <el-table-column prop="_id" label="ID" width="240"></el-table-column>
		    <el-table-column prop="name" label="视频详情"></el-table-column>
              <el-table-column prop="url" label="地址"></el-table-column>
			<el-table-column prop="icon" label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.banner" style="height: 3rem;" />
				</template>
			</el-table-column>
		  <el-table-column fixed="right" label="操作" width="180">
		        <template slot-scope="scope">
		        <el-button type="text" size="small"  @click="$router.push(`/videoes/edit/${scope.row._id}`)">编辑</el-button>
		        <el-button type="text" size="small"  @click="remove(scope.row)">删除</el-button>
				</template>
		      </el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				items:[]
			}
		},
		methods:{
			async fetch(){
				const res = await this.$http.get('rest/videoes',this.items);
				this.items = res.data
			},
			async remove(row){
				//${row.name}   该分类的名称
				 this.$confirm(`是否确定删除分类"${row.name}"`, '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(async () => {
							const res = await this.$http.delete(`rest/videoes/${row._id}`)
				          this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
						  this.fetch();
				        })        
				      }
		},
		created(){
			this.fetch();
		}
	}
</script>

<style>
</style>
