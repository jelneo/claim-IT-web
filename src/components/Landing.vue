<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-row justify="end">
        <v-col class="text-right">
          <v-btn align="right">Login</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/claim_it_logo.png')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Claim IT</h1>

        <p
          class="subheading font-weight-regular"
        >Claims pipeline simplified thanks to <i>you</i></p>
        <v-btn @click="skipLogin">Try it</v-btn>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">How does it work?</h2>
        <p>Using past judgement from auditors and current judgement from processing new claims, we create a self-learning model that continuously learns the decision-making process behind approving or rejecting a claim. 
          This is done by manually approving or rejecting claims that are flagged as high risk by our unsupervised learning model. High risk claims are defined as claims that have a high possibility of being unauthorised for e.g. personal expenses.</p>
        <v-row justify="center">
          <p></p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Landing",

  data: () => ({
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  }),
  methods: {
    skipLogin() {
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>
