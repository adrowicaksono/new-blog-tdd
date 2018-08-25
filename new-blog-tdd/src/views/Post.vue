<template>
    <div class="adminContainer">
        <div class="form">
            <h1>Editor</h1>
            <h3 style="color:red">{{error}}</h3>
            <img v-bind:src="img" alt="your image will be here" srcset="">
            <div class="formItem">
                <input type="file" name="" id=""  v-on:change="handleFileUpload($event)">
                <button @click="submitFile()" class="button-orange">Submit</button>
            </div>
            <label for="" class="formItem"> url image
                <input type="text" disabled="disabled" v-model="img" placeholder="generated from your image link ">
            </label>
            <label for="" class="formItem"> Title
                <input type="ca" v-model="title" placeholder="your title post">
            </label>
            <label for="" class="formItem"> Tag
                <input type="ca" v-model="tag" placeholder="give tag for your post">
            </label>
            <label for="" class="formItem"> Content
            </label>
                <vue-editor v-model="content" style="width:100%:height:auto;" ></vue-editor>
            <br>
            <div class="button-group">
                <button v-if="isPost" @click="additem" class="button-orange">Save</button>
                <button v-if="!isPost" @click="edititem" class="button-orange">Edit</button>
                <button v-if="!isPost" @click="$emit('update-article')" class="button-orange">Cancel</button>
                <button v-if="isPost" class="button-orange"> <router-link to="/" style="text-decoration:none;color:white;">Cancel</router-link></button>
            </div>
        </div>
                
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
const BASE_URL = 'https://newblog.adrowicaksono.xyz/'
export default {
    components :{
        VueEditor
    },
    layout:'admin',
    data () {
        return{
            file:'',
            img: '',
            title : '',
            tag : '',
            content : '',
            params : '',
            isPost : true,
            id : '',
            error : '',
        }
    },
    mounted () {
        console.log("post :",this.$route.name)
        if(this.$route.name === 'edit'){
            console.log("ubah tombol")
            this.fillEdit(this.$route.params.article)
        }
    },
    watch :{
        '$route' (to, from){
            if(this.$route.name === 'edit'){
                console.log("ubah tombol")
                this.fillEdit(this.$route.params.article)
            }    
        }
    },
    methods: {
        fillEdit(article){
            this.isPost =false;
            this.img = article.img
            this.title = article.title
            this.tag = article.tag.join(' ')
            this.id = article._id
            this.content = article.content
        },
        additem (){
            let data = {
                img : this.img,
                title : this.title,
                tag : this.tag,
                content : this.content,
            }
            let Authorization = localStorage.getItem("Authorization")
            console.log(data, Authorization)
            axios.post(BASE_URL+'articles'
                , data
                , {
                    headers : {
                        Authorization:Authorization
                    }
                })
            .then(response =>{
                console.log("succesfully added item", response)
            })
            .catch(err => {
                console.log("post error : ",err)
                this.error = err.response.data.msg
            })
        },
        edititem () {
            let data = {
                img : this.img,
                title : this.title,
                tag : this.tag,
                content : this.content,
            }
            let Authorization = localStorage.getItem("Authorization")
            console.log(data, Authorization)
            axios.put(BASE_URL+'articles?id='+this.id
                , data
                , {
                    headers : {
                        Authorization:Authorization
                    }
                })
            .then(response =>{
                console.log("succesfully edit item", response)
                this.$emit("update-article")
            })
            .catch(err => {
                console.log("post error : ",err)
                this.error = err.response.data.msg
            })
        },
         handleFileUpload : function(e){
            this.file = e.target.files[0]
        },
        submitFile:function(){
            let formData = new FormData()
            formData.append('image', this.file)
            console.log(formData)
            axios
            .post('https://imageuploader.adrowicaksono.xyz/upload', formData)
            .then(link=>{
                console.log(link.data.link)
                this.img = link.data.link

            })   
        }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
img{
    width:90%;
    height: auto;
    min-height: 400px;
    border-style:dotted;
    border-color:rgba(185, 174, 174, 0.945);
    border-radius: 5px;
    margin: 40px; 
}
.adminContainer{
    padding:15px;
    display: flex;
    justify-content: center;
    width:100%;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.644);
    border-radius: 2px;
}

h1{
    margin:auto;
}
.form{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.formItem{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    line-height: 40px;
    margin-top: 2px;
    margin-bottom: 2px;
}

input{
    line-height: 20px;
    border-radius: 5px;
    font-size: 15px;
    padding: 5px;
    border: 0.5px solid rgb(2, 94, 94);
    margin-left: -5px;
}

.button-orange {
    background-color: rgb(255, 166, 0);
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    padding :0;
    line-height: 30px;
    width: 20%;
    border-radius: 5px;
    margin-top:3px;
}
.button-group{
    width:100%;
    display: flex;
    justify-content: space-around;
}
</style>
