<template>

  <div class="container">

    <h1>Login</h1>

    <form @submit.prevent="login">
      <div class="row mb-3">
        <label for="inputUsername" class="col-sm-4 col-form-label">Username</label>
        <div class="col-sm-4">
          <input v-model="form.username" type="text" class="form-control" id="inputUsername" />
        </div>
      </div>

      <div class="row mb-3">
        <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
        <div class="col-sm-4">
          <input v-model="form.password" type="password" class="form-control" id="inputPassword">
        </div>
      </div>

      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">&nbsp;</label>
        <div class="row col-mb-4">
          <button class="btn btn-primary" type="submit">Login</button>
          &nbsp;
          <button class="btn btn-success" type="button" @click="$router.push('/register')">
            Register
          </button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: { username: "", password: "" },
    };
  },
  methods: {
    async login() {
      const { username, password } = this.form;
      if (!username || !password) {
        alert("Username and password are required");
      }
      try {
        const {
          data: { token },
        } = await axios.post('api/users/login', {
          username,
          password,
        });
        localStorage.setItem("token", token);
        this.$router.push("/home");
      } catch (error) {
        alert("Invalid username or password.");
      }
    },
  },
};
</script>

<style>

</style>