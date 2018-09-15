<template>
    <div id="main">
       <app-header></app-header>
       <div class="container">
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
    import Header from './Header.vue'
    export default {
        name: 'main-app',
        components: {
            'app-header': Header
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
