<template>
  <div class="about">
    <h1>{{error}}</h1>
    <h1>{{article.title}}</h1>
    <div class="legend">
      <p><strong>author : </strong>{{article.userId.name}}</p>
      <p> | </p>
      <p><strong>created : </strong>{{dateFormat(new Date(article.createdAt))}}</p>
    </div>
    <img :src="article.img" alt="" srcset="">
    <div style="width:80%;margin:auto;text-align:justify;padding:5px;box-sizing:border-box;" v-html="article.content">{{article.content}}</div>
     <div style="align-self:flex-start"> 
        <p><strong>tags :  </strong> 
          <span>
          <div  class="tagContainer">
            <p v-for="(e,i) in getTags(article.tag)" :key="{i}" class="tag">{{e}}</p>
          </div>
          </span>
        </p>
      </div>
    <div class="commentContainer">
      <Comment  :articleId="article._id"></Comment>
    </div>
  </div>
</template>
<script>
import Comment from '@/components/Comments.vue'
import axios from 'axios'
export default {
  components:{
    Comment
  },
  data () {
    return {
      id : '',
      article :'',
      error : '',
    }
  },
  mounted () {
        if(this.$route.params.article){
          this.id = this.$route.params.id
          this.article = this.$route.params.article
          console.log("mounted di if")
        } else {
          console.log("mounted di else") 
        }
    },
    watch: {
        '$route' (to, from) {
            this.params = this.$route.params.id
            this.article = this.$route.params.article
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
      },
      getTags (tagString) {
        return tagString[0].split(' ')
      },
      getRandomArticle () {
        // axios.get(BASE_URL+'articles')
        // .then(response => {
          
        // })
        // .catch( err => {
        //   this.error = 'maintance mode'
        // })         
      }
    },
}
</script>

<style scoped>
@import "../assets/scss/home.scss";
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