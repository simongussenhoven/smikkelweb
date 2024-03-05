<template>
  <section class="hero bg-cover bg-[url('/docs/images/style/food-1920.jpg')] bg-gray-500 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 flex flex-col items-center">
      <h1 class="title mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
        Smikkelweb.com
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-300 sm:px-16 lg:text-xl">
        Vind en deel de lekkerste recepten op de leukste community van Nederland.
      </p>
      <div class="search-container w-96 md:w-1/2">
        <SSearchbar />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore';
import { useRoute, useRouter } from 'vue-router';
const userStore = useUserStore();

onMounted(() => {
  const route = useRoute()
  const router = useRouter()
  const token = route.query.token
  if (token) {
    userStore.resetHashToken = String(token)
  }
  router.push('/')
  if (userStore.resetHashToken) {
    userStore.isModalVisible = true
    userStore.userModalState = 'reset'
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@300&display=swap');

.hero {
  flex-grow: 1;
}

.title {
  font-family: "Lobster", sans-serif;
  font-weight: 800;
  font-style: normal;
}
</style>