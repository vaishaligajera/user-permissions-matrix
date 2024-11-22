<template>
    <div class="overflow-x-auto ">
        <table v-if="filteredUsers.length" class="table-auto border-collapse border border-gray-300 w-full mt-10">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">ID</th>
                    <th class="border border-gray-300 px-4 py-2">Name</th>
                    <th class="border border-gray-300 px-4 py-2">Job Title</th>
                    <th class="border border-gray-300 px-4 py-2">Email</th>
                    <th class="border border-gray-300 px-4 py-2">Mobile</th>
                    <th class="border border-gray-300 px-4 py-2">Role</th>
                    <th class="border border-gray-300 px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="border border-gray-300 px-4 py-2">{{ user.id }}</td>
                    <th class="border border-gray-300 px-4 py-2">{{ user.name }}</th>
                    <td class="border border-gray-300 px-4 py-2">{{ user.title }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.mobile }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ roles[user.role] }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ user.status == 1 ? "Active" : "Inactive" }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "UserTable",
    computed: {
        ...mapGetters(["getUsers", "getRoles", "getAllowedRoles"]),
        users() {
            return this.getUsers;
        },
        roles() {
            return this.getRoles;
        },
        allowedRoles() {
            return this.getAllowedRoles;
        },
        filteredUsers() {
            return this.users.filter(user => this.allowedRoles.includes(user.role));
        },
    },
    data() {
        return {
            permission: this.role,
        };
    },
};
</script>