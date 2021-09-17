<template>
<!--
  @todos:
    - Update hard-coded name base on the logged in user
    - Display these links when user is logged in only
    - Update the UI cosmetics of this header
-->
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
