<template>
    <div class="city">
        <span>{{ this.city.city }}</span>
        <div class="weather">
            <span>{{ Math.round(this.city.currentWeather.main.temp) }}&deg;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CityComp",
    props: ['city'],
    created() {
        console.log(this.city)
    }
}
</script>

<style lang="scss" scoped>

</style>