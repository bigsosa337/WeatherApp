<template>
  <header class="container add-city">
    <nav>
        <span>Add City</span>
        <div class="right">
            <i @click="editCities" class="fa fa-pencil"></i>
            <i @click="reloadApp" class="fa fa-refresh"></i>
            <i @click="addCity" class="fa fa-plus-circle"></i>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
    name: "NavComponent",
    methods: {
        addCity() {
            this.$emit('add-city');
        },
        reloadApp() {
            location.reload;
        },
        editCities() {
            this.$emit('edit-cities');
        }
    }
}
</script>

<style lang="scss" scoped>
.add-city {
        background-color: #313640;
        border-radius: 0 0 10px 10px;
    }
header {
    .navigation {
    z-index: 99;
    position: fixed;
    max-width: 1920px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.86);
  }
    nav {
        display: flex;
        color: #ffff;
        padding: 30px 0;
        justify-content: space-between;
    }

    .right {
        i {
            font-size: 20px;
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