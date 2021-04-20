<template>
  <v-main data-testid="listentry">
    <v-container fluid>
      <v-row align="center">
        <v-col align="center" v-for="entry in entries">
          <v-card data-testid="entryCard">
            <v-card-title>{{entry.title}}</v-card-title>
            <v-card-text>{{entry.content}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn absolute bottom right fab @click="createEntry" data-testid="createButton">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </v-main>
</template>
<script>
  import { mapState } from 'vuex';
  import { UnauthenticatedException } from '../api';

  export default {
    methods: {
      createEntry() {
        this.$router.push('/entry/create');
      }
    },

    computed: mapState(['entries']),

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