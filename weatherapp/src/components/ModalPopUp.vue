<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
        <label for="city-name">Enter a location:</label>
        <input type="text" name="city-name" placeholder="Search by city name" v-model="city">
        <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import db from "../firebase/firebaseinit"
import { collection, addDoc } from "firebase/firestore"; 


export default {
    name: "PopUp",
    props: ['APIkey', "cities"],
    data() {
        return {
            city: "",
        }
    },
    methods: {
        closeModal(e) {
            if (e.target === this.$refs.modal){
                this.$emit("close-modal");
            }
        },
        async addCity() {
            if (this.city === "") {
                alert ('Field cannot be empty!')
            } else if (this.cities.some((res) => res.city === this.city.toLowerCase())) {
                alert(`${this.city} already exists!`)
            } else  {

                try {
                    
                    const res = await axios.get(
                      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
                    );
                    const data = await res.data;
                    console.log(data);
                    /* eslint-disable */
                    const docRef = await addDoc(collection(db, "cities"), {
                        city: this.city,
                        currentWeather: data,
                    }).then(() => {
                        this.$emit('close-modal')
                    })
                } catch (error) {
                    alert(`${this.city} does not exist, please try again!`)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    z-index: 101;
    background: rgba(0,0,0, 0.5);
    backdrop-filter: blur(60px);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;

    label {
        color: white;
    }

    .modal-wrap {
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #31363d;
        box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

        input {
            color: white;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;

            &:focus {
                outline:none;
            }
        }
        button {
            background-color: #222325;
            color: #FFF;
            padding: 6px 20px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
    }
}
</style>