<template>
<div class="d-flex ai-center">
       <h2>功能暂未开放</h2>
</div>
 
</template>
<script>
export default {
    data(){
        return {
            model:null
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get(`/videoes/${this.id}`)
            this.model = res.data
            console.log(this.model)
        }
    },
    created(){
        this.fetch()
    }
}
</script>