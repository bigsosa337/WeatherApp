<template>
    <div>
        <header v-if="addCityActive" class="container add-city">
          <nav>
              <span>Home</span>
              <div class="right">
                  <i @click="editCities" ref="editCities" class="fa fa-pencil"></i>
                  <i @click="reloadApp" class="fa fa-refresh"></i>
                  <i @click="addCity" class="fa fa-plus-circle"></i>
              </div>
          </nav>
        </header>
    
        <header v-else class="container" :class="{day: isDay, night: isNight}">
            <nav>
                <router-link class="router-link" :to="{name: 'AddCity'}">
                    <i class="fa fa-angle-left"></i>
                </router-link>
                <span>
                    {{ new Date().toLocaleDateString("en-us", { weekday: "short"}) }},
                    {{ new Date().toLocaleDateString("en-us", { month: "short"}) }},
                    {{ new Date().toLocaleDateString("en-us", { day: "2-digit"}) }},
                </span>
                <span>&deg; C</span>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: "NavComponent",
    props: ['addCityActive', 'isDay', 'isNight'],
    methods: {
        addCity() {
            this.$emit('add-city');
        },
        reloadApp() {
            location.reload();
        },
        editCities() {
            this.$emit('edit-cities');
            this.$refs.editCities.classList.toggle('edit-active');
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    border-radius: 0 0 10px 10px;
}
.add-city {
        background-color: #1351ce9c;
        border-radius: 0 0 10px 10px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.86);
        backdrop-filter: blur(20px);

    }

header {
 
    // z-index: 99;
    position: fixed;
    max-width: 1024px;
    width: 100%;
  
    nav {
        display: flex;
        color: #ffff;
        padding: 30px 0;
        justify-content: space-between;
    }

    .edit-active {
        color: rgba(210, 75, 75, 1);
    }

    .router-link {
        color: white;
    }
    .right {
        i {
            font-size: 20px;
            &:hover {
                color: yellowgreen;
                cursor: pointer;
            }
        }

        i:nth-child(2),
        i:nth-child(3) {
            margin-left: 16px;
        }
    }

    span {
        font-weight:600;
    }
}

</style>