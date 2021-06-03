<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ group.id ? "Edit" : "Add" }} Group</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              v-model="valid"
              v-on:submit.prevent
              ref="groupForm"
              @keyup.native.enter="valid && saveDialogGroup()"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="group.name"
                    label="Group Name*"
                    required
                    :rules="emptyRule"
                  ></v-text-field>
                  <v-select
                    v-model="group.type"
                    :items="groupTypes"
                    label="Group Type*"
                    item-text="name"
                    item-value="id"
                    required
                  ></v-select>
                  <v-text-field
                    v-if="hasCar"
                    v-model="group.carNumber"
                    label="Car Number*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="group.police"
                    :items="police"
                    label="Policemen*"
                    item-text="name"
                    item-value="id"
                    single-line
                    multiple
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="closeDialog"> Close </v-btn>
          <v-btn text @click="saveDialogGroup" :disabled="!valid"> Save </v-btn>
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
    groupTypes: {
      type: Array,
      required: true,
    },
    selectedGroup: {
      type: Object,
      required: false,
    },
    police: {
      type: Array,
      required: true,
    },
    saveGroup: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      group: {
        name: null,
        type: null,
        police: [],
        carNumber: null,
      },
    };
  },
  methods: {
    closeDialog() {
      this.show = !this.show;
    },
    saveDialogGroup() {
      this.saveGroup(Object.assign({}, this.group));
      this.closeDialog();
    },
  },
  computed: {
    hasCar() {
      const type = this.groupTypes.filter(
        (item) => item.id === this.group.type
      );
      return type.length ? type[0].hasCar : false;
    },
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
    selectedGroup() {
      if (this.selectedGroup) {
        this.group = Object.assign({}, this.selectedGroup);
      }
    },
  },
};
</script>