<template>
  <div class="main">
    <ModalPopUp v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey"/>
    <NavCompVue v-on:add-city="toggleModal"/>
    <router-view v-bind:cities="cities" />
  </div>
</template>


<script>
//dependencies
import axios from "axios";
import db from "./firebase/firebaseinit"
import { collection, getDocs, updateDoc } from "firebase/firestore"
//components
import NavCompVue from './components/NavComp.vue';
import ModalPopUp from "./components/ModalPopUp.vue";

export default {
  name: "App",
  components: {
    NavCompVue,
    ModalPopUp
  },
  data() {
    return {
    APIkey: "8f682a995a53fb3c82ab7fb6f6bcec48",
    city: "Bucharest",
    cities: [],
    modalOpen: null,
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    async getCityWeather() {
    const citiesCollection = collection(db, "cities");

    const querySnapshot = await getDocs(citiesCollection);
    querySnapshot.forEach(async(doc) => {
      console.log(doc.data().city);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${doc.data().city}&units=metric&appid=${this.APIkey}`
        );
        const data = response.data;

        await updateDoc(doc.ref, {
          currentWeather: data,
        }).then(() => {
          this.cities.push(doc.data())
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  },

    getCurrentWeather() {
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
      ).then(res => {
        console.log(res.data)
      })
    },
  },
};


</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
}

.main {
  height: 100vh;
  max-width: 1024px;
  margin: auto;

  .container {
    padding: 0 20px;

  }
}
</style>
