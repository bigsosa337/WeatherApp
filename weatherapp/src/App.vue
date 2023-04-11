<template>
  <div class="main">
    <ModalPopUp v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey"/>
    <NavCompVue v-on:add-city="toggleModal" v-on:edit-cities="toggleEdit" :addCityActive="addCityActive"/>
    <router-view v-bind:cities="cities" v-bind:edit="edit" :APIkey="APIkey"/>
  </div>
</template>


<script>
//dependencies
import axios from "axios";
import db from "./firebase/firebaseinit"
import { collection, updateDoc, onSnapshot } from "firebase/firestore"
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
    APIkey: "55fd10a791998ae62adaa1c4ca11749e",
    city: "Bucharest",
    cities: [],
    modalOpen: null,
    edit: null,
    addCityActive: null,
    };
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: { 

  async getCityWeather() {
  const fireDB = collection(db, "cities");

  onSnapshot(fireDB, async (snap) => {
    snap.docChanges().forEach(async (change) => {
      const doc = change.doc;
      console.log(change.type)
        if (change.type === "added" && !change.Nd) {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${doc.data().city}&units=metric&appid=${this.APIkey}`
            );
            const data = response.data;
            await updateDoc(doc.ref, {
              currentWeather: data,
            });
            this.cities.push(doc.data());
          } catch (err) {
            console.log(err);
          }
        } else if (change.type === "added" && change.Nd) {
          this.cities.push(doc.data());
        } else if (change.type === 'removed') {
          this.cities = this.cities.filter(city => city.city !== doc.data().city)
        }
      });
    });
  },
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  },
  toggleEdit() {
    this.edit = !this.edit;
  },
  checkRoute() {
    if (this.$route.name === "AddCity") {
      this.addCityActive = true;
      console.log(this.addCityActive)
    } else {
      this.addCityActive = false;
      console.log(this.addCityActive)

    }
  }
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
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
