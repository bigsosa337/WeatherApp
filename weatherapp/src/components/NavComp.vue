<template>
  <header class="container add-city">
    <nav>
        <span>Add City</span>
        <div class="right">
            <i class="far fa-edit"></i>
            <i class="far fa-sync"></i>
            <i class="far fa-plus"></i>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
    name: "NavComponent",
}
</script>

<style lang="scss" scoped>
.add-city {
        background-color: #313640;
    }
header {
    
    nav {
        display: flex;
        color: #ffff;
        padding: 30px 0;
        justify-content: space-between;
    }
}

</style>