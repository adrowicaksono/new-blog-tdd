<template>
  <div class="about">
    <h1>Beranda</h1>
    <router-link to="/beranda/post">POST</router-link>
    <router-link :to="{name:'editor'}">EDITOR</router-link>
    <router-view></router-view>
  </div>
</template>
