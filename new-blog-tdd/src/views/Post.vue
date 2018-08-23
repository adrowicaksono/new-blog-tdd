<template>
    <div class="adminContainer">
        
        <div class="form">
            <h1>Editor</h1>
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
                <button @click="additem" class="button-orange">Save</button>
                <button @click="additem" class="button-orange">Cancel</button>
            </div>
        </div>
                
    </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

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
        }
    },
    methods: {
        additem (){
            let data = {
                img : this.img,
                title : this.title,
                tag : this.tag,
                content : this.content,
            }
            console.log(data)
            axios.post('http://localhost:4000/', data)
            .then(response =>{
                console.log("succesfully added item",response)
            })
            .catch(err => {
                console.log(err.message)
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
