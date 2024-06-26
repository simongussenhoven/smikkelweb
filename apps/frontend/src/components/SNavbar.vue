<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <nuxt-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../docs/images/style/logo.png" class="h-8" alt="Smikkelweb logo">
      </nuxt-link>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse px-2">
        <button type="button" class="flex text-sm bg-gray-400 dark:bg-gray-800 rounded-full md:me-0 md:mr-1">
          <Icon @click="userStore.toggleDarkmode" class="darkmode-icon w-8 h-8 rounded-full" :color="getDarkModeProps.color" :name="getDarkModeProps.icon"/>
        </button>
        <button id="user-menu-button" type="button"
          class="flex text-sm bg-gray-400 dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
          @click="onClickUser">
          <span class="sr-only">Open user menu</span>
          <fwb-spinner class="w-8 h-8 rounded-full p-2" v-if="isUserStoreLoading" />
          <Icon v-else-if="!userStore.photo" class="w-8 h-8 rounded-full" :color="getUserProps.color" name="flowbite:user-solid"/>
          <img v-else class="w-8 h-8 rounded-full" :src="userImage" alt="user photo" :key="lastUpdated">
        </button>
        <div v-show="isLoggedIn" id="user-dropdown"
          class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{ userStore.username }}</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ userStore.email }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <SNavbarUserLink title="Gegevens wijzigen" @click="userStore.userModalState = 'edit'"
              data-modal-target="navbar-user" data-modal-hide="navbar-user" aria-controls="navbar-user" />
            <SNavbarUserLink title="Recept toevoegen" @click="onClickAddRecipe" data-collapse-toggle="navbar-user"
              aria-controls="navbar-user" />
            <SNavbarUserLink title="Update wachtwoord" @click="userStore.userModalState = 'reset'"
              data-collapse-toggle="navbar-user" aria-controls="navbar-user" />
            <SNavbarUserLink title="Account verwijderen" @click="userStore.userModalState = 'delete'"
              data-collapse-toggle="navbar-user" aria-controls="navbar-user" />
            <SNavbarUserLink title="Uitloggen" @click="onClickLogout" data-collapse-toggle="navbar-user"
              aria-controls="navbar-user" />

          </ul>
        </div>
        <button data-collapse-toggle="navbar-user" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div id="navbar-user" class="items-center hidden w-full md:flex md:w-auto md:order-1 justify-center">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <SNavbarLink title="Home" link="/" />
          <SNavbarLink title="Recepten" link="recepten" />
          <SNavbarLink v-if="isAdmin" title="Admin" link="admin" />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore'
import { useRecipeStore } from '../stores/recipeStore'
import { FwbSpinner } from 'flowbite-vue'

const userStore = useUserStore();
const recipeStore = useRecipeStore();
const isAdmin = computed(() => userStore.role === 'admin');
const isLoggedIn = computed(() => userStore.isLoggedIn);
const isUserStoreLoading = computed(() => userStore.isLoading);
const userImage = computed(() => userStore.photoPath)
const lastUpdated = computed(() => userStore.lastUpdated)
const useDarkmode = computed(() => userStore.useDarkmode)

const onClickUser = (e: any) => {
  if (userStore.isLoggedIn) {
    return
  }
  e.stopPropagation();
  userStore.isModalVisible = true;
}

const emit = defineEmits(['toggleDark'])

const onClickLogout = () => {
  userStore.logOut();
}

const onClickAddRecipe = () => {
  recipeStore.isModalVisible = true;
  recipeStore.recipeModalState = 'add';
}

const getDarkModeProps = computed(() => {
  return {
    color: useDarkmode.value ? 'grey' : 'white',
    icon: useDarkmode.value ? 'flowbite:sun-solid' : 'flowbite:moon-solid',
  }
})

const getUserProps = computed(() => {
  return {
    color: useDarkmode.value ? 'grey': 'white'
  }
})

</script>

<style lang="scss" scoped>
button {
  color: black;
}
</style>