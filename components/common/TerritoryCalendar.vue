<template>
  <v-row>
    <div
      :class="`v-calendar-weekly v-calendar theme--${
        theme ? 'dark' : 'light'
      } v-calendar-events`"
    >
      <div class="v-calendar-weekly__head">
        <div class="v-calendar-weekly__head-weekday v-past v-outside"></div>
        <div
          v-for="(n, i) in calendarDays"
          :key="i"
          :class="`v-calendar-weekly__head-weekday v-${getDayStatus(
            n
          )} v-outside`"
        >
          {{ getWeekDay(n) }}
        </div>
      </div>
      <div class="v-calendar-weekly__week">
        <div class="v-calendar-weekly__day"></div>
        <div
          v-for="(n, i) in calendarDays"
          :key="i"
          class="v-calendar-weekly__day"
        >
          <div class="v-calendar-weekly__day-label">
            <button
              type="button"
              :class="`v-btn v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--small ${getSameDay(
                n
              )}`"
            >
              <span class="v-btn__content">{{ getDayNumber(n) }}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        class="v-calendar-weekly__week"
        v-for="territory in territorySchedule"
        :key="territory.id"
      >
        <div class="v-calendar-weekly__day">
          <div class="v-calendar-weekly__day-label">
            <h4>{{ territory.territoryName }}</h4>
          </div>
        </div>
        <div
          class="v-calendar-weekly__day"
          v-for="(day, i) in territory.schedule"
          :key="i"
        >
          <div
            v-for="item in day"
            :key="item.id"
            :data-date="day.date"
            :class="`v-event v-event-start v-event-end ${getColor()} white--text ${
              item.id !== undefined ? '' : 'transparent'
            }`"
            :style="`width: ${
              item.id !== undefined
                ? calcWidth(item.startDateTime, item.endDateTime)
                : 96
            }%`"
          >
            <div class="pl-1">
              <strong>{{ getStartTime(item.startDateTime) }}</strong>
              {{ item.groupName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  props: {
    territorySchedule: {
      type: Array,
      required: true,
    },
    calendarDays: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    getColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    },
    calcWidth(start, end) {
      const startDay = moment(start).format("YYYY-MM-DD");
      const endDay = moment(end).format("YYYY-MM-DD");
      return (moment(endDay).diff(moment(startDay), "day") + 1) * 100 - 4;
    },
    getStartTime(date) {
      return moment(date).format("HH:mm");
    },
    getToday() {
      return moment();
    },
    getWeekDay(day) {
      return moment(day).format("ddd");
    },
    getDayNumber(day) {
      return moment(day).format("DD");
    },
    getSameDay(day) {
      return this.getToday().isSame(day, "day") ? "primary" : "transparent";
    },
    getDayStatus(day) {
      return this.getToday().isSame(day, "day")
        ? "present"
        : this.getToday().isAfter(day)
        ? "past"
        : "future";
    },
  },
};
</script>

<style lang="scss" scoped>
.v-calendar-weekly__day {
  padding-top: 6px !important;
  padding-bottom: 6px !important;

  h4 {
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
  }

  .v-event {
    height: 20px;
    margin-bottom: 1px;
    margin-left: 2.5%;

    &.transparent {
      opacity: 0;
      z-index: -1;
    }
  }
}
</style>