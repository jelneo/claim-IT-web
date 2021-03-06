<template>
  <v-container full-width>
    <v-app-bar app color="primary" dark>
      <v-row justify="start">
        <v-col lg="1">
          <router-link to="/">
            <v-img :src="require('../assets/claim_it_logo_white.png')" contain height="55" />
          </router-link>
        </v-col>
        <v-row align="center">
          <v-col>
            <h3>Claims Management Portal (Demo)</h3>
          </v-col>
        </v-row>
      </v-row>
    </v-app-bar>
    <v-row no-gutters justify="end">
      <v-col lg="10">
        <b>What are current risky claims?</b>
        <p>
          These claims have just been submitted and flagged by our model to have a possibility of being unauthorised.
          Review the claim by clicking on the tick to approve and the cross to reject and our model will learn your decision.
        </p>
        <p>Similar future claims will be auto-processed leaving you with less work.</p>
        <v-data-table :headers="claimHeaders" :items="getClaimList" class="elevation-1">
          <template v-slot:top>
            <v-toolbar color="blue lighten-4 blue--text text--darken-2" flat>
              <v-col>
                <v-toolbar-title color="blue darken-2">Review Current Risky Claims (Outliers)</v-toolbar-title>
              </v-col>
              <v-col cols="8">
                <v-row justify="end">
                  <v-btn>Submit</v-btn>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.isApproved="{ item }">
            <!-- <v-icon small class="mr-2" @click="approve(item)">mdi-check</v-icon>
            <v-icon small @click="reject(item)">mdi-close</v-icon>-->
            <v-simple-checkbox color="green darken-2" v-model="item.isApproved"></v-simple-checkbox>
          </template>
          <template v-slot:item.risk="{ item }">
            <v-chip :color="getColor(item.risk)" dark>{{ item.risk }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col md="4">
        <v-navigation-drawer absolute permanent width="18%">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import claims from "../assets/data/validation_output.json";

export default {
  name: "Review",
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-chart-arc", linkTo: "/dashboard" },
      {
        title: "Review current risky claims",
        icon: "mdi-pen",
        linkTo: "/review"
      },
      {
        title: "Review all non-risky claims",
        icon: "mdi-desktop-classic",
        linkTo: "/review-processed"
      }
    ],
    claimHeaders: [
      { text: "Claim Ref", sortable: true, value: "clmRef" },
      { text: "Emp Dept", sortable: true, value: "dept" },
      { text: "Claim system", sortable: true, value: "clmSys" },
      { text: "Date of travel", sortable: true, value: "trvDT" },
      { text: "Date of submission", sortable: true, value: "subDT" },
      { text: "Day of claim", sortable: true, value: "dayOfClaim" },
      { text: "Day type", sortable: true, value: "dayType" },
      {
        text: "Type of transport claim",
        sortable: true,
        value: "transportType"
      },
      { text: "Claim purpose", sortable: true, value: "claimPurp" },
      { text: "Journey start time", sortable: true, value: "journeyStartTime" },
      { text: "Claim amount ($)", sortable: true, value: "claimAmt" },
      { text: "Flagged as risky", sortable: true, value: "risk" },
      { text: "Approve?", value: "isApproved", sortable: false }
    ],
    claimList: []
  }),
  methods: {
    getColor(isRisky) {
      if (isRisky) {
        return "red";
      }
      return "green";
    },
    approve(item) {
      this.editedIndex = this.claimList
        .map(function(x) {
          return x.clmRef;
        })
        .indexOf(item.clmRef);
      console.log(item.risk + " approve");
    },
    reject(item) {
      console.log(item + "reject");
    }
  },
  computed: {
    getClaimList() {
      let items = this.claimList.map(item => ({
        clmRef: item["CLM.REF"],
        empID: item.ID,
        dept: item.DEPT,
        clmSys: item["CLM.SYS"],
        trvDT: item["TRV.DT"],
        subDT: item["CLM.SUB.DT"],
        dayOfClaim: item["Travel.Day.Name"],
        dayType: item["Travel.Day.Type"],
        transportType: item.TYPE,
        claimPurp: item.PURPOSE,
        journeyStartTime: item["JOURNEY.STR"],
        claimAmt: (Math.round(item["CLM.AMT"] * 100) / 100).toFixed(2),
        risk: item.Risk == 1 ? true : false,
        isApproved: false
      }));
      return items;
    }
  },
  async created() {
    this.claimList = claims.filter(x => x.Risk == 1);
  }
};
</script>
<style scoped>
.container {
  max-width: 94vw;
}
</style>
<style scoped>
.v-chip {
  font-size: 0.9em;
}
</style>