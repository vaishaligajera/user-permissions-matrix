<template>
  <div class="changelog-page">
    <Header pageName="ChangeLog" />
    <div class="m-10">
      <table v-if="changeLog.length" class="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Changelog Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in changeLog" :key="index">
            <td class="border border-gray-300 px-4 py-2">{{ log.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ log.changelog }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-500">No changelog added yet.</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Header from "./Header.vue";
export default {
  components: {
    Header,
  },

  computed: {
    ...mapGetters(["getChangeLog"]),
    userRole() {
      return this.getUserRole;
    },
    changeLog() {
      return this.getChangeLog;
    }
  },
};
</script>
