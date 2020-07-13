<template>
  <div id="dashboard">
    <h1>DASHBOARD</h1>
    <div class="flex-container">
      <div class="flex-box box-1">NOTICES</div>
      <div class="flex-box box-2">VIEW STUDENTS</div>
      <div class="flex-box box-3">VIEW CLASSES</div>
      <div class="flex-box box-4">FOUR</div>
      <div class="flex-box box-5">FIVE</div>
      <div class="flex-box box-6">SIX</div>
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
import ProfileDetails from "./ProfileDetails.vue";
import ProfileITLP from "./ProfileITLP.vue";
import ProfileFitness from "./ProfileFitness.vue";
import ProfileComments from "./ProfileComments.vue";
// import ProfileCommentsRuakura from "./ProfileCommentsRuakura.vue";
import ProfileCurrentWork from "./ProfileCurrentWork.vue";
import ProfileOverviewWork from "./ProfileOverviewWork.vue";

export default {
  name: "TeacherDashboard",
  components: {
    Navbar,
    ProfileDetails,
    ProfileITLP,
    ProfileFitness,
    ProfileComments,
    ProfileCurrentWork,
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
    students(students) {
      console.log("user has access to:", students);
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
.profileDetails {
    width: 100%;
  }

  .profileWork {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  .profileCurrent {width: 100%;}
  .profileCompleted {width: 100%;}

  .profileFinished {width: 30%;}
  .profileFitness {width: 30%;}
</style>
