<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/a.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/b.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/c.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item,index) in items" :key="index">
          <i class="sprite" :class="`${item.icon}`"></i>
          <div class="py-2">{{item.name}}</div>
        </div>
      </div>
      <!-- 如果收起和那个图标没有头部对齐的话，需要使用 d-flex ai-center进行垂直对齐 -->
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
      下面的代码，要想使用，必须在组件中使用插槽
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日新版本"旗下星之队"即将6月上线</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> --> 

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
           <!-- #items是在ListCard里面slot的name，有哪个值就运用 -->
            <template #items="{category}">
              <router-link tag="div" :to="`/articles/${news._id}`"
               class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
              <span class="text-info">[{{news.categoryName}}]</span>
              <span class="px-2">|</span>
              <!-- .text-ellipsis  文本溢出后，显示省略号 -->
              <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
              <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
            </router-link>

            </template>
            

    </m-list-card>

     <m-list-card icon="hero" title="英雄列表" :categories="heroesCats">
           <!-- #items是在ListCard里面slot的name，有哪个值就运用 -->
            <template #items="{category}">
              <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
                <router-link :to="`/heroes/${heroes._id}`"
                 tag="div" class="p-2 text-center" style="width:20%;" v-for="(heroes,i) in category.heroesList" :key="i">
                 <img :src="heroes.avatar" class="w-100" alt="">
                 <div>{{heroes.name}}</div>
            </router-link>
              </div>
            </template>
    </m-list-card>

    <m-list-card icon="cc-menu-circle" title="精彩视频" :categories="videoesCats">
           <!-- #items是在ListCard里面slot的name，有哪个值就运用 -->
            <template #items="{category}">
              <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
                <router-link :to="`/videoes/${videoes._id}`"
                 tag="div" class="p-2 text-center" style="width:50%;" v-for="(videoes,i) in category.videoesList" :key="i">
                 <img :src="videoes.banner" class="w-100" height="100px" alt="">
                 <div>{{videoes.name}}</div>
            </router-link>
              </div>
            </template>
    </m-list-card>
    <div>
       <div class="text-center  fs-lg border-gray" style="height:100px">点击查看更多 </div>
 
    </div>
     
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import dayjs from 'dayjs'
export default {
  //过滤器
   filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        //循环
        loop: true,
        //每张播放时长3秒，自动播放
        autoplay: { delay: 1000 },
        //滑动速度
        speed: 1000
        // delay:1000
      },
      //分类数据
      // newCats:[
      //   {
      //     name:"热门",
      //     // newsList:[
      //     //   {
      //     //     categoryName:'公告',
      //     //     title:'6月2日全服不停机更新公告',
      //     //     date:'06/01'
      //     //   }   本来这里有五个，但是可以用另一种方式呈现
      //     // 新建五个数组对象，往里面的空对象填充
      //     newsList:new Array(5).fill(1).map(v=>({
      //        categoryName:'公告',
      //         title:'6月2日全服不停机更新公告',
      //         date:'06/01'
      //     }))     
      // }
     // ],
  items:[{name:'爆料站',icon:'sprite-news'},
  {name:'故事站',icon:'sprite-story'},
  {name:'周边商城',icon:'sprite-shore'},
  {name:'体验服',icon:'sprite-test'},
  {name:'新人专区',icon:'sprite-newPerson'},
  {name:'荣耀传承',icon:'sprite-glory'},
  {name:'同人社区',icon:'sprite-identical'},
  {name:'王者营地',icon:'sprite-yingdi'},
  {name:'公众号',icon:'sprite-wetchat'},
  {name:'版本介绍',icon:'sprite-version'},
      ],
      
      newsCats:[],
      heroesCats:[],
      videoesCats:[]
    };
  },
  methods: {
    async fetchNewCats(){
     const res = await this.$http.get('/news/list')
     this.newsCats = res.data
    },
     async fetchHeroCats(){
     const res = await this.$http.get('/heroes/list')
     this.heroesCats = res.data
    },
     async fetchVideoCats(){
     const res = await this.$http.get('/videoes/list')
     this.videoesCats = res.data
     console.log(this.videoesCats)
    }
  },
  created(){
    this.fetchNewCats()
    this.fetchHeroCats()
    this.fetchVideoCats()
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
