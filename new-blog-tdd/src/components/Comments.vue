<template>
    <div class="commentContainer">
        <p>{{articleId}}</p>
        <div class="formComment">
            <textarea v-model="textcomment" id="" cols="30" rows="10"></textarea>
            <button @click="createComment">Comment</button>
            <p style="color:red"><strong>{{error}}</strong></p>
        </div>
        <div>
            <p><strong style="color:red">{{deleteError}}</strong></p>
        </div>
        <div v-for="e in comments" :key="e._id">
            <p>{{e.comment}}</p>
            <button @click="deleteComment(e._id)">delete</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { throwStatement } from 'babel-types';
const BASE_URL = 'https://newblog.adrowicaksono.xyz/'

export default {
    props:['articleId'],
    data () {
        return {
            textcomment : '',
            comments : '',
            error : '',
            deleteError : '',
        }
    },
    mounted(){
        this.getComment()
    },
    watch : {
        '$route' (to, from) {
           console.log("warch comment", this.articleId)
           this.getComment()  
           this.deleteError = ''   
        }

    },
    methods :{
       getComment () {
           console.log(this.articleId, "++++++===''''''")
           axios.get(BASE_URL+'comments?article_id='+this.articleId)
           .then(response => {
               console.log("comment :",response)
               this.comments = response.data
           })
           .catch(err => {
               this.error = err.response.data.msg
           })
       },
       createComment () {
           console.log(this.articleId, "create comment")
           if(localStorage.getItem("Authorization")){
               let data = {
                   comment : this.textcomment
               }
               axios.post(BASE_URL+'comments?article_id='+this.articleId, data, {
                   headers : {
                       Authorization : localStorage.getItem("Authorization")
                   }
               })
               .then( response => {
                   console.log("add comments reponse", response.data.comment)
                    this.textcomment = ''
                    this.error = ''
                    this.getComment()
               })
               .catch( err => {
                   console.log(err.response.data.msg)
                   this.error = err.response.data.msg
               })
           }
       },
       deleteComment (commentId) {
           let token = localStorage.getItem("Authorization")
           console.log("delete comment :", commentId, token)
           if(token){
               axios.delete(BASE_URL+'comments', {
                   params : {
                       id : commentId
                   },
                   headers : {
                       Authorization : token
                   }
               })
               .then(response =>{
                   console.log("successfully delete comment", response.data)
                   this.getComment()
                   this.deleteError = ''
               })
               .catch( err => {
                   console.log("delete comment error: ",err.response.data)
                   this.deleteError = err.response.data.msg
               })
           }else {
               console.log("you don't have authorization")
           }
       },
    }
}
</script>
