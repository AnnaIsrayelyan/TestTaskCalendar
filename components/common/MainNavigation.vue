<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
        <v-list-item-action>
          <v-icon light color="primary">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-apps",
          title: "Գլխավոր",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Կարգախմբեր",
          to: "/groups",
        },
        {
          icon: "mdi-calendar",
          title: "Ժամանակացույց",
          to: "/calendar",
        },
      ],
    };
  },
};
</script>