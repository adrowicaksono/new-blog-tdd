<template>
    <nav >
        <div v-bind:class="{menuIcon:true }"  v-on:click="toggleMenu">
            <a>menu</a>
        </div>
        <div class="logo">
               Logo
        </div>
        <div class="menu">
                <ul v-bind:class="{showing: isMobile}">
                    <li><router-link to="/">HOME</router-link></li>
                    <li><router-link :to="{path:'/post'}">POST</router-link></li>
                    <li v-if="!isLogin"><router-link :to="{name:'auth'}">LOGIN</router-link></li>
                    <li v-if="isLogin"><a href="#!" @click="logout">LOGOUT </a></li>
                </ul>     
        </div>
    </nav>
</template>

<script>
export default {
    data () {
        return{
            isLogin : false,
            isMobile:false,
            img : '/img/lazadaIcon.png'
        }
    },
    mounted () {
          if(localStorage.getItem("Authorization")){
            this.isLogin = true
          }else{
            this.isLogin = false
          }
    },
    watch : {
      '$route' (to, from) {
          console.log("woyyyyy")
          if(localStorage.getItem("Authorization")){
            this.isLogin = true
          }else{
            this.isLogin = false
          }
      }
    },
    methods:{
        toggleMenu () {
            if(this.isMobile){
                this.isMobile=false    
            }else{
                this.isMobile=true
            }
        },
        logout () {
              this.isLogin = false
            localStorage.clear()
        },
    }
}
</script>
<style lang="scss" scoped>
$color-nav: rgba(182, 173, 173, 0.219);


nav{
    margin: 0;
    padding: 0;
    background-color: $color-nav;
}
.logo {
      line-height: 25px;
      /* position: fixed; */
      float: left;
      margin: 16px 46px;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      letter-spacing: 2px;
}
.logo img{
      /* visibility: hidden; */
      width: 65px;
      height: auto;
}
nav ul {
      line-height: 25px;
      list-style: none;
      /* background: rgba(0, 0, 0, 0); */
      /* background:rgba(5, 110, 110, 0.308); */
      overflow: hidden;
      color: #fff;
      padding: 0;
      text-align: right;
      margin: 0;
      padding-right: 40px;
      transition: 1s;
}
nav.black ul {
      background:$color-nav;
}
nav ul li {
      display: inline-block;
      padding: 16px 40px;;
}
nav ul li a {
      text-decoration: none;
      color: #fff;
      font-size: 10px;
}
.menu{
      padding: 0;
      margin: 0;
}
.menuIcon {
      line-height: 25px;
      width: 100%;
      background:$color-nav;
      text-align: right;
      box-sizing: border-box;
      padding: 15px 24px;
      cursor: pointer;
      color: #fff;
      display: none;
}
@media(max-width: 786px) {
      .logo {
            position: fixed;
            top: 0;
            margin-top: 16px;
      }

      nav ul {
            max-height: 0px;
            background:  $color-nav;
      }

      nav.black ul {
           background:  $color-nav;

      }

      .showing {
            max-height: 34em;
            margin: 0;
            padding: 0;
            background:  $color-nav;
      }

      nav ul li {
            box-sizing: border-box;
            width: 100%;
            padding: 24px;
            text-align: center;
      }
      .menuIcon {
            display: block;
            background:  $color-nav 
      }
}
</style>