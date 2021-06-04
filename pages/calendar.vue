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
        <h2 class="text-center mb-10">Ժամանակացույց</h2>
        <TerritoryCalendar
          :territorySchedule="territorySchedule"
          :calendarDays="calendarDays"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import TerritoryCalendar from "~/components/common/TerritoryCalendar";
import { GetCalendar, GetTerritories } from "~/api/DataService.js";

export default {
  components: {
    TerritoryCalendar,
  },
  data() {
    return {
      territories: [],
      calendarDays: [],
      territorySchedule: [],
    };
  },
  beforeMount() {
    this.pageMounted = false;
  },
  mounted() {
    setTimeout(() => {
      this.pageMounted = true;
      this.territories = [];
      this.calendarDays = [];
      this.territorySchedule = [];
      this.getCalendar();
      this.getTerritories();
    }, 1000);
  },
  methods: {
    enumerateDaysBetweenDates(startDate, endDate) {
      var dates = [];

      var currDate = moment(startDate).startOf("day").subtract(1, "days");
      var lastDate = moment(endDate).startOf("day").add(1, "days");

      while (currDate.add(1, "days").diff(lastDate) < 0) {
        dates.push(moment(currDate.clone().toDate()).format("YYYY-MM-DD"));
      }
      return dates;
    },
    async getCalendar() {
      try {
        const response = await GetCalendar();
        if (response.status == 200) {
          this.calendarDays = this.enumerateDaysBetweenDates(
            response.data.startDate,
            response.data.endDate
          );

          console.log(1, response);
          this.territorySchedule = response.data.territorySchedule;
          this.regenerateScheduleStructure();
        } else {
          //alert error
        }
      } catch (e) {
        console.log(response);
      }
    },
    regenerateScheduleStructure() {
      this.territorySchedule.map((territory) => {
        const schedule = [];
        this.calendarDays.map((item, i) => (schedule[i] = new Array()));

        territory.schedule.map((event) => {
          const start = moment(event.startDateTime).format("YYYY-MM-DD");
          const end = moment(event.endDateTime).format("YYYY-MM-DD");
          const diff = moment(end).diff(moment(start), "day");

          event.sort = moment(event.startDateTime).format("HH:mm");

          schedule[this.calendarDays.indexOf(start)].push(
            Object.assign({}, event)
          );

          if (diff > 0) {
            for (let i = 1; i <= diff; i++) {
              schedule[this.calendarDays.indexOf(start) + i].push({
                sort: moment(event.startDateTime).format("HH:mm"),
              });
            }
          }
        });
        schedule.map((day) => {
          day = day.sort((a, b) => {
            return a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0;
          });
        });
        territory.schedule = Object.assign([], schedule);
      });
    },
    async getTerritories() {
      try {
        const response = await GetTerritories();
        if (response.status == 200) {
          this.territories = response.data;
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
