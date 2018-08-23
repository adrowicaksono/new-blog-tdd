<template>
  <div class="about">
    <h1>This is an article page</h1>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params : ''
    }
  },
  mounted () {
        
        console.log(this.$route.params.id, 'ramss')
        this.params = this.$route.params.id
    },
    watch: {
        '$route' (to, from) {
            console.log('haii di watch post')
            console.log(this.params)
            console.log(this.$route.params.id)
        // react to route changes...
        }
    },
}
</script>

