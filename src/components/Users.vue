<template>
  <div class="changelog-page">
    <Header pageName="Users" />
    <p v-if="!hasPermission('add_users')" class="text-red-500">
      Your role: {{ userRole }}, "you don't have permission to add users"
    </p>
    <div class="user-form p-5" v-else>
      <form @submit.prevent="submitUser">
        <div class="grid grid-cols-3 mt-3 gap-x-2 gap-y-6 items-end">
          <input type="text" class="input-field" id="name" placeholder="Name" v-model="user.name" required />
          <input type="text" class="input-field" id="job-title" placeholder="Job Title" v-model="user.title" required />
          <input type="email" class="input-field" id="email" placeholder="Email" v-model="user.email" required />
          <input type="number" class="input-field" id="mobile" placeholder="Mobile" v-model="user.mobile" required />
          <select id="status" class="h-[42px]" v-model="user.status" required>
            <option disabled value="">Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <select id="role" class="h-[42px]" v-model="user.role" required>
            <option disabled value="">Role</option>
            <option v-for="(fullName, role) in roles" :key="role" :value="role" :disabled="!canAssignRole(role)">
              {{ fullName }}
            </option>
          </select>
        </div>
        <div class="flex ml-auto justify-end gap-3">
          <button class="btn" type="submit">Save</button>
          <button class="btn" @click="removeData">Remove</button>
        </div>
      </form>
      <UserTable />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./Header.vue";
import UserTable from "./UserTable.vue";
export default {
  components: {
    Header,
    UserTable
  },
  data() {
    return {
      user: {
        name: null,
        title: null,
        email: null,
        mobile: null,
        status: "",
        role: "",
      },
    };
  },
  computed: {
    ...mapGetters(["hasPermission", "getUserRole", "getRoles", "getAllowedRoles", "getUsers"]),
    userRole() {
      return this.getUserRole;
    },
    roles() {
      return this.getRoles;
    },
    allowedRoles() {
      return this.getAllowedRoles;
    },
    users() {
      return this.getUsers;
    },
  },
  methods: {
    ...mapActions(["addUser"]),
    canAssignRole(role) {
      return this.allowedRoles.includes(role);
    },
    removeData() {
      this.user = {
        name: null,
        title: null,
        email: null,
        mobile: null,
        status: null,
        role: null,
      };
    },
    submitUser() {
      const isDuplicate = this.users.some(
        user => user.email === this.user.email
      );

      if (isDuplicate) {
        alert("This email already exists!");
        return
      }
      this.addUser({ id: this.users.length + 1, ...this.user });
      this.removeData();
    },
  },
};
</script>
