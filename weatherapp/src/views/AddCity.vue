<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
      <CityComp class="citycard" v-bind:city="city" v-bind:edit="edit"/>
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
.grid {
  margin-top: 15px;
  display: grid;
  padding: 40px 20px 30px 20px;  
  background-color: #31363d;
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