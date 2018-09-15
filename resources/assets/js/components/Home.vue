<template>
    <div class="container">
    	<h1>Welcome {{ welcome }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'home',
        computed: {
        	welcome(){
        		return this.$store.getters.currentUser.name;
        	}
        }
    }
</script>