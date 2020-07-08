<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略战</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
      <div class="fs-sm">{{model.title}}</div>
      <h2 class="my-2">{{model.name}}</h2>
      <div class="fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
     <div class="d-flex jc-between pt-2">
       <!-- d-flex ai-center  实现垂直对齐 -->
      <div class="scores d-flex ai-center" v-if="model.scores">
        <span>难度</span>
        <span class="badge bg-primary">{{model.scores.difficult}}</span>
        <span>技能</span>
        <span class="badge bg-blue">{{model.scores.skills}}</span>
        <span>攻击</span>
        <span class="badge bg-danger">{{model.scores.attack}}</span>
        <span>生存</span>
        <span class="badge bg-dark">{{model.scores.survive}}</span>
      </div>
      <router-link to="/" tag="span" class="text-grey fs-sm">
        皮肤：2 &gt;
      </router-link>
      </div>
      </div>
    </div>
         <div class="container">
           <div class="skills text-center">
             技能           </div>
             <div class="d-flex jc-between">
            <div  v-for="(items,index) of model.skills" :key="index">
                <img :class="{active:index}" :src="items.icon" width="90rem" alt=""  @click="showDes(index)">
               
            </div>
             
         </div>
         <div class="mt-5 text-center" v-if="flag==flag"  >
                  <strong>{{model.skills[flag].name}}</strong>
                  <div>{{model.skills[flag].description}}</div></div>
            </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      flag:0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    },
    showDes(index){
     this.flag = index
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-hero{
  
  .top{
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% auto;
  }
  .info{
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
      .badge{
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border:1px solid rgba(255,255,255,0.2);
      }
    }
  }
  .skills{
    width: 3.8462rem;
    height: 1.5385rem;
    background: orange;
    border-radius: 20%;
    padding-top: 0.2308rem;
    margin-bottom: 0.7692rem;
  }
}
</style>