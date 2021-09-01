<template>
  <canvas
    v-if="!subjectName"
    v-bind:id="studentName + 'Chart'"
    class="pie"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></canvas>
  <canvas
    v-else
    v-bind:id="studentName + subjectName + 'Chart'"
    class="pie"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></canvas>
</template>

<script>
import { storage, db } from "./firebaseInit";
import Chart from "chart.js";
import "chartjs-plugin-labels";

export default {
  name: "PieChart",
  props: [
    "studentName",
    "student",
    "subjectName",
    "standards",
    "height",
    "width",
    "labels",
  ],
  components: {},
  data() {
    return {
      photo: null,
      standardStatus: [],
      pieChart: null,
      chartCount: null,
    };
  },
  mounted() {
    // console.log("============ pie mounted")
    // console.log("student:",this.studentName)
    // console.log("standards:",this.standards)
    // console.log("subject:",this.subjectName)
    // get standards from firebase (standards data now propped in)
    // this.$bind( "standards", db.collection(`/students/${this.student.id}/openCredits2020`) );
  },
  watch: {
    standards: {
      handler: "loadChart",
    },
  },
  methods: {
    getNormalProfilePic(name) {
      name = name.split(" ").join("");
      storage
        .ref("taiohi/" + name.toLowerCase() + ".png")
        .getDownloadURL()
        .then((url) => {
          this.photo = url;
        });
    },
    // chart methods
    getTotal(status) {
      // console.log("getting total")

      const standardsByStatus = this.standards.filter(
        (stnd) => stnd.completed == status
      );

      const total = standardsByStatus.reduce(
        (prev /* number */, curr /* standard */) =>
          Number(prev) + Number(curr.assessmentCredits),
        0
      );

      // console.log("total:",total)
      return total;
    },
    loadChart() {
      // console.log("loading chart...");
      // console.log(this.subjectName)

      if (!this.subjectName) {
        var ctx = document.getElementById(this.studentName + "Chart");
      } else {
        var ctx = document.getElementById(
          this.studentName + this.subjectName + "Chart"
        );
      }

      let chartOptions = {
        type: "pie",
        data: {
          datasets: [
            {
              data: [
                this.getTotal("Upcoming"),
                this.getTotal("Current"),
                this.getTotal("Moderation"),
                this.getTotal("Achieved") +
                  this.getTotal("Merit") +
                  this.getTotal("Excellence"),
                this.getTotal("Not Achieved") + this.getTotal("Not Submitted"),
              ],
              backgroundColor: [
                "#209cee",
                "#ffdc57",
                "#fbb13c",
                "#23d160",
                "#ff3860",
              ],
              label: "Dataset 1",
            },
          ],
          labels: [
            "Upcoming",
            "Current",
            "Moderation",
            "Achieved",
            "Not Achieved",
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
            position: "bottom",
            fullWidth: true,
            labels: {
              boxWidth: 10,
              fontSize: 10,
            },
          },
          plugins: {
            labels: {
              render: "none",
            },
          },
        },
      };

      if (this.labels) {
        chartOptions.options.plugins = {
          labels: {
            render: "value",
            fontColor: "#fff",
            position: "default",
            outsidePadding: 4,
            fontSize: 15,
          },
        };
      }

      // .getContext("2d");
      this.pieChart = new Chart(ctx, chartOptions);
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Chango&display=swap");

.card {
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  /* background-color: hsl(141, 71%, 48%); */
  background-color: rgba(0, 0, 0, 0.05);
  height: 80px;
  width: calc(50% - 20px);
}

.profilePic {
  /* border: 1px solid rgba(0,0,0,0.05); */
  background-color: rgb(132, 136, 141);
  border-radius: 50%;
  /* width: 100px; */
  height: 100%;
  box-shadow: none;
  margin-left: 10px;
}

.creditTotal {
  width: 100px;
  height: 100px;
  margin: 0px 10px;
  font-family: "Chango", cursive;
  color: white;
  font-size: 30px;
  background-color: #23d160;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie {
  max-width: 100px;
  max-height: 100px;
}
</style>
