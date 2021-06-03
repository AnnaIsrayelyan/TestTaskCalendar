<template>
  <v-container fill-height>
    <v-row v-if="!pageMounted" justify="center">
      <v-progress-circular
        indeterminate
        color="primary"
        size="100"
        width="6"
      ></v-progress-circular>
    </v-row>

    <v-row v-else class="mx-4 my-2 fill-height">
      <v-col cols="12">
        <div class="text-center">Calendar</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GetCalendar } from "~/api/DataService.js";

export default {
  data() {
    return {};
  },
  beforeMount() {
    this.pageMounted = false;
  },
  mounted() {
    console.log(this.pageMounted);
    setTimeout(() => {
      this.getCalendar();
    }, 3000);
  },
  methods: {
    async getCalendar() {
      try {
        const response = await GetCalendar();
        if (response.status == 200) {
          this.pageMounted = true;
          console.log(response);
        } else {
          // alert error
        }
      } catch (e) {
        console.log(response);
      }
    },
  },
};
</script>
