<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="标题">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        <el-form-item label="链接">
            <el-input v-model="model.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
				 :headers = "getAuthHeaders()"
            >
              <!-- :on-success="afterUpload" -->
              <!-- :on-success="afterUpload"   上传成功后，会返回一个值 -->
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>


          <el-form-item label="类型">
            <!-- 加multiple就可以多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
         
        </el-tab-pane>
        
      </el-tabs>

      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
	  items: [],
      model: {
        name: "",
        banner: "",
        url: "",
     
      }
    };
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    //如果有这个id，才执行fetch方法
	this.id && this.fetch();

  },
  methods: {
    afterUpload(res) {
      //vue提供的方法(赋值主体，赋值的属性，res.url),效果类似this.model.icon = res.url
      // this.$set(this.model,'avatar',res.url)
      //上面data中设置了属性就可以用这个方法了，推荐使用
      console.log(res);
      this.model.banner = res.url;
    },
    async save() {
      let res;
      if (this.id) {
        //修改
        res = await this.$http.put(`rest/videoes/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        //新建
        res = await this.$http.post("rest/videoes", this.model);
      }
      this.$router.push("/videoes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/videoes/${this.id}`);
      // this.model = res.data
      //推荐用
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
	}
  }
};
</script>
