<template>
  <v-main data-testid="listentry">
    <v-container fluid>
      <v-row align="center">
        <v-col align="center">
          <div>ListEntry</div>
        </v-col>
      </v-row>
      <v-btn absolute bottom right fab @click="createEntry" data-testid="createButton">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </v-main>
</template>
<script>
  import { UnauthenticatedException } from '../api';
  export default {
    methods: {
      createEntry() {
        this.$router.push('/entry/create');
      }
    },

    async mounted() {
      try {
        await this.$store.dispatch('listEntry');
      } catch (e) {
        if (e instanceof UnauthenticatedException) {
          this.$router.push('/login');
        } else {
          throw e;
        }
      }
    }
  };
</script>