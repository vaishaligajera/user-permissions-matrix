<template>
  <div class="assets-page">
    <Header pageName="Assets" />
    <div class="p-5">
      <p v-if="!hasPermission('manage_assets')" class="text-red-500">
        Your role: {{ userRole }}, "you don't have permission to be here"
      </p>
      <template v-else>
        <form @submit.prevent="submitAsset">
          <input v-model="assetName" type="text" placeholder="Asset Name" class="input-field w-full" />
          <button :disabled="!assetName" class="btn flex ml-auto"
            :class="{ 'opacity-[.8] cursor-not-allowed': !assetName }">Add Asset</button>
        </form>
        <!-- Asset Table -->
        <table v-if="assets.length" class="table-auto border-collapse border border-gray-300 w-full mt-10">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Asset Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asset, index) in assets" :key="index">
              <td class="border border-gray-300 px-4 py-2">{{ asset.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ asset.name }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-gray-500">No assets added yet.</p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      assetName: null,
    };
  },
  computed: {
    ...mapGetters(["hasPermission", "getUserRole", "getAssets"]),
    userRole() {
      return this.getUserRole;
    },
    assets() {
      return this.getAssets;
    }
  },
  methods: {
    ...mapActions(["addAsset"]),
    submitAsset() {
      if (!this.assetName.trim()) {
        alert("Asset name cannot be empty!");
        return;
      }

      const isDuplicate = this.assets.some(
        asset => asset.name.toLowerCase() === this.assetName.toLowerCase()
      );

      if (isDuplicate) {
        alert("This asset already exists!");
        return;
      }
      this.addAsset({ id: this.assets.length + 1, name: this.assetName });
      this.assetName = null;
    }
  },
};
</script>
