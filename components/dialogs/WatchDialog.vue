<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ watch.id ? "Edit" : "Add" }} Watch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              v-model="valid"
              v-on:submit.prevent
              ref="watchForm"
              @keyup.native.enter="valid && saveDialogWatch()"
            >
              <v-row> </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="deleteWatch" v-if="watch.id">
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="closeDialog"> Close </v-btn>
          <v-btn text @click="saveDialogWatch" :disabled="!valid"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    selectedWatch: {
      type: Object,
      required: false,
    },
    saveWatch: {
      type: Function,
      required: true,
    },
    clearWatch: {
      type: Function,
      required: true,
    },
    deleteWatch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      watch: {
        name: null,
        type: null,
        police: [],
        carNumber: null,
      },
    };
  },
  methods: {
    closeDialog() {
      this.clearWatch();
      this.show = !this.show;
    },
    saveDialogWatch() {
      this.saveWatch(Object.assign({}, this.watch));
      this.closeDialog();
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    show: function (newValue, oldValue) {
      if (oldValue && !newValue) {
        this.$refs.groupForm.reset();
      }
    },
    selectedWatch() {
      if (this.selectedWatch) {
        this.watch = Object.assign({}, this.selectedWatch);
      }
    },
  },
};
</script>