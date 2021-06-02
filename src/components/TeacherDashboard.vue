<template>
  <div id="dashboard">
    <!-- <h1>DASHBOARD</h1> -->
    <div class="flex-container">
      
      <div class="flex-box">
        <router-link to="/teacher" target= '_blank'>
          <div class="box-1">
            <img class="cardImage" v-bind:src="require('@/assets/thumb-overview.jpg')" />
            <p class="cardTitle">ALL STUDENTS OVERVIEW</p>
          </div>
        </router-link>
      </div>

      <div class="flex-box">
        <router-link to="/chooseSubject" target= '_blank'>
          <div class="box-1">
            <img class="cardImage" v-bind:src="require('@/assets/thumb-bySubject.png')" />
            <p class="cardTitle">VIEW BY SUBJECT</p>
          </div>
        </router-link>
      </div>

      <div class="flex-box">
        <router-link to="/ab" target= '_blank'>
          <div class="box-2">
            <img class="cardImage" v-bind:src="require('@/assets/thumb-academicBoard.jpg')" />
            <p class="cardTitle">SENIORS ACADEMIC BOARD</p>
          </div>
        </router-link>
      </div>
      
      <div class="flex-box">
        <router-link to="/chooseYear" target= '_blank'>
          <div class="box-3">
            <img class="cardImage" v-bind:src="require('@/assets/thumb-reports.jpg')" />
            <p class="cardTitle">REPORTS</p>
          </div>
        </router-link>
      </div>
    
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import firebase from "firebase";

Vue.use(Buefy);

import { studentsDb } from "./firebaseInit";

import Navbar from "./Navbar.vue";


export default {
  name: "TeacherDashboard",
  components: {
    Navbar,

  },
  data() {
    return {
      currentUser: null,

    };
  },
  methods: {

  },
  mounted() {
    this.$set(this, "currentUser", firebase.auth().currentUser);
    // eslint-disable-next-line
    console.log("user is:", firebase.auth().currentUser.displayName);
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #dashboard {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-container {
    height: 50%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .flex-box {
    width: 20%;
    /* height: 150px; */
    padding: 25px;
    margin: 20px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 10px;
    transition: all 0.1s;
    display: flex;
    justify-content: center;
    align-items: center;

   
  }

  .cardTitle {
    margin-top: 40px;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .flex-box:hover {
    box-shadow: 2px 3px 3px 3px lightgrey;
  }

  .cardImage {
    width: 100%;
    object-fit: cover;
  }
</style>
