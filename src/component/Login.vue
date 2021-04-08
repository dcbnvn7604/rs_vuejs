<template>
  <v-row align="center" data-testid="login">
    <v-col align="center">
      <v-text-field v-model="username" data-testid="usernameInput"></v-text-field>
      <v-text-field v-model="password" data-testid="passwordInput"></v-text-field>
      <v-btn @click="login" data-testid="loginButton">Log in</v-btn>
    </v-col>
  </v-row>
</template>

<script>
  import { UnauthenticatedException } from '../api';

  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },

    methods: {
      async login() {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/');
      }
    },

    mounted() {
      try {
        this.$store.dispatch('checkLogin');
        this.$router.push('/');
      } catch(e) {
        if (!(e instanceof UnauthenticatedException)) {
          throw e;
        }
      }
    }
  };
</script>