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
        <v-row not-gutters justify="center" align="start" class="mb-9">
          <h2><u>Welcome to the dashboard</u></h2>
        </v-row>
        <v-row no-gutters justify="start" align="center">
          <v-row>
            <v-col>
              <h3 class="ml-4">Claims by Department</h3>
              <div id="dept-chart">
                <apexchart type="bar" :options="deptChartOptions" :series="deptSeries" width="500"></apexchart>
              </div>
            </v-col>
            <v-col>
              <h3 class="ml-4">Transport Types</h3>
              <div id="transport-typechart">
                <apexchart
                  type="donut"
                  :options="transportChartOptions"
                  :series="transportSeries"
                  width="400"
                ></apexchart>
              </div>
            </v-col>
            <v-row no-gutters justify="start" align="center">
              <v-col class="ml-7">
                <v-data-table dense :headers="freqHeaders" :items="topClaimsFreq" class="elevation-1">
                  <template v-slot:top>
                    <v-toolbar color="blue lighten-4 blue--text text--darken-2" flat dense>
                      <v-toolbar-title color="blue darken-2" fon>Top 10 Claimers by Frequency</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
              <v-col class="ml-7">
                <v-data-table dense :headers="amtHeaders" :items="topClaimsAmt" class="elevation-1">
                  <template v-slot:top>
                    <v-toolbar color="blue lighten-4 blue--text text--darken-2" flat dense>
                      <v-toolbar-title color="blue darken-2" fon>Top 10 Claimers by Single Amount</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-row>
        </v-row>
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
import allClaims from "../assets/data/outliers_output.json";

export default {
  name: "Dashboard",
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-chart-arc", linkTo: "/dashboard" },
      { title: "Review current claims", icon: "mdi-pen", linkTo: "/review" },
      {
        title: "Review processed claims",
        icon: "mdi-desktop-classic",
        linkTo: "/review-processed"
      }
    ],
    departmentNames: [],
    departmentValues: [],
    amtHeaders: [
        { text: "Emp ID", sortable: true, value: "empId" },
      { text: "Claim Amount", sortable: true, value: "amt" },
    ],
    topClaimsAmt: [
        {empId: "608", amt: 60},
        {empId: "4128", amt: 57.90},
        {empId: "438", amt: 55.00},
        {empId: "3123", amt: 51.85},
        {empId: "3233", amt: 50.90},
        {empId: "4768", amt: 50.75},
        {empId: "3338", amt: 50.70},
        {empId: "3653", amt: 49.59},
        {empId: "348", amt: 48.40},
        {empId: "4998", amt: 46.70},
    ],
    freqHeaders: [
        { text: "Emp ID", sortable: true, value: "empId" },
      { text: "Frequency of claim", sortable: true, value: "freq" },
    ],
    topClaimsFreq: [
        {empId: "608", freq: 21},
        {empId: "4028", freq: 16},
        {empId: "438", freq: 11},
        {empId: "3153", freq: 11},
        {empId: "3233", freq: 11},
        {empId: "3768", freq: 10},
        {empId: "3338", freq: 10},
        {empId: "3653", freq: 6},
        {empId: "3498", freq: 5},
        {empId: "4698", freq: 3},
    ],
    deptChartOptions: {
      chart: {
        id: "dept-chart"
      },
      xaxis: {
        categories: [
          "Operations",
          "Marketing",
          "Finance",
          "HR",
          "Corporate Communications",
          "Legal and Compliance",
          "Sales",
          "Infocomm Technology",
          "Business Transformation"
        ]
      },
      colors: ["#F44336"]
    },
    deptSeries: [
      {
        name: "series-1",
        data: [269, 316, 169, 204, 148, 297, 143, 166, 164]
      }
    ],
    transportChartOptions: {
      labels: ["Private Car Hire", "Taxi"]
    },
    transportSeries: [742, 1134]
  }),
  methods: {
    wordFrequency(wordArray) {
      var newArray = [],
        wordObj;
      wordArray.forEach(function(word) {
        wordObj = newArray.filter(function(w) {
          return w.text == word;
        });
        if (wordObj.length) {
          wordObj[0].size += 1;
        } else {
          newArray.push({ text: word, size: 1 });
        }
      });
      return newArray;
    },
    getDeptList() {
      var deptList = allClaims.map(x => {
        return x.DEPT;
      });
      this.wordFrequency(deptList);
    },
    getTransportType() {
      var transportTypeList = allClaims.map(x => {
        return x.TYPE;
      });
      console.log(this.wordFrequency(transportTypeList));
    }
  },
  created() {
    this.getDeptList();
    this.getTransportType();
  }
};
</script>
<style scoped>
.container {
  max-width: 94vw;
}
</style>
<style scoped>
.v-toolbar-title {
  font-size: 0.9em;
}
</style>