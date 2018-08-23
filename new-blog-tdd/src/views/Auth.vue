<template>
  <div class="about">
    <!-- multistep form -->
      <div id="msform">
        <!-- progressbar -->
        <ul id="progressbar">
          <li class="active">Login</li>
          <li :class="{active:progres2}">Social Media</li>
          <li :class="{active:progres3}">Register</li>
        </ul>
        <!-- fieldsets -->
        <h4 class="error">{{errorMsg}}</h4>
        <fieldset v-if="fieldset1">
          <h2 class="fs-title">Sign In</h2>
          <a href="#!" type="button" @click="next" >login with social media or register </a>
          <input type="text" id="emailLogin" name="email" placeholder="Email" v-model="email"/>
          <input type="password" id="passwordLogin" name="pass" placeholder="Password" v-model="password"/>
          <input type="button" name="next" class="signIn action-button" value="Sign In" @click="signIn"/>
        </fieldset>
        <fieldset v-if="fieldset2">
          <h2 class="fs-title">Social Profiles</h2>
          <h3 class="fs-subtitle">Your presence on the social network</h3>
          <input type="button" name="next" class="previous fb-button" value="Login Facebook" onclick="login()"/>
          <input type="text" name="twitter" placeholder="Twitter" />
          <input type="text" name="gplus" placeholder="Google Plus" />
          <input type="button" name="previous" class="previous action-button" value="Previous" @click="prev"/>
          <input type="button" name="next" class="next action-button" value="Register" @click="next"/>
        </fieldset>
        <fieldset v-if="fieldset3">
          <h2 class="fs-title">Personal Details</h2>
          <h3 class="fs-subtitle">We will never sell it</h3>
          <input type="text" id="name" placeholder="insert your name here..." v-model="name"/>
          <input type="text" id="email" placeholder="e.g : example@mail.com" v-model="email"/>
          <input type="password" id="password" name="pass" placeholder="e.g:abc123" v-model="password"/>
          <input type="button" name="previous" class="previous action-button" value="Previous" @click="prev"/>
          <input type="submit" name="submit" class="submit action-button" value="Submit" @click="register"/>
        </fieldset>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
const BASE_URL = 'https://newblog.adrowicaksono.xyz/'
export default {
  data() {
    return {
      fieldset1 : true,
      fieldset2 :false,
      fieldset3 : false,
      progres2 : false,
      progres3 : false,
      count : 0,
      email : '',
      password : '',
      errorMsg : '',
      isError : false,
    }
  },
  watch:{
    count : function (){
      if (this.count == 0){
        this.fieldset1 = true
        this.fieldset2 = false
        this.fieldset3 = false
        this.progres2 = false
        this.progres3 = false
      }else if (this.count == 1){
        this.fieldset1 = false
        this.fieldset2 = true
        this.fieldset3 = false
        this.progres2 = true
        this.progres3 = false      
      }else{
        this.fieldset1 = false
        this.fieldset2 = false
        this.fieldset3 = true
        this.progres3 = true
      }
    }
  },
  mounted () {
    let token = localStorage.getItem("Authorization")
    if(token){
      this.$router.replace('/')
    }
  },
  methods:{
    next () {
      if(this.count < 3){
        this.count++
      }
      this.isError = false
      this.errorMsg = ''
    },
    prev() {
      if(this.count > 0){
        this.count--
      }
      this.isError = false
      this.errorMsg = ''
    },
    signIn () {
        let data = {
          email : this.email,
          password : this.password
        } 
        console.log("sign in :" , data)
        console.log('env', BASE_URL)
        axios
        .post(BASE_URL+'auth', data)
        .then(response => {
            console.log('auth auth', response.data.token)
            this.email = ''
            this.password = ''
            localStorage.setItem ('Authorization', response.data.token)
            this.$router.push('/home')
        })
        .catch( err => {
          this.isError = true
          this.errorMsg = err.response.data.msg
            this.name = ''
            this.password = ''
        }) 
    },
    register () {
      let data = {
        name :this.name,
        email : this.email,
        password : this.password
      }
      console.log('register :',data)
      axios.post(BASE_URL+'users', data)
      .then(  response => {
        console.log(response)
        this.isError = false
        this.errorMsg = ''
        this.fieldset1 = true
        this.fieldset2 = false
        this.fieldset3 = false
      })
      .catch( err =>  {
          this.isError = true
          this.errorMsg = err.response.data.msg
          this.name = ''
          this.password = ''
          this.email = ''
      })
    }
  }
}
</script>



<style scoped>
/*custom font*/
@import url(https://fonts.googleapis.com/css?family=Montserrat);

/*basic reset*/
* {margin: 0; padding: 0;}



body {
	font-family: montserrat, arial, verdana;
}
/*form styles*/
#msform {
  
	width: 400px;
	margin:80px auto;
	text-align: center;
	position: relative;
  background-color: rgba(255, 255, 255, 0.494);
  padding:25px;
  border-radius: 4px;
}
#msform fieldset {
	background: white;
	border: 0 none;
	border-radius: 3px;
	box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
	padding: 20px 30px;
	box-sizing: border-box;
	width: 80%;
	margin: 0 10%;
	
	/*stacking fieldsets above each other*/
	position: relative;
}
/*Hide all except first fieldset*/
#msform fieldset:not(:first-of-type) {
	display: none;
}
/*inputs*/
#msform input, #msform textarea {
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	font-family: montserrat;
	color: #2C3E50;
	font-size: 13px;
}
/*buttons*/
#msform .action-button {
	width: 100px;
	background: #27AE60;
	font-weight: bold;
	color: white;
	border: 0 none;
	border-radius: 1px;
	cursor: pointer;
	padding: 10px 5px;
	margin: 10px 5px;
}
#msform .action-button:hover, #msform .action-button:focus {
	box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
}

#msform .fb-button {
	width: 100%;
	background: linear-gradient(rgba(8, 135, 194, 0.6), rgba(2, 30, 187, 0.6));
	font-weight: bold;
	color: white;
	border: 0 none;
	border-radius: 1px;
	cursor: pointer;
}
#msform .fb-button:hover, #msform .fb-button:focus {
	box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
}

/*headings*/
.fs-title {
  /* background: white; */
	font-size: 15px;
	text-transform: uppercase;
	color: #2C3E50;
	margin-bottom: 10px;
}
.fs-subtitle {
  /* background: white; */
	font-weight: normal;
	font-size: 13px;
	color: #666;
	margin-bottom: 20px;
}
/*progressbar*/
#progressbar {
	margin-bottom: 30px;
	overflow: hidden;
	/*CSS counters to number the steps*/
	counter-reset: step;
}
#progressbar li {
	list-style-type: none;
	color: white;
	text-transform: uppercase;
	font-size: 9px;
	width: 33.33%;
	float: left;
	position: relative;
}
#progressbar li:before {
	content: counter(step);
	counter-increment: step;
	width: 20px;
	line-height: 20px;
	display: block;
	font-size: 10px;
	color: #333;
	background: white;
	border-radius: 3px;
	margin: 0 auto 5px auto;
}
/*progressbar connectors*/
#progressbar li:after {
	content: '';
	width: 100%;
	height: 2px;
	background: white;
	position: absolute;
	left: -50%;
	top: 9px;
	z-index: -1; /*put it behind the numbers*/
}
#progressbar li:first-child:after {
	/*connector not needed before the first step*/
	content: none; 
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.active:before,  #progressbar li.active:after{
	background: #27AE60;
	color: white;
}

#progressbar li.active {
  color: rgb(230, 79, 9);
}

.error {
  color: red;
}
</style>
