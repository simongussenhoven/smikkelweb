<template>
  <div class="p-4 md:p-5">
    <form class="space-y-4" action="#">
    <div class="flex justify-center w-100">
      <img v-if="userStore.photo" :src="userStore.photoPath" alt="user" class="w-20 h-20 rounded-full"/> 
      <Icon v-else="!userStore.photo" class="w-8 h-8 rounded-full" color="grey" name="flowbite:user-solid" />
    </div>
      <fwb-file-input class="uploader" v-model="file"/>
      <div>
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Naam</label>
        <input id="username" v-model="username" type="text" name="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Gebruikersnaam" required>
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input id="email" v-model="email" type="email" name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="naam@voorbeeld.nl" required>
      </div>
      <span class="text-sm text-red-500 pt-5">{{ userStore.userError }}</span>

      <div class="flex">
        <fwb-button class="flex grow justify-center text-center" size="md" color="default" @click.stop="onClickUpdate">
          <fwb-spinner v-if="isLoading" color="gray" />
          <span v-else>Gegevens opslaan</span>
        </fwb-button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from '../../stores/userStore';
import { FwbButton, FwbSpinner, FwbFileInput } from 'flowbite-vue';
import { badUsernames } from '../../validators/badUsernames';
import { badDomains } from '../../validators/badDomains';

const userStore = useUserStore();
const username = ref('')
const email = ref('')
const file = ref(null)
const loginVisible = computed(() => userStore.isModalVisible)
const isDisabled = ref(false);
const isLoading = ref(false);
const userImage = computed(() => {
  const fileName = userStore.photo ?? 'default-user.png';
  return `http://localhost:4000/api/v1/assets/img/users/${fileName}`
})

onMounted(() => {
  username.value = userStore.username;
  email.value = userStore.email;
})

watch(loginVisible, () => {
  userStore.userError = ''
})

watch(username, () => {
  if (badUsernames.includes(username.value.toLowerCase())) {
    userStore.userError = 'Deze gebruikersnaam is niet toegestaan';
    isDisabled.value = true;
  }
  else {
    userStore.userError = '';
    isDisabled.value = false;
  }
})

watch(email, () => {
  const domain = email.value.split('@')[1]
  if (badDomains.includes(domain?.toLowerCase())) {
    userStore.userError = 'Dit domein is niet toegestaan';
    isDisabled.value = true;
  }
  if (email.value.split('@')[1].toLowerCase().includes('smikkelweb.com')) {
    userStore.userError = 'Maak een account aan via de database of neem contact op met de webmaster';
    isDisabled.value = true;
  }
  else {
    userStore.userError = '';
    isDisabled.value = false;
  }
})

const onClickUpdate = async (e: any) => {
  e.preventDefault();
  if (!email.value || !username.value) {
    userStore.userError = 'Vul alle velden in';
    return;
  }
  if (userStore.userError) {
    return;
  }
  isLoading.value = true;
  await userStore.updateMe(
    {
      username: username.value,
      email: email.value,
      file: file.value
    });
  isLoading.value = false;
}

</script>
<style lang="scss" scoped>
  .uploader {
    :deep(svg) {
      display: none;
    }
  }
</style>