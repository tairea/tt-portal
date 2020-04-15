<template>
  <div id="dashboard">
    <div v-if="students.length > 0">
      <!-- navbar -->
      <!-- <Navbar :student="students[0]"/> -->

      <!-- filter checkboxes -->
      <div class="filterBoxes">
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" id="allCheckbox" v-on:click="checkAll()">
            All
          </label>
        </div>
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" v-on:click="checkYear('year9')" id="year9Checkbox">
            Year 9
          </label>
          <br>
          <label v-for="student in getYearGroup(9)" :key="student.nsn" class="checkbox">
            <input type="checkbox" name="year9" :value="student.nsn" v-on:click="tickedStudents()">
            {{student.given_name}}
          </label>
        </div>
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" v-on:click="checkYear('year10')" id="year10Checkbox">
            Year 10
          </label>
          <br>
          <label v-for="student in getYearGroup(10)" :key="student.nsn" class="checkbox">
            <input type="checkbox" name="year10" :value="student.nsn" v-on:click="tickedStudents()">
            {{student.given_name}}
          </label>
        </div>
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" v-on:click="checkYear('year11')" id="year11Checkbox">
            Year 11
          </label>
          <br>
          <label v-for="student in getYearGroup(11)" :key="student.nsn" class="checkbox">
            <input type="checkbox" name="year11" :value="student.nsn" v-on:click="tickedStudents()">
            {{student.given_name}}
          </label>
        </div>
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" v-on:click="checkYear('year12')" id="year12Checkbox">
            Year 12
          </label>
          <br>
          <label v-for="student in getYearGroup(12)" :key="student.nsn" class="checkbox">
            <input type="checkbox" name="year12" :value="student.nsn" v-on:click="tickedStudents()">
            {{student.given_name}}
          </label>
        </div>
        <div class="filerCategories">
          <label class="checkbox">
            <input type="checkbox" v-on:click="checkYear('year13')" id="year13Checkbox">
            Year 13
          </label>
          <br>
          <label v-for="student in getYearGroup(13)" :key="student.nsn" class="checkbox">
            <input type="checkbox" name="year13" :value="student.nsn" v-on:click="tickedStudents()">
            {{student.given_name}}
          </label>
        </div>
      </div>

      <!-- show students -->
      <div class="flexbox">
        <div v-for="student in studentsTicked" :key="student.nsn" class="flexitem">
          <ProfileDetails :student="student" :overview="true" class="margin-5"/>
          <ProfileCurrentWork :student="student" :overview="true"/>
          <ProfileCompletedWork :student="student" :overview="true"/>
          <ProfileOverviewWork :student="student" :overview="true" class="margin-20"/>
          <hr>
        </div>
      </div>
    </div>

    <!-- if no student loads -->
    <div v-if="students.length == 0" class="flexCenter">
      <p>Loading...</p>
      <br>
      <p>
        If page doesn't load,
        <br>please
        <a href="mailto:i.tairea@taiwananga.co.nz">email Pa Ian</a>
        <br>to be entered into the system.
      </p>
      <br>
      <div class="button is-light" id="signoutButton" @click="logout">Sign Out</div>
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
import ProfileCurrentWork from "./ProfileCurrentWork.vue";
import ProfileCompletedWork from "./ProfileCompletedWork.vue";
import ProfileOverviewWork from "./ProfileOverviewWork.vue";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    ProfileDetails,
    ProfileCurrentWork,
    ProfileCompletedWork,
    ProfileOverviewWork
  },
  data() {
    return {
      currentUser: null,
      students: [],
      ticked: [],
      studentsTicked: [],
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
    },
    checkYear(year) {
      var yearBox = document.getElementById(year + "Checkbox");
      var yearCheckboxes = document.getElementsByName(year);
      if (yearBox.checked == true) {
        for (var i = 0, n = yearCheckboxes.length; i < n; i++) {
          yearCheckboxes[i].checked = true;
        }
      } else if (yearBox.checked == false) {
        for (var i = 0, n = yearCheckboxes.length; i < n; i++) {
          yearCheckboxes[i].checked = false;
        }
      }
      this.tickedStudents();
    },
    checkAll() {
      var allCheckbox = document.getElementById("allCheckbox");
      var allCheckboxes = document.getElementsByTagName("input");
      if (allCheckbox.checked == true) {
        for (var i = 0, n = allCheckboxes.length; i < n; i++) {
          allCheckboxes[i].checked = true;
        }
      } else if (allCheckbox.checked == false) {
        for (var i = 0, n = allCheckboxes.length; i < n; i++) {
          allCheckboxes[i].checked = false;
        }
      }
      this.tickedStudents();
    },
    getYearGroup(yearlevel) {
      const yearGroup = this.students.filter(
        student => student.school_year == yearlevel
      );
      return yearGroup;
    },
    tickedStudents() {
      //uncheck 'all'
      // document.getElementById("all").checked = false;

      var checkedStudents = [];
      var checkedElements = document.querySelectorAll("input:checked");
      var uncheckedElements = document.querySelectorAll("input:not(:checked)");

      //push nsn of students that are ticked
      checkedElements.forEach(el => {
        checkedStudents.push(Number(el.value));
      });

      //remove students that are un-ticked
      uncheckedElements.forEach(uncheckedEl => {
        if (checkedStudents.indexOf(uncheckedEl.value) !== -1) {
          checkedStudents.splice(checkedStudents.indexOf(uncheckedEl.value), 1);
        }
      });

      this.ticked = checkedStudents;
      //filter only the ticked students
      this.studentsTicked = this.students.filter(student => {
        return this.ticked.includes(student.nsn);
      });
    }
  },
  watch: {
    currentUser(user) {
      this.$bind(
        "students",
        // studentsDb.where("email", "array-contains", user.email)
        studentsDb.orderBy("school_year") //LOADS ALL STUDENTS
      );
    },
    students(students) {
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
  /* width: 25%; */
  min-width: 320px;
}

@media (max-width: 599px) {
  .flexitem {
    width: 100%;
  }
}
</style>
