<template>
    <div class="commentContainer card">
        <h1>Comments :</h1>
        <div class="formComment">
            <textarea v-model="textcomment" id="" cols="30" rows="10"></textarea>
            <button class="button" @click="createComment">Comment</button>
            <p style="color:red"><strong>{{error}}</strong></p>
        </div>
        <div>
            <p><strong style="color:red">{{deleteError}}</strong></p>
        </div>
        <div v-for="e in comments" :key="e._id" class="card">
            <h5><strong> {{e.userId.name}} ({{e.userId._id}}) :</strong></h5>
            <p><strong>comment :</strong></p>
            <div class="card">
                <p>{{e.comment}}</p>
            </div>
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
           this.getComment()  
           this.deleteError = ''   
        }

    },
    methods :{
       getComment () {
           axios.get(BASE_URL+'comments?article_id='+this.articleId)
           .then(response => {
               this.comments = response.data
           })
           .catch(err => {
               this.error = err.response.data.msg
           })
       },
       createComment () {
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
                    this.textcomment = ''
                    this.error = ''
                    this.getComment()
               })
               .catch( err => {
                   this.error = err.response.data.msg
               })
           }
       },
       deleteComment (commentId) {
           let token = localStorage.getItem("Authorization")
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
                   this.getComment()
                   this.deleteError = ''
               })
               .catch( err => {
                   this.deleteError = err.response.data.msg
               })
           }else {
               this.deleteError = "you don't have authorization"
           }
       },
    }
}
</script>

<style scoped>
@import "../assets/scss/home.scss";

.formComment {
    display: flex;
    flex-direction: column;
    margin: 5px;
}
</style>
