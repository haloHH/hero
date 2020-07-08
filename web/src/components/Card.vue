<template>
      <div class="card bg-white mt-3 p-3">
    <div class="card-header d-flex ai-center pb-3">
        <!-- 动态绑定class -->
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu"></i>
    </div>
    <div class="card-body pt-3">
      <!-- slot，插槽的意思，在HOME中写在m-card标签之间的代码，如果没有插槽，就显示不了 -->
     <slot></slot>
     
    </div>
  </div>
</template>
<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true}
    }
}
</script>
<style lang="scss">
@import '../assets/scss/_variables';
    .card{
        .card-header{
            border-bottom:1px solid $border-color;
        }
         border-bottom:1px solid $border-color;
    }
</style>