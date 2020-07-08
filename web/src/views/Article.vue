<template>
  <div class="page-article" v-if="model">
   <div class="d-flex py-3 px-2 pt-2 pb-2 border-bottom">
     <div class="iconfont icon-back text-blue"></div>
  <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
   </div>
   <div class="text-grey fs-xs">
     2019-06-19
   </div>
   <div v-html="model.body" class="px-3 body fs-lg"></div>
  <div class="px-3 border-top py-3">
    <div class="d-flex ai-center">
      <i class="iconfont cc-menu-circle">
        <strong class="text-blue fs-g ml-1">相关资讯</strong>
      </i>
    </div>
    <div class="pt-2">
      <router-link class="py-2 mt-2"
      :to="`/articles/${item._id}`" 
      tag="div" v-for="item in model.related" 
      :key="item.id">
        {{item.title}}
      </router-link>
  </div>
  </div>
</div>
</template>
<script>
export default {
  props:{
    id:{  required:true  }
  },
  data(){
    return{
      model:null
    }
  },
  watch:{
    //当id改变后触发
    id(){
      this.fetch()
    }
  },
methods:{
  async fetch(){
    const res = await this.$http.get(`/articles/${this.id}`)
    this.model = res.data
 }
  },
 created(){
    this.fetch()
}

}
</script>
<style lang="scss">
.page-article{
  .icon-back{
    font-size: 1.5385rem;
  }
  .body{
      img{
        max-width: 100%;
        height: auto;
      }
      iframe{
        width: 100%;
        height: auto;
      }
  }
}
</style>
