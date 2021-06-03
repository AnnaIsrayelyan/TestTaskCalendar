<template>
  <v-app dark>
    <Header />

    <v-main>
      <nuxt />
    </v-main>

    <MainNavigation />
  </v-app>
</template>

<script>
import Header from "~/components/common/Header";
import MainNavigation from "~/components/common/MainNavigation";

export default {
  components: {
    Header,
    MainNavigation,
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
