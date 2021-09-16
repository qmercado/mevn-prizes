<template>
  <div class="d-flex justify-content-between">
    <div class="logo" @click="$router.push('/home')">
      <link-router to="/">Home</link-router>
    </div>
    <div class="profile">
        John Doe
        &nbsp;|&nbsp;
        <link-router @click="logOut">Logout</link-router>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  },
  methods: {
      logOut() {
          localStorage.clear();
          this.$router.push("/");
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
