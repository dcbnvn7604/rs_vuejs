<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import { UnauthenticatedException } from '../api';

  export default {
    errorCaptured(err) {
      if (err instanceof UnauthenticatedException) {
        this.$router.push('/login');
        return false;
      } 
    }
  };
</script>