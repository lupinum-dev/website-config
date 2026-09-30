<script setup lang="ts">
defineProps<{ items: { id: number; name: string }[] }>()
</script>

<template>
  <ul>
    <li v-for="item in items" class="bg-pink-500">{{ item.name }}</li>
  </ul>
  <img src="/team.jpg">
</template>
