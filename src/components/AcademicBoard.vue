<template>
  <div id="app">
   
    <div class="reveal">
      <div class="slides">
        <!-- Slide 1 -->
        <section class="pa-0">
          <p class="title">Year 11s</p>
           <v-checkbox v-model="photosCheckbox" label="Show Names" color="red" class="photosCheckbox"></v-checkbox>

          <div class="flexWrap">
            <TaiohiCard
              v-for="(student, index) in getSortStudents(11)"
              :key="`${student.school_year + '-' + index}`"
              :student="student"
              :photosCheckbox="photosCheckbox"
              class="taiohiCard"
            />
          </div>
          <!-- KEY -->
          <div class="chart-key">
            <div class="credits2021Total" style="display: flex;">
              <span style="font-size: 0.8rem;">Credits Total</span>
            </div>
            <div class="creditsOnOffer" style="display: flex;">
              <span style="font-size: 0.8rem;">Remaining Credits on Offer</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #23d160"></div>
              <span style="font-size: 0.8rem;">Passed</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #ff3860"></div>
              <span style="font-size: 0.8rem;">Not Achieved</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #fbb13c"></div>
              <span style="font-size: 0.8rem;">In Moderation</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #ffdc57"></div>
              <span style="font-size: 0.8rem;">Current</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #209cee"></div>
              <span style="font-size: 0.8rem;">Upcoming</span>
            </div>
          </div>
        </section>

        <!-- Slide 2 -->
        <section>
          <p class="title">Year 12s</p>
          <v-checkbox v-model="photosCheckbox" label="Show Names" color="red" class="photosCheckbox"></v-checkbox>
          <div class="flexWrap">
            <TaiohiCard
              v-for="(student, index) in getSortStudents(12)"
              :key="`${student.school_year + '-' + index}`"
              :student="student"
              :photosCheckbox="photosCheckbox"
              class="taiohiCard"
            />
          </div>

          <div class="spacer" style="margin:25px;"></div>

          <p class="title">Year 13s</p>
          <div class="flexWrap">
            <TaiohiCard
              v-for="(student, index) in getSortStudents(13)"
              :key="`${student.school_year + '-' + index}`"
              :student="student"
              :photosCheckbox="photosCheckbox"
              class="taiohiCard"
            />
          </div>
          <!-- KEY -->
          <div class="chart-key">
             <div class="credits2021Total" style="display: flex;">
              <span style="font-size: 0.8rem;">Credits Total</span>
            </div>
            <div class="creditsOnOffer" style="display: flex;">
              <span style="font-size: 0.8rem;">Remaining Credits on Offer</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #23d160"></div>
              <span style="font-size: 0.8rem;">Passed</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #ff3860"></div>
              <span style="font-size: 0.8rem;">Not Achieved</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #fbb13c"></div>
              <span style="font-size: 0.8rem;">In Moderation</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #ffdc57"></div>
              <span style="font-size: 0.8rem;">Current</span>
            </div>
            <div style="display: flex;">
              <div class="square" style="background-color: #209cee"></div>
              <span style="font-size: 0.8rem;">Upcoming</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "./firebaseInit";
import Reveal from "reveal.js";
import CreditLeaderboard from "@/components/CreditLeaderboard.vue";
import Timetable from "@/components/Timetable.vue";
import TaiohiCard from "@/components/TaiohiCard.vue";

export default {
  name: "app",
  components: {
    CreditLeaderboard,
    Timetable,
    TaiohiCard,
  },
  data() {
    return {
      students: [],
      photosCheckbox: false,
    };
  },
  mounted() {
    Reveal.initialize({
      width: "95%",
      height: "100%",
      center: false,
      autoSlide: 20000,
      loop: true,
      progress: false,
      controls: false,
      controlsLayout: "bottom-right",
    });
    this.$bind(
      "students",
      db.collection("students").where("school_year", ">=", 11)
    );
  },
  methods: {
    sortStudents() {
      let descending = this.students.sort(
        (a, b) => Number(b.creditTotal) - Number(a.creditTotal)
      );
      return descending;
    },
    getSortStudents(year) {
      let studentsByYear = this.students.filter(
        (student) => student.school_year == year
      );
      // let studentsByYear = this.students.filter(student => student.nsn == '131547578');
      let descending = studentsByYear.sort(
        (a, b) => Number(b.creditTotal) - Number(a.creditTotal)
      );
      return descending;
      // return studentsByYear
    },
  },
};
</script>

<style scoped src="../../node_modules/reveal.js/dist/reveal.css"></style>
<style scoped src="../../node_modules/reveal.js/dist/theme/white.css"></style>

<style lang="scss" scoped>
/* scoping not working on reveal css imports */

// @import url('../../node_modules/reveal.js/dist/reveal.scss');
// @import url('../../node_modules/reveal.js/dist/theme/white.scss');

// @import url('../node_modules/reveal.js/css/reveal.css');
// @import url('../node_modules/reveal.js/css/theme/white.css');

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100vh;
  background-color: white !important;
}

.slides {
    width: 95% !important;
}

.reveal .slides > section {
  padding: 0 !important;
}

.flexWrap {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.taiohiCard {
  width: calc(50% - 20px);
  box-sizing: border-box;
}

.chart-key {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.square {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}

.photosCheckbox {
  position: absolute;
  top: 0px;
  left: 0px;
}

.credits2021Total {
    background-color: #23d160;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-shadow: none;

    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Chango", cursive;
    font-size: 20px;
    color: #fff;
    // color: #efabff;
  }
  .creditsOnOffer {
    margin: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Chango", cursive;
    font-size: 18px;
    color: #7957d5;
    width: 60px;
    height: 60px;
  }
</style>
