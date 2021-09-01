<template>
  <div class="">
    <h2 class="title is-6 has-text-centered" v-if="!overview">FITNESS & CONDITIONING</h2>
    <!-- <div class="columns is-mobile"> -->

    <div v-if="a4" class="chartsContainer">
      <!-- Pie Chart.js -->
      <div class="chartLeft">
        <img class="fitnessIcon" v-bind:src="require('@/assets/running.png')" />
        <canvas
          v-bind:id="studentName+'RunChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
      <div class="chartCenter">
        <img class="fitnessIcon" v-bind:src="require('@/assets/yoyo.png')" />
        <canvas
          v-bind:id="studentName+'YoyoChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
      <div class="chartRight">
        <img class="fitnessIcon" v-bind:src="require('@/assets/pullups.png')" />
        <canvas
          v-bind:id="studentName+'StrengthChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
      </div>
    </div>

    <!-- not A4 -->
    <div v-if="!a4" class="chartsContainerFlex">
      <!-- Pie Chart.js -->

      <!-- 4KM -->
      <div class="chartLeftFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/running.png')" />
        <canvas
          v-bind:id="studentName+'RunChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>

        <!-- <div style="display: flex; flex-direction: column;">
          <div>
            <div style="font-weight: bold; margin: 10px 0;">4KM</div>
            
            <div v-bind:id="studentName+'Dom4k'" style="font-size: 4em; font-weight: 900; color: #209cee;">24</div>

            <div>MINS</div>
          </div> -->
          <!-- <div style="border: 2px solid blue; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div><span><img class="arrow" v-bind:src="require('@/assets/up.svg')" /></span> 2MINS</div>
            <div><span><img class="arrow" v-bind:src="require('@/assets/down.svg')" /></span> 1MINS</div>
          </div> -->
        <!-- </div> -->

      </div>

      <!-- YOYO -->
      <div class="chartCenterFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/yoyo.png')" />
        <canvas
          v-bind:id="studentName+'YoyoChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
        <!-- <div style="display: flex; flex-direction: column;">
          <div>
            <div style="font-weight: bold; margin: 10px 0;">YOYO</div>
            
            <div v-bind:id="studentName+'DomYoyo'" style="font-size: 4em; font-weight: 900; color: #23d160;">14.4</div>

            <div>LEVEL</div>
          </div> -->
          <!-- <div style="border: 2px solid blue; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div><span><img class="arrow" v-bind:src="require('@/assets/up.svg')" /></span> 2MINS</div>
            <div><span><img class="arrow" v-bind:src="require('@/assets/down.svg')" /></span> 1MINS</div>
          </div> -->
        <!-- </div> -->
      </div>

      <!-- STRENGTH -->
      <div class="chartRightFlex">
        <img class="fitnessIcon" v-bind:src="require('@/assets/pullups.png')" />
        <canvas
          v-bind:id="studentName+'StrengthChart'"
          style="position: relative; height: 250px; width:250px"
        ></canvas>
        <!--  SINGLE STRENGTH TEST (No chart)
        <div style="font-weight: bold; margin: 10px 0;">STRENGTH</div>
        <div style="display: flex; flex-direction: column; width: 100%;">
          <div style="display: flex; width: 100%;">
            <div style="width: 25%">
              <div style="font-size: 0.8em">PRESSUPS</div>
              <div  v-bind:id="studentName+'DomPressups'" style="font-size: 3em; font-weight: 900; color: #ff8246;">30</div>
              <div>REPS</div>
            </div>
            <div style="width: 25%">
              <div style="font-size: 0.8em">SITUPS</div>
              <div v-bind:id="studentName+'DomSitups'" style="font-size: 3em; font-weight: 900; color: #6457A6;">35</div>
              <div>REPS</div>
            </div>
            <div style="width: 25%">
              <div style="font-size: 0.8em">AIRSQUATS</div>
              <div v-bind:id="studentName+'DomAirquats'"  style="font-size: 3em; font-weight: 900; color: #EF306D;">55</div>
              <div>REPS</div>
            </div>
            <div style="width: 25%">
              <div style="font-size: 0.8em">BURPEES</div>
              <div v-bind:id="studentName+'DomBurpees'"  style="font-size: 3em; font-weight: 900; color: #628395;">25</div>
              <div>REPS</div>
            </div>
          </div>
          <div style="border: 2px solid blue; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div><span><img class="arrow" v-bind:src="require('@/assets/up.svg')" /></span> 2MINS</div>
            <div><span><img class="arrow" v-bind:src="require('@/assets/down.svg')" /></span> 1MINS</div>
          </div>
        </div> -->
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

export default {
  name: "ProfileFitness",
  props: ["student", "overview", "a4"],
  data() {
    return {
      standards: [],
      standardStatus: [],
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
    // get standards from firebase
    this.$bind(
      "standards",
      db.collection(`/students/${this.student.id}/openCredits2021`)
    );
    this.$bind(
      "fitnessData",
      db.collection(`/students/${this.student.id}/fitnessData2021/`)
    );

    this.studentName = this.student.given_name;
    // console.log("prop student is:", this.studentName);
  },
  watch: {
    fitnessData: {
      handler: "loadChart"
      // handler: "loadFitnessDOM"  * loadFitnessDOM is for only one set of data. no charts *
    }
  },
  computed: {},
  methods: {
    getFitnessData(activity) {
      //get fitness data
      let fitnessStuff = this.fitnessData.filter(
        fit => fit.nsn == this.student.id
      );
      if (!fitnessStuff) {
        fitnessStuff = "No fitness data";
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
      if (!fitnessStuff) {
        fitnessStuff = "No fitness data";
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
          console.log("switch broke. dunno");
      }
    },
    getDateLabels(activity) {
      //get fitness data
      let fitnessStuff = this.fitnessData.filter(
        fit => fit.nsn == this.student.id
      );
      if (!fitnessStuff) {
        fitnessStuff = "No fitness data";
      }
      switch (activity) {
        case "run4kDates":
          return fitnessStuff[0].run4kDates;
        case "strengthDates":
          return fitnessStuff[0].strengthDates;
        case "yoyoDates":
          return fitnessStuff[0].yoyoDates;
        default:
          console.log("switch broke. dunno");
      }
    },
    

    // loadFitnessDOM() {
    //   //4K DOM
    //   var run = document.getElementById(this.studentName + "Dom4k");
    //   run.innerText = this.getFitnessData("run4k")
    //   //YOYO DOM
    //   var yoyo = document.getElementById(this.studentName + "DomYoyo");
    //   yoyo.innerText = this.getFitnessData("yoyo")
    //   //STRENGTH DOM
    //   var pressups = document.getElementById(this.studentName + "DomPressups");
    //   var situps = document.getElementById(this.studentName + "DomSitups");
    //   var airsquats = document.getElementById(this.studentName + "DomAirquats");
    //   var burpees = document.getElementById(this.studentName + "DomBurpees");
    //   pressups.innerText = this.getFitnessData("pressups")
    //   situps.innerText = this.getFitnessData("situps")
    //   airsquats.innerText = this.getFitnessData("airsquats")
    //   burpees.innerText = this.getFitnessData("burpees")
      
    // },
    loadChart() {
      // console.log("loading chart...");
      var run = document.getElementById(this.studentName + "RunChart");
      var yoyo = document.getElementById(this.studentName + "YoyoChart");
      var strength = document.getElementById(
        this.studentName + "StrengthChart"
      );

      //=========== 4KM RUN CHART ===========
      this.runChart = new Chart(run, {
        type: "line",
        data: {
          datasets: [
            {
              data: this.getFitnessData("run4k"),
              label: "4km",
              backgroundColor: "#209cee",
              borderColor: "#209cee",
              fill: false
            },
          ],
          // labels: this.getLengthArray("run4k")
          labels: this.getLengthArray("run4k")
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Run Testing"
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
                  labelString: "Time (mins)"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Time (mins)"
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
            text: "Yoyo Testing"
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
                  labelString: "Yoyo Level"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Yoyo Level"
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

      //=========== STRENGTH CHART ===========
      this.strengthChart = new Chart(strength, {
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
            },
            {
              data: this.getFitnessData("situps"),
              label: "Sit ups",
              backgroundColor: "#6457A6",
              borderColor: "#6457A6",
              fill: false,
              spanGaps: false
            },
            {
              data: this.getFitnessData("airsquats"),
              label: "Air Squats",
              backgroundColor: "#EF306D",
              borderColor: "#EF306D",
              fill: false,
              spanGaps: false
            },
            {
              data: this.getFitnessData("burpees"),
              label: "Burpees",
              backgroundColor: "#628395",
              borderColor: "#628395",
              fill: false,
              spanGaps: false
            }
          ],
          labels: this.getDateLabels("strengthDates"),
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Strength Testing"
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
                  labelString: "Reps"
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

.chartsContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
}

.chartLeft,
.chartCenter,
.chartRight {
  width: 30%;
}

.chartLeftFlex,
.chartCenterFlex,
.chartRightFlex {
  margin-bottom: 50px;

  width: 100%;
}

.fitnessIcon {
  width: 25px;
  height: 25px;
}
.arrow {
  width: 15px;
  height: 15px;
}

.chartsContainerFlex {
    width: 100%;
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
    /* width: 50%; */
    margin: auto;
    margin-bottom: 50px;
  }
}
</style>
