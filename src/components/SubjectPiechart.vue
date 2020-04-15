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
      db.collection(`/students/${this.student.id}/openCredits`)
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
                this.getTotal("Upcoming"),
                this.getTotal("Current"),
                this.getTotal("Achieved") +
                  this.getTotal("Merit") +
                  this.getTotal("Excellence"),
                this.getTotal("Not Achieved") + this.getTotal("Not Submitted")
              ],
              backgroundColor: ["#209cee", "#ffdc57", "#23d160", "#ff3860"],
              label: "Dataset 1"
            }
          ],
          labels: ["Upcoming", "Current", "Achieved", "Not Achieved"]
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
