<template>
  <div class="p-4 md:p-5">
    <div>
      <h1>Welkom!</h1>

      <p class="my-3"> Smikkelweb is een hobbyproject. Ik werk vooralsnog in mijn eentje en kan niet garanderen dat
        alles altijd
        werkt.
        Daarnaast kan ik niet beloven dat de website zal blijven bestaan.
        Voortgang van dit project kun je vinden op <a class="underline" target="_blank"
          href="https://trello.com/b/WrtV1SV8/smikkelweb">deze pagina</a>.</p>

      <p class="my-3">Door een account aan te maken ga je akkoord met de volgende voorwaarden:</p>

      <p class="my-3">
        <b>
          Informatie alleen voor informatieve doeleinden:
        </b> De recepten en informatie op deze website worden uitsluitend
        verstrekt voor informatieve doeleinden. Wij garanderen niet de nauwkeurigheid, volledigheid of actualiteit van
        de verstrekte informatie.
      </p>
      <p class="my-3">
        <b>
          Eigen verantwoordelijkheid:
        </b> Het gebruik van de recepten is geheel voor eigen risico. Wij aanvaarden geen
        aansprakelijkheid voor enige schade, letsel of verlies als gevolg van het gebruik van de recepten,
        ingrediënten
        of kookmethoden die op deze website worden gedeeld.
      </p>
      <p class="my-3">
        <b>
          Geen garantie van resultaten:
        </b> Wij bieden geen garantie met betrekking tot de resultaten die worden verkregen
        door het gebruik van de recepten. Individuele resultaten kunnen variëren, en wij zijn niet verantwoordelijk
        voor
        eventuele negatieve gevolgen.
      </p>
      <p class="my-3">
        <b>
          Onafhankelijkheid van gebruikersbijdragen:
        </b> De recepten op deze website worden gedeeld door gebruikers, en wij
        onderschrijven niet noodzakelijkerwijs de inhoud. Wij zijn niet aansprakelijk voor de juistheid of veiligheid
        van door gebruikers verstrekte informatie.
      </p>
      <p class="my-3">
        <b>
          Geen professioneel advies:
        </b> De informatie op deze website mag niet worden beschouwd als professioneel advies.
        Raadpleeg altijd een gekwalificeerde professional voor specifiek advies met betrekking tot uw gezondheid,
        dieet
        of kookpraktijken.
      </p>
      <p class="my-3">
        <b>
          Geen professioneel advies:
        </b> De informatie op deze website mag niet worden beschouwd als professioneel advies.
        Raadpleeg altijd een gekwalificeerde professional voor specifiek advies met betrekking tot uw gezondheid,
        dieet
        of kookpraktijken.
      </p>
      <p class="my-3">
        Door deze website te gebruiken, stemt u in met deze aansprakelijkheidsvoorwaarden. Wij behouden ons het recht
        voor om deze voorwaarden op elk moment te wijzigen zonder voorafgaande kennisgeving.
      </p>
    </div>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      <nuxt-link class="text-blue-700 hover:underline dark:text-blue-500 px-2"
        @click="userStore.userModalState = 'register'">
        Terug naar account aanmaken
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUserStore } from '../../stores/userStore';
import { FwbButton } from 'flowbite-vue';
import { FwbSpinner } from 'flowbite-vue';
import { badUsernames } from '../../validators/badUsernames';
const userStore = useUserStore();

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const isLoggedIn = computed(() => userStore.isLoggedIn)
const loginVisible = computed(() => userStore.isModalVisible)

const isDisabled = ref(false);
const isLoading = ref(false);
watch(loginVisible, () => {
  userStore.loginError = ''
})

watch(username, () => {
  if (badUsernames.includes(username.value)) {
    userStore.loginError = 'Deze gebruikersnaam is niet toegestaan';
    isDisabled.value = true;
  } else {
    userStore.loginError = '';
    isDisabled.value = false;
  }
})

const onClickRegister = async (e: any) => {
  e.preventDefault();
  if (isDisabled.value) return
  if (!email.value || !password.value || !username.value || !passwordConfirm.value) {
    userStore.loginError = 'Vul alle velden in';
    return;
  }
  isLoading.value = true;
  await userStore.register(
    {
      username: username.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    });
  isLoading.value = false;
}

</script>