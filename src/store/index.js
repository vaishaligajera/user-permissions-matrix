import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      profile: process.env.VUE_APP_USER_ROLE || 'gea',
    },
    users: [],
    assets: [],
    changeLog: [],
    permissions: {
      gea: ['assign_global_admins', 'assign_site_admins', 'add_users', 'manage_assets', 'view_changelog', 'access_pqview'],
      sea: ['assign_site_admins', 'add_users', 'manage_assets', 'view_changelog', 'access_pqview'],
      eng: ['manage_assets', 'view_changelog', 'access_pqview'],
      opr: ['manage_assets', 'access_pqview', 'view_changelog'],
      obr: ['access_pqview'],
    },
    roles: {
      gea: "Global Engineering Admin",
      sea: "Site Engineering Admin",
      eng: "Engineering",
      opr: "Operator",
      obr: "Observer",
    },
  },
  getters: {
    hasPermission: (state) => (action) => {
      const role = state.user.profile;
      return state.permissions[role]?.includes(action) || false;
    },
    getUserRole: (state) => state.user.profile,
    getRoles: (state) => state.roles,
    getAssets: (state) => state.assets,
    getUsers: (state) => state.users,
    getChangeLog: (state) => {
      return state.changeLog;
    },
    getAllowedRoles: (state) => {
      const userRole = state.user.profile;
      const userPermissions = state.permissions[userRole];
      const allowedRoles = [];
      if (userPermissions.includes('add_users')) {
        if (userRole === 'gea') {
          allowedRoles.push(...Object.keys(state.roles));
        } else if (userRole === 'sea') {
          allowedRoles.push('sea', 'eng', 'opr', 'obr');
        }
      }
      return allowedRoles;
    },
  },
  mutations: {
    SET_USER_ROLE(state, role) {
      state.user.profile = role;
    },
    ADD_ASSET(state, asset) {
      state.assets.push(asset);
    },
    ADD_CHANGE_LOG(state, log) {
      state.changeLog.push(log);
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    updateUserRole({ commit }, role) {
      commit('SET_USER_ROLE', role);
    },
    addAsset({ commit, state }, asset) {
      commit("ADD_ASSET", asset);
      commit("ADD_CHANGE_LOG", { id: state.changeLog.length + 1, changelog: 'New asset added' })
    },
    addUser({ commit, state }, data) {
      commit("ADD_USER", data);
      commit("ADD_CHANGE_LOG", { id: state.changeLog.length + 1, changelog: 'New User Added' })
    },
  },
  plugins: [
    createPersistedState({
      key: "vuex",
      paths: ["users", "assets", "changeLog"],
    }),
  ],
});
