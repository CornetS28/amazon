<template>
<div>
    <h1>{{ name }}</h1>
    <input v-model = name>
  <button @click="onClick">click me here</button>
</div>
</template>

<script>
import defaultVue from "../layouts/default.vue";

export default {
  data() {
    return {
      name: "This is thae about me page"
    };
  },
  methods: {
    onClick() {
      alert(this.name);
    }
  }
}
</script>