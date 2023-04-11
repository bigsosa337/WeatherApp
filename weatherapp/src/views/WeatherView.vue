<template>
  <div class="main">
    <div v-if="loading" class="loading">
        <span></span>
    </div>
    <div v-else class="weather" :class="{day: isDay, night: isNight}">
        <div class="weather-wrap" >
            <CurrentWeather
            :isDay="isDay" :isNight="isNight"
            :currentWeather="currentWeather"
            />
            <HourlyWeather :forecast="forecast"/>
            <WeeklyForecast :forecast="forecast" />
            <AdditionalInfo :currentWeather="currentWeather"/>
        </div>
    </div>
  </div>
</template>

<script>
//db and dependencies import
import axios from 'axios';
import db from '@/firebase/firebaseinit';
import {  collection, query, where, getDocs } from "firebase/firestore";

//component
import CurrentWeather from '../components/CurrentWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';
import WeeklyForecast from '@/components/WeeklyForecast.vue';
import AdditionalInfo from '@/components/AdditionalInfo.vue';


export default {
    name: "WeatherView",
    props: ["APIkey", "isDay", "isNight"],
    components: {
        CurrentWeather,
        HourlyWeather,
        WeeklyForecast,
        AdditionalInfo
    },
    data() {
        return {
            forecast: null,
            currentWeather: null,
            loading: true,
            currentTime: null,
        }
    },
    created() {
        this.getWeather();
    },
    beforeUnmount() {
        this.$emit("resetDays");
    },
    methods: {
        getWeather() {
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
                    this.getCurrentTime();
                })
                })
            })         

        },
        getCurrentTime() {
            const dateObj = new Date();
            this.currentTime = dateObj.getHours();

            const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours();
            const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();

            if (this.currentWeather > sunrise && this.currentWeather < sunset) {
                this.$emit('is-day');
            } else {
                this.$emit('is-night');
            }

        }
    }
}
</script>

<style lang="scss" scoped>

.weather {
    border-radius: 10px;
}
   .loading {
    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 2px solid transparent;
        border-top-color: #142a5f;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
   }
   .weather {
    transition: 500ms ease;
    overflow: scroll;
    width: 100%;
    height: 100%;
    &::-webkit-scrollbar {
          width: 0px;
          padding-top: 10px;
          height: 5px;
        }

        &::-webkit-scrollbar-track {
          background: #383838;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 10px;
        }

    .weather-wrap {
        overflow: hidden;
        max-width: 1024px;
        margin: 0 auto;
        padding: 0 15px;
        
    }
   }
</style>