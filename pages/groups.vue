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
        <h2 class="text-center mb-6">Կարգախմբեր</h2>
        <v-row class="mb-6">
          <v-col cols="12" sm="12" md="3">
            <v-text-field
              label="Search"
              append-icon="mdi-magnify"
              outlined
              placeholder="Search by Group Name"
              hide-details
              v-model="searchGroup"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="9" align="right">
            <v-btn
              v-if="police && groupTypes"
              icon
              large
              @click="openGroupDialog(null)"
            >
              <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="groups"
          :items-per-page="5"
          item-key="id"
          :search="searchGroup"
          v-if="groups && groupTypes"
        >
          <template v-slot:item.type="{ item }">
            {{ groupTypes.filter((type) => type.id === item.type)[0].name }}
          </template>
          <template v-slot:item.carNumber="{ item }">
            {{ item.carNumber !== null ? item.carNumber : "-" }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="openGroupDialog(item)">
              <v-icon color="neutral">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteGroup(item.id)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <AddGroupDialog
      v-model="showAddGroupDialog"
      :selectedGroup="selectedGroup"
      :groupTypes="groupTypes"
      :police="police"
      :saveGroup="saveGroup"
    />
  </v-container>
</template>

<script>
import { GetGroups, GetGroupTypes, GetPolice } from "~/api/DataService.js";
import AddGroupDialog from "~/components/dialogs/AddGroupDialog";

export default {
  components: {
    AddGroupDialog,
  },
  data() {
    return {
      groups: [],
      groupTypes: [],
      police: [],
      searchGroup: "",
      showAddGroupDialog: false,
      selectedGroup: null,
      headers: [
        {
          text: "ID",
          value: "id",
          filterable: false,
        },
        {
          text: "Group Name",
          value: "name",
        },
        {
          text: "Group Type",
          value: "type",
          filterable: false,
        },
        {
          text: "Car Number",
          value: "carNumber",
          align: "center",
          filterable: false,
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          filterable: false,
        },
      ],
    };
  },
  beforeMount() {
    this.pageMounted = false;
  },
  mounted() {
    setTimeout(() => {
      this.pageMounted = true;
      this.getGroups();
      this.getGroupTypes();
      this.getPolice();
    }, 1000);
  },
  methods: {
    openGroupDialog(item) {
      this.selectedGroup = item;
      this.showAddGroupDialog = true;
    },
    saveGroup(group) {
      console.log(group);
      if (group.id === undefined) {
        group.id = this.groups[this.groups.length - 1].id + 1;
        this.groups.push(group);
      } else {
        const index = this.groups.findIndex((item) => item.id == group.id);
        this.groups.splice(index, 1, group);
      }
    },
    deleteGroup(id) {
      this.groups = this.groups.filter((group) => group.id !== id);
    },
    async getGroups() {
      try {
        const response = await GetGroups();
        if (response.status == 200) {
          this.groups = response.data;
        } else {
          // alert error
        }
      } catch (e) {
        console.log(response);
      }
    },
    async getGroupTypes() {
      try {
        const response = await GetGroupTypes();
        if (response.status == 200) {
          this.groupTypes = response.data;
        } else {
          // alert error
        }
      } catch (e) {
        console.log(response);
      }
    },
    async getPolice() {
      try {
        const response = await GetPolice();
        if (response.status == 200) {
          this.police = response.data;
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
