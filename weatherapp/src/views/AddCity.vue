<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
      <CityComp class="citycard" v-bind:city="city" />
    </div>
  </div>
</template>

<script>
import CityComp from "../components/CityCard.vue"

export default {
  name: 'AddCity',
  props: ['cities'],
  created() {
    console.log(this.cities);
  },
  components: {
    CityComp,
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  padding-top: 80px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    
  }

  .city-link {
    margin: 10px;
  }

  
}
</style>