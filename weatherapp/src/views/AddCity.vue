<template>
  <div class="main">
    <div v-if="cities.length === 0" class="no-cities">
      br
      <p>No cities added, add a new one?</p>
    </div>
    <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
      <CityComp class="citycard" v-bind:city="city" v-bind:edit="edit"/>
    </div>
  </div>
  </div>
</template>

<script>
import CityComp from "../components/CityCard.vue"

export default {
  name: 'AddCity',
  props: ['cities', 'edit'],
  created() {
    console.log(this.cities);
  },
  components: {
    CityComp,
  }
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1024px;
}
.no-cities {
  position: absolute;
  // min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
button {
  margin-top: 16%;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.grid {
  // margin-top: 100px;
  display: grid;
  padding: 30px 20px 30px 20px;  
  background-color: #0f37865b;
  backdrop-filter: blur(20px);
  width: 100%;
  // min-height: 100vh;
  border-radius: 10px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    
  }

  .city-link {
    margin: 10px;
    
  }
}
</style>