<template>
  <div class="bg-gray-800 text-white p-4 text-left">
    <h1 class="text-2xl">{{ pageName }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      required: true,
    },
  },
};
</script>