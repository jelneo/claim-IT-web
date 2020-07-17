<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-row justify="start">
        <v-col lg="1">
          <router-link to="/">
            <v-img :src="require('../assets/claim_it_logo.png')" contain height="63" />
          </router-link>
        </v-col>
        <v-row align="center">
          <v-col>
            <h3>Claims Management Portal (Demo)</h3>
          </v-col>
        </v-row>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer absolute permanent>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.linkTo">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    items: [
      { title: "Review current claims", icon: "mdi-pen", linkTo: "/review" },
      {
        title: "Review processed claims",
        icon: "mdi-desktop-classic",
        linkTo: "/review-processed"
      }
    ]
  })
};
</script>
