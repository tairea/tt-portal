<template>
  <div>
    <div class="columns is-mobile">
      <div v-if="completedStandards.length > 0" class="column">
        <h2 class="title is-6 has-text-centered" :style="overview ? 'font-size:0.7em':''">COMPLETED WORK</h2>
        <!-- <table v-bind:class="[{ tableOverview: overview }, table]"> -->
        <table v-bind:class="[overview ? 'tableOverview' : 'table']">
          <thead v-if="!overview">
            <tr>
              <th>Subject</th>
              <th v-if="student.school_year >= 11">
                <abbr title="Standard Number">Std#</abbr>
              </th>
              <th>
                <abbr title="Standard Name">Name</abbr>
              </th>
              <th v-if="student.school_year >= 11">Credits</th>
              <th>Completed</th>
              <th>Grade</th>
              <th>Comment<br>(Tap to read)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Standard Rows -->
            <tr v-for="standard in completedStandards" :key="standard.assessmentNumber">
              <!-- <td v-if="!overview"> -->
              <td>
                <!-- subjects offered:
STEM
English
Kaupapa Māori
Mathematics
Innovation
Physical Education
Project Based Learning
Financial Literacy
Work Ready
Science
                -->
                <span v-if="standard.subject == 'Innovation'" class="tag is-digi is-normal">INNO</span>
                <span v-if="standard.subject == 'English'" class="tag is-eng is-normal">ENG</span>
                <span v-if="standard.subject == 'Work Ready'" class="tag is-eng is-normal">WORK</span>
                <span v-if="standard.subject == 'Science'" class="tag is-sci is-normal">SCI</span>
                <span v-if="standard.subject == 'Chemistry'" class="tag is-sci is-normal">CHEM</span>
                <span v-if="standard.subject == 'Physics'" class="tag is-sci is-normal">PHYS</span>
                <span v-if="standard.subject == 'Biology'" class="tag is-sci is-normal">BIO</span>
                <span v-if="standard.subject == 'STEM'" class="tag is-sci is-normal">STEM</span>
                <span v-if="standard.subject == 'Mathematics'" class="tag is-math is-norpmal">MATH</span>
                <span v-if="standard.subject == 'Kaupapa Māori'" class="tag is-tika is-normal">MAOR</span>
                <span v-if="standard.subject == 'MPA'" class="tag is-tika is-normal">MPA</span>
                <span v-if="standard.subject == 'Physical Education'" class="tag is-pe is-normal">PE</span>
                <span v-if="standard.subject == 'Physical Education & Health'" class="tag is-pe is-normal">PE&H</span>
                <span v-if="standard.subject == 'Project Based Learning'" class="tag is-pbl is-normal">PBL</span>
                <span v-if="standard.subject == 'Dance'" class="tag is-pbl is-normal">DANC</span>
                <span v-if="standard.subject == 'Financial Literacy'" class="tag is-math is-normal">FILIT</span>
              </td>
              <td v-if="!overview && student.school_year >= 11">{{standard.assessmentNum}}</td>
              <td>{{standard.assessmentName}}</td>
              <td v-if="student.school_year >= 11">{{standard.assessmentCredits}}</td>
              <td>{{formatDueDate(standard.dueDate)}}</td>
              <td>
                <span v-if="standard.completed == 'Not Achieved'"
                  class="tag is-danger">{{standard.completed.toUpperCase()}}</span>
                <span v-else-if="standard.completed == 'Progressing Towards Achieved' || standard.completed == 'PTA' "
                  class="tag is-warning">PTA</span>
                <span v-else-if="standard.completed == 'Achieved'"
                  class="tag is-success">{{standard.completed.toUpperCase()}}</span>
                <span v-else-if="standard.completed == 'Merit'"
                  class="tag is-info">{{standard.completed.toUpperCase()}}</span>
                <span v-else-if="standard.completed == 'Excellence'"
                  class="tag is-primary">{{standard.completed.toUpperCase()}}</span>
                <span v-else class="tag is-light">{{standard.completed.toUpperCase()}}</span>
              </td>
              <td>
                <b-tooltip :label="standard.teacherComment" position="is-left" size="is-medium" multilined anitmated>
                  <img class="kaitiaki-pic"
                    v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(standard.teacher) + '.jpg')">
                </b-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import Buefy from "buefy";
  import "buefy/dist/buefy.css";
  import {
    db
  } from "./firebaseInit";

  Vue.use(Buefy);

  export default {
    name: "ProfileCompletedWork",
    props: ["student", "overview"],
    data() {
      return {
        standards: []
      };
    },
    computed: {
      completedStandards() {
        //filter by NOT current or upcoming (aka completed)
        var completedStands = this.standards.filter(obj => obj.completed !== "Current" && obj.completed !== "Upcoming")

        //sort by dueDate (aka completed date) decsending
        return completedStands.sort((a, b) =>
          a.dueDate < b.dueDate ? 1 : b.dueDate < a.dueDate ? -1 : 0
        );

      },
    },
    // watch: {
    //   standards: {
    //     handler: "completedStandards"
    //   }
    // },
    mounted() {
      this.$bind(
        "standards",
        db.collection(`/students/${this.student.id}/openCredits2020`)
      );
    },
    methods: {
      
      getTotal(status) {
        const standardsByStatus = this.standards.filter(
          stnd => stnd.completed == status
        );

        const total = standardsByStatus.reduce(
          (prev /* number */ , curr /* standard */ ) =>
          Number(prev) + Number(curr.assessmentCredits),
          0
        );

        return total;
      },
      formatDueDate(timestamp) {
        // if (timestamp.seconds == null || timestamp.seconds == "") {
        //   return "TBC";
        // }
        if (typeof timestamp === "string") {
          return timestamp;
        }

        // convert seconds to new date
        timestamp = new Date(timestamp.seconds * 1000)

        // var date = timestamp.toDate();
        var month = timestamp.getMonth();
        var day = timestamp.getDate();
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        return day + " " + months[month];
      },
      formatTeacherName: function (name) {
        // console.log("trying to split:", name)
        let teacherName = name.split(" ")
        if (teacherName.length == 1) {
          return teacherName[0].toLowerCase()
        } else if (teacherName.length > 0 && teacherName[1] !== "-") {
          return teacherName[1].toLowerCase();
        } else {
          return teacherName[2].toLowerCase();
        }
      }
    }
  };
</script>

<style scoped>
  .table {
    width: 100%;
  }

  .tableOverview {
    width: 80%;
    margin: auto;
  }

  th,
  td {
    font-size: 0.6em;
    text-align: center !important;
    width: 50px;
    padding: 2px 0px;
  }

  .table td,
  .table th {
    padding-left: 0;
    padding-right: 0;
  }

  .tag {
    font-size: 1em !important;
  }

  .kaitiaki-pic {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }

  .overdue {
    /* color: #ce2d4f; */
    color: red;
    font-weight: bold;
  }

  /*Subject tag colours*/
  .tag:not(body).is-digi {
    background-color: #7957d5;
    color: white;
  }

  .tag:not(body).is-eng {
    background-color: #efabff;
    color: white;
  }

  .tag:not(body).is-sci {
    background-color: #01d1b2;
    color: white;
  }

  .tag:not(body).is-math {
    background-color: #209cee;
    color: white;
  }

  .tag:not(body).is-pe {
    background-color: #1a181b;
    color: white;
  }

  .tag:not(body).is-tika {
    background-color: #ce2d4f;
    color: white;
  }

  .tag:not(body).is-pbl {
    background-color: #7957d5;
    color: white;
  }
</style>