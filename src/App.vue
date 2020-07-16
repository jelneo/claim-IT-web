<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >  
    </v-app-bar>
    <!-- <NavDrawer/> -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import NavDrawer from './NavDrawer'

export default {
  name: 'App',
  components: {
    // NavDrawer
  },

  data: () => ({
    //
  }),
};
</script>
