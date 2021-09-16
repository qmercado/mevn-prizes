<template>

  <Header/>

  <div class="d-flex justify-content-center hero">
      <h1>Rewards</h1>
  </div>

  <router-view></router-view>

  <Footer/>

</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0 10%;
  background-color:#fff !important;
}

.hero {
  background-color: #0274BB;
}

.hero h1 {
  padding: 2em;
  color: #fff;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
