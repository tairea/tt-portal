<template>
    <div class="card" outlined>
        <!-- <v-card-title class="headline">{{student.given_name}}</v-card-title> -->

        <!-- PHOTO -->
        <!-- <img :src="photo" class="profilePic"> -->
        <div class="profileNumber">{{getTaiohiSecretNumber(student.nsn)}}</div>
        <!-- <div class="profileNumber">{{student.given_name}}</div> -->

        <!-- CREDIT TOTAL -->
        <!-- <div class="creditTotal">{{student.creditTotal}}</div> -->

        <!-- PIE CHART -->
        <PieChart
            :student="student"
            :studentName="student.given_name"
            :standards="standards" 
            :height="100"
            :width="100"
            :labels="true"
        />

        <!-- Subject Pies -->
        <div class="subjectsContainer">
            <div v-for="subject in getSubjects" class="subjectsCol" :key="subject.id">
                <div class="subjectPie">
                    <PieChart
                        :subjectName="subject"
                        :studentName="student.given_name"
                        :standards="subjectStandards(subject)" 
                        :height="60"
                        :width="60"
                        :labels="true"
                    />
                </div>
                <div class="subjectLabel">
                    <p class="subjectName">{{subject.substring(0, 4).toUpperCase()}}</p>
                        <!-- <span v-if="subject == 'Innovation'" class="tag is-digi is-normal">INNO</span>
                        <span v-if="subject == 'English'" class="tag is-eng is-normal">ENG</span>
                        <span v-if="subject == 'Work Ready'" class="tag is-eng is-normal">WORK</span>
                        <span v-if="subject == 'Science'" class="tag is-sci is-normal">SCI</span>
                        <span v-if="subject == 'Chemistry'" class="tag is-sci is-normal">CHEM</span>
                        <span v-if="subject == 'Physics'" class="tag is-sci is-normal">PHYS</span>
                        <span v-if="subject == 'Biology'" class="tag is-sci is-normal">BIO</span>
                        <span v-if="subject == 'STEM'" class="tag is-sci is-normal">STEM</span>
                        <span v-if="subject == 'Mathematics'" class="tag is-math is-norpmal">MATH</span>
                        <span v-if="subject == 'Kaupapa Māori'" class="tag is-tika is-normal">MAOR</span>
                        <span v-if="subject == 'MPA'" class="tag is-tika is-normal">MPA</span>
                        <span v-if="subject == 'Physical Education'" class="tag is-pe is-normal">PE</span>
                        <span v-if="subject == 'Physical Education & Health'" class="tag is-pe is-normal">PE&H</span>
                        <span v-if="subject == 'Project Based Learning'" class="tag is-pbl is-normal">PBL</span>
                        <span v-if="subject == 'Dance'" class="tag is-pbl is-normal">DANC</span>
                        <span v-if="subject == 'Financial Literacy'" class="tag is-math is-normal">FILIT</span> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { storage, db } from "./firebaseInit";
    import Chart from "chart.js";
    import "chartjs-plugin-labels";

    import PieChart from '@/components/PieChart.vue'

    export default {
        name: 'TaiohiCard',
        props: ['student'],
        components: {
            PieChart
        },
        data() {
            return {
                photo: null,
                standards: [],
                standardStatus: [],
                pieChart: null,
                chartCount: null,
                studentName: null,
                subjects: null,
            }
        },
        mounted() {
            this.getNormalProfilePic(this.student.given_name)
            // get standards from firebase
            this.$bind( "standards", db.collection(`/students/${this.student.id}/openCredits2021`) );

            this.studentName = this.student.given_name;
        },
        computed: {
            getSubjects() {
                if (this.standards) {
                    this.subjects = [...new Set(this.standards.map(x => x.subject))]
                    console.log("this.subjects:",this.subjects)
                    return this.subjects
                }
            },
            
        },
        methods: {
            subjectStandards(subject) {
                const subjectStandards = this.standards.filter(
                    stnd => stnd.subject == subject
                );
                console.log("subjectStandards:for:"+subject+"for"+this.studentName+"=",subjectStandards)
                return subjectStandards;
            },
            getNormalProfilePic(name) {
                name = name.split(" ").join("")
                storage.ref('taiohi/' + name.toLowerCase() + '.png').getDownloadURL().then((url) => {
                    this.photo = url
                })
            },
            // chart methods
            getTotal(status) {
                const standardsByStatus = this.standards.filter(
                    stnd => stnd.completed == status
                );

                const total = standardsByStatus.reduce(
                    (prev /* number */, curr /* standard */) =>
                    Number(prev) + Number(curr.assessmentCredits),
                    0
                );

                return total;
            },
            getTaiohiSecretNumber(nsn) {
                nsn = String(nsn).substr(-3)
                return nsn
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');

    .card {
        box-sizing: border-box;
        margin: 10px;
        border: 1px solid rgba(0,0,0,0.05);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 10px;
        /* background-color: hsl(141, 71%, 48%); */
        background-color: rgba(0,0,0,0.05);
        height: 100px;
        width: calc(50% - 20px);
    }

    .profilePic {
        /* border: 1px solid rgba(0,0,0,0.05); */
        background-color: rgb(132, 136, 141);
        border-radius: 50%;
        /* width: 100px; */
        height: 100%;
        box-shadow: none;
        margin-left: 10px;
    }

    .profileNumber {
        /* border: 1px solid rgba(0,0,0,0.05); */
        background-color: rgb(132, 136, 141);
        border-radius: 50%;
        width: 100px;
        height: 100px;
        box-shadow: none;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Chango', cursive;
        font-size: 20px;
        color: white;
    }

    .creditTotal {
        width: 100px;
        height: 100px;
        margin: 0px 10px;
        font-family: 'Chango', cursive;
        color: white;
        font-size: 30px;
        background-color: #23d160;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pie {
        max-width: 100px;
        max-height: 100px;
    }

    /* ============ Subject Container ============== */
    .subjectsContainer {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        justify-content: left;
        align-items: center;
        flex: 1;
    }

    .subjectsCol{
        // width: 50px;
        // height: 50px;
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .subjectLabel {
        /* margin-top: 5px; */
        height: 10px;
        line-height: 0;
    }

    .subjectName {
        font-size: 0.8rem;
        font-weight: 800;
        margin: 5px;
    }

    /*Subject tag colours*/
    .tag {
        height: 20px;
    }

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