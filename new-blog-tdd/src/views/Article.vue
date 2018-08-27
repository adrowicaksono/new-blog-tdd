<template>
  <div class="about">
    <h1>{{article.title}}</h1>
    <div class="legend">
      <p><strong>author : </strong>{{article.userId.name}}</p>
      <p> | </p>
      <p><strong>created : </strong>{{dateFormat(new Date(article.createdAt))}}</p>
    </div>
    <img :src="article.img" alt="" srcset="">
    <div style="width:80%;margin:auto;text-align:justify;padding:5px;box-sizing:border-box;" v-html="article.content">{{article.content}}</div>
    <div class="commentContainer">
      <Comment  :articleId="article._id"></Comment>
    </div>
  </div>
</template>
<script>
import Comment from '@/components/Comments.vue'
export default {
  components:{
    Comment
  },
  data () {
    return {
      id : '',
      article :''
    }
  },
  mounted () {
        this.id = this.$route.params.id
        this.article = this.$route.params.article
    },
    watch: {
        '$route' (to, from) {
            this.params = this.$route.params.id
            this.article = this.$route.params.article
            
        // react to route changes...
        }
    },
    methods:{
      dateFormat(date){
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
  
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
  
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
    }
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:rgb(51, 44, 44);
  background-color: rgba(255, 255, 255, 0.644);
  border-radius: 2px;
  margin-top: 2px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 3px;
  box-sizing: border-box;
}

.legend {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 14px;
}

.commentContainer {
  width: 100%;
}

</style>


