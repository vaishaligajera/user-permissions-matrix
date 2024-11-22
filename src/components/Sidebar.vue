<template>
  <div class="bg-gray-800 text-white h-screen w-[200px] text-left">
    <ul>
      <li v-for="(menu, index) in menuItems" :key="index"
        :class="{ 'cursor-not-allowed text-gray-500': !hasPermission(menu.permission) }"
        class="block py-1 px-4 hover:bg-gray-700 transition-colors duration-200">
        <router-link :to="menu.to" class="block py-2">
          {{ menu.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menuItems: [
        { name: 'Assets', to: '/assets', permission: 'manage_assets' },
        { name: 'Users', to: '/users', permission: 'add_users' },
        { name: 'Change Log', to: '/changelog', permission: 'view_changelog' },
        { name: 'PQView', to: '/pqview', permission: 'access_pqview' },
      ]
    };
  },
  computed: {
    ...mapGetters(["hasPermission"]),
  },
};
</script>
