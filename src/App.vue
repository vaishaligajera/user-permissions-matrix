<template>
  <div id="app" class="grid grid-cols-[200px_1fr]">
    <nav>
      <Sidebar />
    </nav>
    <main class="h-screen overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "App",
  components: {
    Sidebar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
