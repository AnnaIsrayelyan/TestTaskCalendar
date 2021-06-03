<template>
  <v-app dark>
    <Header :drawer="drawer" :toggleDrawer="toggleDrawer" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <MainNavigation :drawer="drawer" />

    <v-footer :absolute="!fixed" app> </v-footer>
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
