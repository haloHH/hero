   <template>
  <m-card :icon="icon" :title="title">
    <!-- 下面的代码，要想使用，必须在组件中使用插槽 -->
    <div class="nav jc-between">
        <!-- :class="{active:active===i}   第一个active为 class类名  第二个为 data里面的变量名 -->
      <!-- <div class="nav-item" :class="{active:active===i}"
      v-for="(category,i) in categories" :key="i" @click="active = i"> -->
      
       <!-- $refs.list.$swiper.slideTo(i) 可以实现点击哪个，就不需要给active赋值了,下面的页面就移动到哪一个 -->
      <div class="nav-item" :class="{active:active===i}"
      v-for="(category,i) in categories" :key="i" @click="$refs.list.$swiper.slideTo(i)">   
        <div class="nav-link">{{category.name}}</div>
      </div>
      </div>
      <div class="pt-3">
        <!-- 用下面的ref绑定，然后用 @slide-change="()=>active=$refs.list.$swiper.realIndex"  就可以实现滑动哪一个页面，光标就能移动到另外的页面 -->
        <swiper ref="list" :options="{autoHeight:true}" @slide-change="()=>active=$refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <!-- <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日新版本"旗下星之队"即将6月上线</span>
              <span>06/02</span>
            </div> -->
            <slot name="items" :category="category"> </slot>
          </swiper-slide>
        </swiper>
      </div>
    
  </m-card>
</template>
<script>

export default {
 
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data(){
      return{
          active:0
      }
  }
};
</script>