<template>
  <div class="container">

    <!-- <h2 class="title is-6 has-text-centered" v-if="!overview">FITNESS & CONDITIONING</h2> -->
    <!-- <div class="columns is-mobile"> -->

    <!-- FITNESS & CONDITIONING COMMENT -->
    <IndividualComment  :student="student" :reportComments="reportComments.filter(fitnessComment)" :fitness="true" />
    <!-- <IndividualComment  :student="student" :reportComments="fitnessComment()" :fitness="true" /> -->

    <div v-if="a4" class="chartsContainerColumn">
      <!-- Pie Chart.js -->
      <div class="chartFull">
        <img class="fitnessIcon" v-bind:src="require('@/assets/running.png')" />
        <canvas
          v-bind:id="studentName+'RunChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
      <div class="chartFull">
        <img class="fitnessIcon" v-bind:src="require('@/assets/yoyo.png')" />
        <!-- <canvas v-bind:id="studentName+'YoyoChart'" style="height: 250px; width: 230px;"></canvas> -->
        <canvas
          v-bind:id="studentName+'YoyoChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
      
    </div>

    <div v-if="a4" class="chartsContainerRow">
    <div class="chartQuarter">
        <img class="fitnessIcon" v-bind:src="require('@/assets/situps.png')" />
        <canvas
          v-bind:id="studentName+'SitupsChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
      <div class="chartQuarter">
        <img class="fitnessIcon" v-bind:src="require('@/assets/pushup.png')" />
        <canvas
          v-bind:id="studentName+'PressupsChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
    <div class="chartQuarter">
        <img class="fitnessIcon" v-bind:src="require('@/assets/burpee.png')" />
        <canvas
          v-bind:id="studentName+'BurpeesChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
    <div class="chartQuarter">
        <img class="fitnessIcon" v-bind:src="require('@/assets/squat.png')" />
        <canvas
          v-bind:id="studentName+'AirsquatsChart'"
          style="position: relative; height: 250px; width:100%"
        ></canvas>
      </div>
      
    </div>


    <!-- not A4 -->
    <div v-if="!a4" class="chartsContainerFlex">
      <!-- Pie Chart.js -->
      <div class="chartLeftFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/running.png')" />
        <canvas
          v-bind:id="studentName+'RunChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
      <div class="chartCenterFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/yoyo.png')" />
        <!-- <canvas v-bind:id="studentName+'YoyoChart'" style="height: 250px; width: 230px;"></canvas> -->
        <canvas
          v-bind:id="studentName+'YoyoChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
      <div class="chartRightFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/pullups.png')" />
        <canvas
          v-bind:id="studentName+'StrengthChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
    </div>

    <div class="columns" id="accordion">
      <!-- Subject accordian here -->
      <!-- <SubjectAccordion :student="student"/> -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import Chart from "chart.js";
import "chartjs-plugin-labels";
import { db } from "./firebaseInit";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);

import IndividualComment from "./IndividualComment.vue";

export default {
  name: "FitnessPage",
  components: {
    IndividualComment
  },
  props: ["student", "overview", "a4"],
  data() {
    return {
      standards: [],
      standardStatus: [],
      reportComments: [],
      fitnessData: [],
      run4k: [],
      yoyo: [],
      pressup: [],
      situp: [],
      pullup: [],
      runChart: null,
      strengthChart: null,
      chartCount: null,
      studentName: null
    };
  },
  firestore: {
    // fitnessData: db.collection(`/students/${this.student.id}/fitnessData/2019`)
  },
  mounted() {
    // get fitness data from firebase
    this.$bind(
      "fitnessData",
      db.collection(`/students/${this.student.id}/fitnessData2021/`)
    );
     this.$bind(
      "reportComments",
      db.collection(`/students/${this.student.id}/reportComments2021`)
    )

    this.studentName = this.student.given_name;
  },
  watch: {
    fitnessData: {
      handler: "loadChart"
    }
  },
  computed: {},
  methods: {
    fitnessComment(report) {
      console.log("getting F&C comment")
      //get the fitness & conditioning comment only
      if (report.subject == "Fitness & Conditioning") {
        return report
      }
    },
    getFitnessData(activity) {
      

      //get fitness data
      let fitnessStuff = this.fitnessData.filter(
        fit => fit.nsn == this.student.id
      );

      // check if fitnessStuff is populated
      if (fitnessStuff.length < 1) {
        console.log("No fitness data");
        return
      }

      switch (activity) {
        case "run4k":{
          const run4kTimes = fitnessStuff[0].run4k;
          //get index of training absenses
          const run4kempties = run4kTimes.flatMap((runs, i) => runs === '' ? i : []);
          //remove times and dates student wasnt there.
          const filteredrun4k = run4kTimes.filter((d, i) => run4kempties.indexOf(i) == -1)
          // console.log(run4kTimes)
          // console.log(run4kempties)
          // console.log(filteredrun4k)
          return filteredrun4k;
        }
        case "yoyo":{
          const yoyoTimes = fitnessStuff[0].yoyo;
          const yoyoempties = yoyoTimes.flatMap((yoyo, i) => yoyo === '' ? i : []);
          const filteredyoyo = yoyoTimes.filter((d, i) => yoyoempties.indexOf(i) == -1)
          return filteredyoyo;
        }
        case "pressups":{
          const pressupsTimes = fitnessStuff[0].pressups
          const pressupsempties = pressupsTimes.flatMap((pressup, i) => pressup === '' ? i : []);
          const filteredpressups = pressupsTimes.filter((d, i) => pressupsempties.indexOf(i) == -1)
          return filteredpressups;
        }
        case "situps":{
          const situpsTimes = fitnessStuff[0].situps
          const situpsempties = situpsTimes.flatMap((situp, i) => situp === '' ? i : []);
          const filteredsitups = situpsTimes.filter((d, i) => situpsempties.indexOf(i) == -1)
          return filteredsitups;
        }
        case "burpees":{
          const burpeesTimes = fitnessStuff[0].burpees
          const burpeesempties = burpeesTimes.flatMap((burpee, i) => burpee === '' ? i : []);
          const filteredburpees = burpeesTimes.filter((d, i) => burpeesempties.indexOf(i) == -1)
          return filteredburpees;
        }
      case "airsquats":{
        const airsquatsTimes = fitnessStuff[0].airsquats
        const airsquatsempties = airsquatsTimes.flatMap((airsquat, i) => airsquat === '' ? i : []);
        const filteredairsquats = airsquatsTimes.filter((d, i) => airsquatsempties.indexOf(i) == -1)
        return filteredairsquats;
      }
        default:
      }
    },
    getLengthArray(activity) {
      //get fitness data
      let fitnessStuff = this.fitnessData.filter(
        fit => fit.nsn == this.student.id
      );

      // check if fitnessStuff is populated
      if (fitnessStuff.length < 1) {
        console.log("No fitness data");
        return
      }

      switch (activity) {
        case "run4k":{
          const run4kTimes = fitnessStuff[0].run4k;
          const run4kDates = fitnessStuff[0].run4kDates;
          //get index of training absenses
          const run4kempties = run4kTimes.flatMap((runs, i) => runs === '' ? i : []);
          //remove dates student wasnt there.
          const filteredrun4kDates = run4kDates.filter((d, i) => run4kempties.indexOf(i) == -1)
          return filteredrun4kDates;
        }
        case "yoyo":{
          const yoyoTimes = fitnessStuff[0].yoyo;
          const yoyoDates = fitnessStuff[0].yoyoDates;
          const yoyoempties = yoyoTimes.flatMap((yoyo, i) => yoyo === '' ? i : []);
          const filteredyoyoDates = yoyoDates.filter((d, i) => yoyoempties.indexOf(i) == -1)
          return filteredyoyoDates;
        }
        case "pressups":{
          const pressupsTimes = fitnessStuff[0].pressups;
          const pressupsDates = fitnessStuff[0].strengthDates;
          const pressupsempties = pressupsTimes.flatMap((preesup, i) => preesup === '' ? i : []);
          const filteredpressupsDates = pressupsDates.filter((d, i) => pressupsempties.indexOf(i) == -1)
          return filteredpressupsDates;
        }
        case "situps": {
          const situpsTimes = fitnessStuff[0].situps;
          const situpsDates = fitnessStuff[0].strengthDates;
          const situpsempties = situpsTimes.flatMap((situp, i) => situp === '' ? i : []);
          const filteredsitupsDates = situpsDates.filter((d, i) => situpsempties.indexOf(i) == -1)
          return filteredsitupsDates;
        }
        case "airsquats": {
          const airsquatsTimes = fitnessStuff[0].airsquats;
          const airsquatsDates = fitnessStuff[0].strengthDates;
          const airsquatsempties = airsquatsTimes.flatMap((airsquat, i) => airsquat === '' ? i : []);
          const filteredairsquatsDates = airsquatsDates.filter((d, i) => airsquatsempties.indexOf(i) == -1)
          return filteredairsquatsDates;
        }
        case "burpees": {
          const burpeesTimes = fitnessStuff[0].burpees;
          const burpeesDates = fitnessStuff[0].strengthDates;
          const burpeesempties = burpeesTimes.flatMap((burpee, i) => burpee === '' ? i : []);
          const filteredburpeesDates = burpeesDates.filter((d, i) =>  burpeesempties.indexOf(i) == -1)
          return filteredburpeesDates;
        }
        default:
      }
    },
    loadChart() {

      var run = document.getElementById(this.studentName + "RunChart");
      var yoyo = document.getElementById(this.studentName + "YoyoChart");
      var situps = document.getElementById(this.studentName + "SitupsChart");
      var burpees = document.getElementById(this.studentName + "BurpeesChart");
      var airsquats = document.getElementById(this.studentName + "AirsquatsChart");
      var pressups = document.getElementById(this.studentName + "PressupsChart");

      //=========== 4KM RUN CHART ===========
      this.runChart = new Chart(run, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("run4k"),
              label: "4km Time",
              backgroundColor: "#209cee",
              borderColor: "#209cee",
              fill: false,
              //datalabels: ,
            },
          ],
          labels: this.getLengthArray("run4k")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "4K Run"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                // type: 'time',
                // time: {
                //     unit: 'month'
                // },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Month"
                },
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Minutes"
                },
                ticks: {
                  reverse: true
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 10
            }
          }
        },
        plugins: {
          labels: {
            render: "value",
            fontColor: "#000",
            position: "border"
            // outsidePadding: 4
          }
        }
      });

      //=========== YOYO CHART ===========
      this.runChart = new Chart(yoyo, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("yoyo"),
              label: "Yoyo level",
              backgroundColor: "#23d160",
              borderColor: "#23d160",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getLengthArray("yoyo")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Yoyo"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Yoyo Level"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Level"
                },
                ticks: {
                  // beginAtZero: true
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 9
            }
          }
        }
      });

      //=========== SITUPS STRENGTH CHART ===========
      this.strengthChart = new Chart(situps, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("situps"),
              label: "Sit ups",
              backgroundColor: "#6457A6",
              borderColor: "#6457A6",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getLengthArray("situps")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Situps"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Term"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Reps"
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 9,
              textAlign: "center"
            }
          }
        }
      });

      //=========== PRESSUPS STRENGTH CHART ===========
      this.strengthChart = new Chart(pressups, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("pressups"),
              label: "Press ups",
              backgroundColor: "#ff8246",
              borderColor: "#ff8246",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getLengthArray("pressups")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Pressups"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Term"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Reps"
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 9,
              textAlign: "center"
            }
          }
        }
      });

      //=========== BURPEES STRENGTH CHART ===========
      this.strengthChart = new Chart(burpees, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("burpees"),
              label: "Burpees",
              backgroundColor: "#628395",
              borderColor: "#628395",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getLengthArray("burpees")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Burpees"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Term"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Reps"
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 9,
              textAlign: "center"
            }
          }
        }
      });

      //=========== AIRSQUATS STRENGTH CHART ===========
      this.strengthChart = new Chart(airsquats, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("airsquats"),
              label: "Air Squats",
              backgroundColor: "#EF306D",
              borderColor: "#EF306D",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getLengthArray("airsquats")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Airsquats"
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Term"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Reps"
                }
              }
            ]
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 10,
              fontSize: 9,
              textAlign: "center"
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
  justify-content: center;
}

.chartsContainerRow {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* border: 1px solid red; */
}

.chartsContainerColumn {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* border: 1px solid red; */
}

/* .chartLeft,
.chartCenter,
.chartRight {
  width: 50%;
} */

.chartFull {
  width: 100%;
}

.chartQuarter {
  width: 25%;
}

.chartLeftFlex,
.chartCenterFlex,
.chartRightFlex {
  margin-bottom: 50px;
}

.fitnessIcon {
  width: 25px;
  height: 25px;
}

@media (min-width: 1200px) {
  .chartsContainerFlex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* border: 1px solid red; */
  }
  .chartLeftFlex,
  .chartCenterFlex,
  .chartRightFlex {
    width: 50%;
    margin: auto;
    margin-bottom: 50px;
  }
}
</style>
