<template>
    <div @click="showWeather" class="city">
        <i @click="removeCity" class="far fa-trash-alt edit" ref="edit" v-if="edit"></i>
        <span>{{ this.city.city }}</span>
        <div class="weather">
            <span>{{ Math.round(this.city.currentWeather.main.temp) }}&deg;</span>
            <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="">
        </div>
        <div class="video">
            <video autoplay loop muted
             :src="require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)">
            </video>
            <div class="bg-overlay">

            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/firebaseinit';
import {  collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default {
    name: "CityComp",
    props: ['city', 'edit'],
    data() {
        return {
            id: null,
        }
    },
    created() {
        console.log(this.city)
    },
    methods: {
        async removeCity() {
        const querySnapshot = await getDocs(query(collection(db, 'cities'), where('city', '==', this.city.city)));         
        querySnapshot.forEach((queryDoc) => {
            this.id = queryDoc.id;
            deleteDoc(doc(db, 'cities', this.id)).then(() => {
                console.log('City deleted successfully!');
            }).catch((error) => {
                console.error('Error deleting city: ', error);
            });
        });
    },
        showWeather(e) {
            if (e.target === this.$refs.edit) {
                //
            } else {
                this.$router.push({name:"WeatherView", params: {city: this.city.city}})
            }
    }

    }}

</script>

<style lang="scss" scoped>
*{
    border-radius: 10px;
}
.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 240px;
    color: #ffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    &:hover {
        cursor: pointer;
    }

    .edit {
        border-radius: 0px 15px 0 0 ;
        border: 10px solid rgb(77,77,77);
        background-color: rgb(77,77,77);
        z-index: 1;
        font-size: 20px;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    span {
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;

    }

    .weather {
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;

        span {
            font-size: 35px;
            margin: 8px;
        }

        img {
            height: 20px;
            width: auto;
        }
    }

    .video {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video {
            height: 100%;
            @media(min-width: 900px) {
                height: auto;
                width: 100%;
            }
        }

        .bg-overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-color: rgba(0,0,0, 0.2);
          
        }
    }
}
</style>