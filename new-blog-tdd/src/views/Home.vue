<template>
  <div class="containerHome">
    <div class="asideLeft">
      <div class="card" v-for="article in articles" :key="article.id" >
        <h1>{{article.title}}</h1>
        <p>{{article._id}}</p>
        <div class="divider"></div>
        <img class="cardImg" :src="article.img" alt="" srcset="">
        <p>{{contentThumbnail(article.content)}}</p>
        <p><strong>created : </strong>{{dateFormat(new Date(article.createdAt))}}</p>
        <p><strong>author : </strong>{{article.userId.name}}</p>
        <p><strong>contact : </strong>{{article.userId.email}}</p>
        <div class="divider"></div>
        <p><strong>action :</strong></p>
        <div  style="display:flex; justify-content:flex-end">
          <button style="margin:2px;" class="button" v-if="article.userId._id === guestId" @click="edit(article)">edit</button>
          
          <button style="margin:2px;" class="button" v-if="article.userId._id === guestId" @click="remove(article)">delete</button> 
          <button style="margin:2px;" class="button" @click="readMore(article)">read mode </button>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="isError">
        <h1 style="color:red">
          {{error}}
        </h1>
      </div>
      <router-view @update-article="update"></router-view>
    </div>
    <!-- <div class="asideRight">
      <h1>
        profile
      </h1>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'
import jwt from 'jsonwebtoken'

const BASE_URL = 'https://newblog.adrowicaksono.xyz/'
export default {
  name: 'home',
  data () {
    return {
      articles : '',
      error : '',
      isError : false,
      guestId : '',
      updated : '',
      firstLoad: true,
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.getInfo()
    this.getGuest()
    console.log("mounted di home")
  },
  methods : {
    getInfo  (){
      axios.get(BASE_URL+'articles')
      .then(response => {
        console.log(response)
        let data = response.data.data
        this.articles = data
        let updated = data[0]
        data.forEach(el => {
          let comers = new Date(el.updatedAt)
          let begin = new Date(updated.updatedAt)
          if(comers.getTime() > begin.getTime()){
            updated = el
          }
        })
        console.log(updated, "updated")
        this.updated = updated
        this.$router.replace({name:'article', params:{id:updated._id, article:updated}})
        this.error = ''
        this.isError = false
      })
      .catch( err => {
        console.log(err.response)
        this.error = 'maintance mode'
        this.isError = true
      }) 
    },
    update () {
      this.getInfo()
      this.$router.replace('/')
    },
    contentThumbnail(content){
      return content.substring(0, 30) + ' ...'
    },
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
    readMore(article){
      this.$router.replace({name:'article', params:{id:article._id, article:article}})
    },
    edit(article){
      this.$router.replace({name:'edit', params:{id:article._id, article:article}})
    },
    remove(article){
       axios.delete(BASE_URL+'articles?id='+article._id, {
         headers : {
           Authorization : localStorage.getItem('Authorization')
         }
       })
       .then( response => {
         this.update()
       })
       .catch(err => {
          this.error = err.response.data.msg
          this.isError = true
       })
    },
    getGuest(){
      let token = localStorage.getItem("Authorization")
      if(token){
        jwt.verify(token, 'hacktiv8', ( err, decoded )=>{
          if(err) console.log("from get guest :",err)
          this.guestId = decoded.id
        })
      }
    }
  },
 
  
}
</script>

<style scoped>
@import "../assets/scss/home.scss";

.containerHome {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
}

.content {
  width:70%;
  display: flex;
  flex-direction: column;
}

.asideLeft {
  width: 30%;
  height: auto;
  display: flex;
  flex-direction:column;
  background-color: rgb(255, 174, 0);
  padding:2px;
  box-sizing: border-box;
  margin: 3px;
  border-radius: 2px; 
}


</style>

