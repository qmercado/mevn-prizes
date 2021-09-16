<template>
  <div class="d-flex justify-content-center footer">
    <a href="#">Terms & Conditions</a>
    &nbsp;|&nbsp;
    <a href="#">Privacy Policy</a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background-color:#0F0F0F;
  color: #F0F0F0;
  font-weight: bold;
  padding: 6em;
}

.footer a {
  color: #F0F0F0;
  text-decoration: none;
}
</style>
