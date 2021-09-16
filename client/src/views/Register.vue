<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="row mb-3">
        <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
        <div class="col-sm-4">
          <input v-model="form.username" type="text" class="form-control" id="inputUsername" />
        </div>
      </div>

      <div class="row mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-4">
          <input v-model="form.password" type="password" class="form-control" id="inputPassword">
        </div>
      </div>

      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">&nbsp;</label>
        <div class="col-sm-4">
          <input class="btn btn-success" type="submit" value="Register" />
          &nbsp;
          <button class="btn btn-primary" type="button" @click="$router.push('/')">Login</button>
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
    async register() {
      const { username, password } = this.form;
      if (!username || !password) {
        alert("Username and password are required");
      }
      try {
        await axios.post('http://localhost:3000/api/users/register', {
          username,
          password,
        });
        alert("Registration successful");
      } catch (error) {
        alert("Registration failed.");
      }
    },
  },
};
</script>