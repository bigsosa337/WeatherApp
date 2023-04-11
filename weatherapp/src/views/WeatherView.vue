<template>
  <h4>weather</h4>
</template>

<script>
import axios from 'axios';
import db from '@/firebase/firebaseinit';
import {  collection, query, where, getDocs } from "firebase/firestore";


export default {
    name: "WeatherView",
    props: ["APIkey"],
    data() {
        return {
            forecast: null,
            currentWeather: null,
            loading: true,
        }
    },
    created() {
        this.getWeather();
    },
    methods: {
        getWeather () {
             // eslint-disable-next-line
            const querySnapshot =  getDocs(query(collection(db, 'cities'), where('city', '==', `${this.$route.params.city}`)))
            .then((docs) => {
                docs.forEach(doc => {
                    this.currentWeather = doc.data().currentWeather
                    axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutley,alert&units=metric&appid=${this.APIkey}`
                ).then(res => {
                    this.forecast = res.data
                }).then(() => {
                    this.loading = false
                    console.log(this.forecast)
                    console.log(this.currentWeather)
                })
                })
            })         

        }
    }
}
</script>

<style>
    h4 {
        padding-top: 100px;
    }

</style>