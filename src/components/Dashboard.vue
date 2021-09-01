<template>
  <div id="dashboard">
    <div v-if="students.length > 0">
      <Navbar :student="students[0]" />
      <div v-for="student in students" :key="student.nsn" class="dashboardProfile">
        <ProfileDetails :overview="true" :student="student" class="margin-5 profileDetails" />
        <!-- <ProfileITLP :student="student"/> -->
        <!-- <ProfileComments :student="student"/> -->
        <ProfileOverviewWork :student="student" class="profileFinished" />
        <div v-if="isDesktop()" class=" profileWork">
          <ProfileCurrentWork :student="student" class="profileCurrent" />
          <ProfileCompletedWork :student="student" class="profileCompleted" />
        </div>
        <div v-else>
          <ProfileCurrentWork :student="student" class="profileCurrent pt-6" />
          <ProfileCompletedWork :student="student" class="profileCompleted" />
        </div>
        <ProfileFitness :student="student" class="profileFitness" />
        <hr />
      </div>
    </div>

    <!-- if no student loads -->
    <div v-if="students.length == 0" class="flexCenter">
      <p>Loading...</p>
      <br />
      <p>
        If page doesn't load,
        <br />please
        <a href="mailto:i.tairea@taiwananga.co.nz">email Pa Ian</a>
        <br />to be entered into the system.
      </p>
      <br />
      <div class="button is-light" id="signoutButton" @click="logout">Sign Out</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

import { studentsDb } from "./firebaseInit";
import Navbar from "./Navbar.vue";
import ProfileDetails from "./ProfileDetails.vue";
// import ProfileITLP from "./ProfileITLP.vue";
import ProfileFitness from "./ProfileFitness.vue";
import ProfileComments from "./ProfileComments.vue";
// import ProfileCommentsRuakura from "./ProfileCommentsRuakura.vue";
import ProfileCurrentWork from "./ProfileCurrentWork.vue";
import ProfileCompletedWork from "./ProfileCompletedWork.vue";
import ProfileOverviewWork from "./ProfileOverviewWork.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    ProfileDetails,
    // ProfileITLP,
    ProfileFitness,
    ProfileComments,
    ProfileCurrentWork,
    ProfileCompletedWork,
    ProfileOverviewWork
  },
  data() {
    return {
      currentUser: null,
      students: [],
      // student: null,
      loadedStudents: false
    };
  },
  methods: {
    isDesktop() {
      console.log(screen.width)
      return screen.width > 1200
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("signed out");
          this.$router.go({ path: this.$router.path });
        });
    }
  },
  watch: {
    currentUser(user) {
      this.$bind(
        "students",
        studentsDb.where("email", "array-contains", user.email)
        // studentsDb.orderBy("school_year")
      );
    },
    students() {
      this.$set(this, "loadedStudents", true);
    }
  },
  mounted() {
    this.$set(this, "currentUser", firebase.auth().currentUser);
    // eslint-disable-next-line
    console.log("user is:", firebase.auth().currentUser.displayName);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#dashboard {
  background-color: white;
}

.margin-5 {
  margin: 5px 0px;
}
.margin-20 {
  margin: 20px 0px;
}

.profileCurrent,
.profileCompleted,
.profileFinished,
.profileFitness {
  margin-bottom: 50px;
}

.flexCenter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

hr {
  margin: 50px 0px;
}

/* If viewed on computer */
@media (min-width: 1200px) {
  .dashboardProfile {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .profileDetails {
    width: 100%;
  }

  .profileWork {
    order: 2;
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  .profileCurrent {width: 100%;}
  .profileCompleted {width: 100%;}

  .profileFinished {order: 1; width: 30% !important;}
  .profileFitness {order: 3; width: 30% !important;}
}
</style>
