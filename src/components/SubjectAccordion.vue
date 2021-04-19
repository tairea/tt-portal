<template>
  <BulmaAccordion dropdown :icon="'custom'" :caretAnimation="{duration: '.6s', timerFunc: 'ease-in-out'}"
    :slide="{duration: '.9s',timerFunc: 'ease'}" class="is-shadowless bulmaAccordian">
    <!-- The wrapper component for all the items -->
    <!-- <BulmaAccordionItem v-for="standard in standards" :key="standard.assessmentNum" class="active"> -->
    <BulmaAccordionItem v-for="subject in subjects" :key="subject.id">
      <h4 slot="title" class="accordionTitle">{{subject.subject}}</h4>
      <span slot="icon" class="accordionIcon tag is-normal"
        id="creditsRatio">{{subject.passed+'/'+subject.total}}</span>
      <p slot="content" class="accordionContent">
        <table class="subjectTable">
          <!-- Report Comment -->
          <!-- <thead>
              <tr>
                <td colspan="3" v-if="getReportComment(subject.subject)" class="comment">{{getReportComment(subject.subject)}}</td>
              </tr>
            </thead> -->
          <!-- Standards -->
          <tr class="subjectTable" v-for="subjectStandards in filterSubjectStandards(subject.subject)"
            :key="subjectStandards.assessmentNum">
            <td class="numCell has-text-left">{{subjectStandards.assessmentNum}}</td>
            <td class="nameCell has-text-left">{{subjectStandards.assessmentName}}</td>
            <td class="creditCell has-text-right">
              <!-- <span  v-bind:class="[ (subjectStandards.completed !== 'completed') ? 'is-danger' : '', 'is-success']" class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span> -->
              <span v-if="student.school_year < 11" v-bind:class="subjectStandards.completed"
                class="accordionIcon tag is-normal">{{subjectStandards.completed}}</span>
              <span v-else v-bind:class="subjectStandards.completed"
                class="accordionIcon tag is-normal">{{subjectStandards.assessmentCredits}}</span>
            </td>
          </tr>
        </table>
      </p>
      <div slot="footer" class="accordionFooter">

        <!-- <p v-if="isComment(subject.subject)" class="reportComment">"{{getComment(subject.subject)}}"</p> -->
        <a v-bind:href="getTeacherEmail(subject.teacher)">

          <table class="footerTable">
            <tr>
              <td>Got questions?<br><span class="has-text-weight-semibold">Contact {{subject.teacher}}</span></td>
              <td>
                <img class="kaitiaki-pic"
                  v-bind:src="require('@/assets/staff_photos/' + formatTeacherName(subject.teacher) + '.jpg')">

              </td>
            </tr>
          </table>
        </a>
      </div>

    </BulmaAccordionItem>

  </BulmaAccordion>
</template>

<script>
  import Vue from "vue";
  import {
    BulmaAccordion,
    BulmaAccordionItem
  } from "vue-bulma-accordion";
  import {
    db
  } from "./firebaseInit";
  import {
    firestorePlugin
  } from "vuefire";
  Vue.use(firestorePlugin);

  export default {
    name: "SubjectAccordion",
    components: {
      BulmaAccordion,
      BulmaAccordionItem
    },
    props: ["student"],
    data() {
      return {
        standards: [],
        reportComments: [],

      };
    },
    firestore: {
      // reportComments: db
    },
    mounted() {

      this.$bind(
        "standards",
        db.collection(`/students/${this.student.id}/openCredits2021`)
      );
      // console.log("standards in accordian");
      // console.log(this.standards);
      this.$bind(
        "reportComments",
        db.collection(`/students/${this.student.id}/reportComments2021`)
      );
    },
    computed: {
      subjects: function () {
        // this.subjects = [...new Set(this.standards.map(x => x.subject))]
        const subjects = Array.from(new Set(this.standards.map(x => x.subject)))
          .map(subject => {
            return {
              subject: subject,
              teacher: this.standards.find(x => x.subject === subject).teacher,
              total: this.getTotals(subject),
              passed: this.getPassed(subject)
            }
          })
        return subjects
      },
      getSubjectWithNoStandards() {
        var arr1 = this.standards
        var arr2 = this.reportComments
        var arr3 = [].concat(
          arr1.filter(obj1 => arr2.every(obj2 => obj1.item !== obj2.item)),
          arr2.filter(obj2 => arr1.every(obj1 => obj2.item !== obj1.item))
        );
        return arr3
      }
    },
    methods: {
      isComment(subjectName) {
        var subjectReport = this.reportComments.filter((report) => {
          return report.subject == subjectName
        })
        if (subjectReport.length > 0) {
          return true
        }
        else return false
      },
      getComment(subjectName) {
        var subjectReport = this.reportComments.filter((report) => {
          return report.subject == subjectName
        })
        if (subjectReport.length > 0) {
          if (subjectReport[0].reportComment) {
            return subjectReport[0].reportComment
          }
        }
      },
      filterSubjectStandards: function (subjectName) {
        var subStandards = this.standards.filter((sub) => {
          return sub.subject == subjectName
        })
        //order the standards by this custom order
        var completedOrder = ["Not Submitted",
          "Not Achieved",
          "Achieved",
          "Merit",
          "Excellence",
          "Current",
          "Upcoming"
        ];
        return subStandards.sort(function (a, b) {
          if (a.completed == b.completed) return a.completed - b.completed;
          return (
            completedOrder.indexOf(a.completed) -
            completedOrder.indexOf(b.completed)
          );
        });
      },
      formatTeacherName: function (name) {
        // console.log("trying to split:", name)
        let teacherName = name.split(" ")
        if (teacherName.length ==  1) {
          return teacherName[0].toLowerCase()
        } else if (teacherName.length > 0 && teacherName[1] !== "-") {
          return teacherName[1].toLowerCase();
        } else {
          return teacherName[2].toLowerCase();
        }
      },
      getTotals: function (subjectName) {
        const subjectStandards = this.filterSubjectStandards(subjectName)
        //adds all the subject assessmentCredits together
        return subjectStandards.map(o => o.assessmentCredits).reduce((a, c) => a + c)
      },
      getPassed: function (subjectName) {
        const subjectStandards = this.filterSubjectStandards(subjectName)
        // just get the 'completed' standards for this subject
        const achievedStandards = subjectStandards.filter((sub) => {
          return sub.completed == "Achieved"
        })
        const meritStandards = subjectStandards.filter((sub) => {
          return sub.completed == "Merit"
        })
        const excellenceStandards = subjectStandards.filter((sub) => {
          return sub.completed == "Excellence"
        })

        var achieved = achievedStandards.map(o => o.assessmentCredits).reduce((a, c) => a + c, 0)
        var merit = meritStandards.map(o => o.assessmentCredits).reduce((a, c) => a + c, 0)
        var excellence = excellenceStandards.map(o => o.assessmentCredits).reduce((a, c) => a + c, 0)

        //add the passed subject credits
        return Number(achieved) + Number(merit) + Number(excellence)
      },
      getTeacherEmail(name) {
        switch (name) {
          case "Pa Ian":
            return "mailto: i.tairea@taiwananga.co.nz"
          case "Pa Chris":
            return "mailto: c.morgan@taiwananga.co.nz"
          case "Pa Tipene":
            return "mailto: t.waihi@taiwananga.co.nz"
          case "Pa Wiremu":
            return "mailto: w.paniora@taiwananga.co.nz"
          case "Whaea Hayley":
            return "mailto: h.childs@taiwananga.co.nz"
          case "Whaea Nicola":
            return "mailto: n.reid@taiwananga.co.nz"
          case "Whaea Lysh":
            return "mailto: a.walker@taiwananga.co.nz"
          case "Whaea Te Ana":
            return "mailto: teana.waihi@taiwananga.co.nz"
          default:
            return "";
        }
      },
      getReportComment(subj) {
        var subjectComment = this.reportComments.filter((sub) => {
          return sub.id == subj
        })
        if (subjectComment == "" || subjectComment == null || subjectComment == undefined) {
          return
        } else {
          return subjectComment[0].reportComment
        }
      },

    },
  };
</script>

<style scoped>
  .active {
    background-color: rgba(0, 0, 0, 0.03)
      /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
  }

  .bulmaAccordian {
    width: 90%;
  }

  .accordionTitle,
  .accordionIcon,
  .accordionContent,
  .accordionFooter {
    font-size: 0.7em !important;
  }

  .accordionTitle {
    font-weight: bold;
  }

  .accordionFooter {
    width: 100% !important;
  }


  .subjectTable {
    width: 90%;
    margin: auto;
    /* border-collapse:separate;
    border-spacing:0 15px; */
  }

  .comment {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  /* thead {
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 10px;
  text-align: justify;
} */

  .footerTable {
    width: 50%;
    margin: auto;
  }

  .footerTable td {
    text-align: center;
  }

  .numCell {
    width: 22%;
  }

  .nameCell {
    width: 60%;
  }

  .creditCell {
    width: 18%;
  }

  #creditsRatio {
    margin-right: 20px;
  }

  .Upcoming {
    background-color: #209cee;
    color: white;
  }

  .Current {
    background-color: #ffdc57
  }

  .Achieved,
  .Merit,
  .Excellence {
    background-color: #23d160;
    color: white;
  }

  .Not {
    background-color: #ff3860;
    color: white;
  }

  .reportComment {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
</style>

<style>
  .card-header-title,
  .card-header-icon {
    padding: 5px !important;
  }

  .card-content,
  .card-footer {
    padding: 10px;
  }

  .kaitiaki-pic {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>