<template>
  <div class="container">
    <!-- <h2 class="title is-6 has-text-centered" v-if="!overview">OVERVIEW</h2> -->
    <!-- <div class="columns is-mobile"> -->
    <div class="columns">
      <!-- Pie Chart.js -->
      <canvas v-bind:id="studentName+subjectName+'Chart'"></canvas>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { db } from "./firebaseInit";
import Chart from "chart.js";
import "chartjs-plugin-labels";

export default {
  name: "SubjectPiechart",
  props: ["student", "subject"],
  data() {
    return {
      standards: [],
      standardStatus: [],
      pieChart: null,
      chartCount: null,
      studentName: null,
      subjectName: null,
    };
  },
  components: {},
  computed: {},
  mounted() {
    // get standards from firebase
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2021`)
    );
    this.studentName = this.student.given_name;
    this.subjectName = this.subject;
  },
  watch: {
    standards: {
      handler: "loadChart"
    }
  },
  methods: {
    getTotal(status) {
    
      const standardsBySubject = this.standards.filter(
        stnd => stnd.subject == this.subjectName
      );

      const standardsByStatus = standardsBySubject.filter(
        stnd => stnd.completed == status
      );

      const total = standardsByStatus.reduce(
        (prev /* number */, curr /* standard */) =>
          Number(prev) + Number(curr.assessmentCredits),
        0
      );

      return total;
    },
    loadChart() {
      // console.log("loading chart...");
      var ctx = document.getElementById(this.studentName+this.subjectName + "Chart");
      // .getContext("2d");
      this.pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [
                this.getTotal("Upcoming"),      // 1
                this.getTotal("External"),      // 2
                this.getTotal("Current"),       // 3
                this.getTotal("In Moderation"), // 4
                this.getTotal("Achieved"),      // 5
                  this.getTotal("Merit"),       // 6
                  this.getTotal("Excellence"),  // 7
                this.getTotal("Not Achieved"),  // 8
                this.getTotal("Not Submitted")  // 9
              ],
              backgroundColor: [
                "lightgrey", // 1
                "#0E78BE", // 2
                "#ffdc57", // 3
                "#FFCE0A", // 4
                "#23d160", // 5
                "#209cee",// 6
                "#7957d5",// 7
                "#ff3860", // 8
                "grey"      // 9
              ],
              label: "Dataset 1"
            }
          ],
          labels: [
            "Upcoming",       // 1
            "External",       // 2
            "Current",        // 3
            "In Moderation",  // 4
            "Achieved",       // 5
            "Merit",          // 6
            "Excellence",     // 7
            "Not Achieved",   // 8
            "Not Submitted"   // 9
          ]
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
              fontSize: 10
            }
          },
          plugins: {
            labels: {
              render: "value",
              fontColor: "#fff",
              position: "border"
              // outsidePadding: 4
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

#accordion {
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>
