<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" app color="primary" />
    <v-toolbar-title v-text="title" />
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <ThemeChanger />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import ThemeChanger from "~/components/common/ThemeChanger.vue";

export default {
  components: {
    ThemeChanger,
  },
  data() {
    return {
      title: "Test Task Calendar",
    };
  },
};
</script>