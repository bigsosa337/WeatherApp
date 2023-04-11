<template>
  <div class="main">
    <ModalPopUp v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey"
    :cities="cities"
    />
    <NavCompVue v-on:add-city="toggleModal" v-on:edit-cities="toggleEdit" :addCityActive="addCityActive"
    :isDay="isDay" :isNight="isNight"
    />
    <br><br><br><br><br>
    <router-view v-bind:cities="cities" v-bind:edit="edit" :APIkey="APIkey" v-on:is-day="dayTime"
    v-on:is-night="nightTime"
    v-on:resetDays="resetDays"
    :isDay="isDay" :isNight="isNight"
    />
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
    isDay: null,
    isNight: null,
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
  },
  dayTime() {
    this.isDay = !this.isDay
  },
  nightTime() {
    this.isNight = !this.isNight
  },
  resetDays() {
    this.isDay = false;
    this.isNight = false;
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
.day {
    transition: 500ms ease all;
    background-color: rgb(59,150,249);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.86);

}

.night {
    transition: 500ms ease all;
    background-color: rgb(20,42,95);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.86);

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
