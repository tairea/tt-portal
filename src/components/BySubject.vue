<template>
  <div id="dashboard">
    <h2>{{subject.toUpperCase()}}</h2>

    <div v-if="getYearGroup(9).length > 0" class="year9">
      <h3 class="yearGroup" id="year9Title">Year 9</h3>
      <div v-for="student in getYearGroup(9)" :key="student.nsn">
        <SubjectOverview :student="student" :subject="subject" />
      </div>
    </div>

    <div v-if="getYearGroup(10).length > 0" class="year10">
      <h3 class="yearGroup" id="year10Title">Year 10</h3>
      <div v-for="student in getYearGroup(10)" :key="student.nsn">
        <SubjectOverview :student="student" :subject="subject" />
      </div>
    </div>
    <div v-if="getYearGroup(11).length > 0" class="year11">
      <h3 class="yearGroup" id="year11Title">Year 11</h3>
      <div v-for="student in getYearGroup(11)" :key="student.nsn">
        <SubjectOverview :student="student" :subject="subject" />
      </div>
    </div>

    <div v-if="getYearGroup(12).length > 0" class="year12">
      <h3 class="yearGroup" id="year12Title">Year 12</h3>
      <div v-for="student in getYearGroup(12)" :key="student.nsn">
        <SubjectOverview :student="student" :subject="subject" />
      </div>
    </div>

    <div v-if="getYearGroup(13).length > 0" class="year13">
      <h3 class="yearGroup" id="year13Title">Year 13</h3>
      <div v-for="student in getYearGroup(13)" :key="student.nsn">
        <SubjectOverview :student="student" :subject="subject" />
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

import SubjectOverview from "./SubjectOverview.vue";

export default {
  name: "BySubject",
  components: {
    SubjectOverview
  },
  data() {
    return {
      currentUser: null,
      students: [],
      loadedStudents: false,
      subject: this.$route.params.subject
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
    },
    getYearGroup(yearlevel) {
      const yearGroup = this.students.filter(
        student => student.school_year == yearlevel
      );
      console.log("yearlevel:",yearlevel,"is:",yearGroup)
      return yearGroup;
    }
  },
  watch: {
    currentUser(user) {
      this.$bind(
        "students",
        //  studentsDb.where("email", "array-contains", user.email)
        // studentsDb.orderBy("school_year") //LOADS ALL STUDENTS
        // studentsDb.where("school_year", ">=", 11 ) //LOAD SENIORS
        // studentsDb.where("school_year", ">=", 13) //LOAD SENIORS
        // studentsDb.where("school_year", "<", 11 ) //LOADS JUNIORS
        studentsDb.where("nsn", "==", 134316380 ) //LOAD by NSN
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
  },
};
</script>

<style>
.coverPage {
  display: flex;
  align-items: center;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.margin-5 {
  margin: 5px 0px;
}
.margin-20 {
  margin: 20px 0px;
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

.filterBoxes {
  margin: 25px;
  display: flex;
}

.filerCategories {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2em;
}

.flexbox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.flexitem {
  width: 25%;
}

.spacer100 {
  margin: 50px 0;
}

.yearGroup {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}

.yearGroup:before,
.yearGroup:after {
  content: "";
  flex: 1 1;
  margin: auto 50px;
}

#year9Title:before,
#year9Title:after {
  border-bottom: 2px solid #ff6b81;
}
#year10Title:before,
#year10Title:after {
  border-bottom: 2px solid #2ed573;
}
#year11Title:before,
#year11Title:after {
  border-bottom: 2px solid #e67e22;
}
#year12Title:before,
#year12Title:after {
  border-bottom: 2px solid #3498db;
}
#year13Title:before,
#year13Title:after {
  border-bottom: 2px solid #9b59b6;
}

@media (max-width: 599px) {
  .flexitem {
    width: 100%;
  }
}
</style>
