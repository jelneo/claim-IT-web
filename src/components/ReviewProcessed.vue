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
        <b>What are all non-risky claims?</b>
        <p>
          These claims from the past and present have been approved manually and labelled as not risky (i.e. high possibility of being an authentic and valid claim) but you can help to train future models by clicking on the cross to flag the claim as risky.
          This helps the model to learn and classify future claims more accurately.
          Risky claims are not shown here because they have been manually approved or rejected by Finance team.
        </p>
        <v-data-table :headers="claimHeaders" :items="getClaimList" class="elevation-1">
          <template v-slot:top>
            <v-toolbar color="blue lighten-4 blue--text text--darken-2" flat>
              <v-col>
                <v-toolbar-title color="blue darken-2">Review All Non-risky Claims</v-toolbar-title>
              </v-col>
              <v-col cols="9">
                <v-row justify="end">
                  <v-btn>Submit</v-btn>
                </v-row>
              </v-col>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.updateRisk="{ item }">
            <v-simple-checkbox color="red darken-2" v-model="item.updateRisk"></v-simple-checkbox>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip small :color="getStatusColor(item.status)" dark>{{ item.status }}</v-chip>
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
import claims from "../assets/data/outliers_output.json";

export default {
  name: "ReviewProcessed",
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
      { text: "Status", sortable: true, value: "status" },
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
      // { text: "Flagged as risky", sortable: true, value: "risk" },
      { text: "Should be risky?", value: "updateRisk", sortable: false }
    ],
    claimList: []
  }),
  methods: {
    getRiskColor(isRisky) {
      if (isRisky) {
        return "red";
      }
      return "green";
    },
    getStatusColor(status) {
      if (status === "Pending") {
        return "yellow darken-2";
      }
      return "green";
    },
    approve(item) {
      // this.editedIndex = this.claimList
      //   .map(function(x) {
      //     return x.clmRef;
      //   })
      //   .indexOf(item.clmRef);
      console.log(item.risk + " approve");
    },
    reject(item) {
      console.log(item + "reject");
    }
  },
  computed: {
    getClaimList() {
      console.log(typeof claims[0].Status);

      let items = this.claimList.map(item => ({
        clmRef: item["CLM.REF"],
        empID: item.ID,
        dept: item.DEPT,
        clmSys: item["CLM.SYS"],
        trvDT:
          typeof item["TRV.DT"] == "string"
            ? item["TRV.DT"]
            : new Date(item["TRV.DT"]).toLocaleDateString("en-SG"),
        subDT: new Date(item["CLM.SUB.DT"]).toLocaleDateString("en-SG"),
        dayOfClaim: item["Travel.Day.Name"].substring(0, 3),
        dayType: item["Travel.Day.Type"],
        transportType: item.TYPE,
        claimPurp: item.PURPOSE,
        journeyStartTime: item["JOURNEY.STR"],
        claimAmt: (Math.round(item["CLM.AMT"] * 100) / 100).toFixed(2),
        status: item.Status == 0 ? "Approved" : "Pending",
        risk: item.RISK == 1 ? true : false,
        updateRisk: false
      }));
      return items;
    }
  },
  created() {
    this.claimList = claims.filter(record => record.RISK == 0);
  }
};
</script>
<style scoped>
.container {
  max-width: 94vw;
}
</style>
