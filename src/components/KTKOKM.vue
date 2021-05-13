<template>
    <div class="columns is-mobile detailsContainer" :class="{darkGreyBg: a4}">
        <div class="column">

            <div v-for="(endTerm1, index) in itlp" :key="index">

                <div class="ktkokm">
                    <div class="principle-title">KIA TŪ</div>
                    <div class="flex">
                        <div class="principle-content">
                            <div class="principle-goal content">
                                <p>GOAL</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaTuGoal)" :key="index"
                                        class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="principle-content">
                            <div class="principle-reflection content">
                                <p>REFLECTION</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaTuGoalReflection)"
                                        :key="index" class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                                <!-- PROFILE PIC -->
                                <!-- <div class="profile-pic-wrap">
                                    <img id="profile-pic" v-bind:src="funnyPhoto" />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ktkokm">
                    <div class="principle-title">KIA ORA</div>
                    <div class="flex">
                        <div class="principle-content">
                            <div class="principle-goal content">
                                <p>GOAL</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaOraGoal)" :key="index"
                                        class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="principle-content">
                            <div class="principle-reflection content">
                                <p>REFLECTION</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaOraGoalReflection)"
                                        :key="index" class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                                <!-- PROFILE PIC -->
                                <!-- <div class="profile-pic-wrap">
                                    <img id="profile-pic" v-bind:src="funnyPhoto" />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ktkokm">
                    <div class="principle-title">KIA MĀORI</div>
                    <div class="flex">
                        <div class="principle-content">
                            <div class="principle-goal content">
                                <p>GOAL</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaMaoriGoal)" :key="index"
                                        class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="principle-content">
                            <div class="principle-reflection content">
                                <p>REFLECTION</p>
                                <ul>
                                    <li v-for="(bullet, index) in formatBulletList(endTerm1.kiaMaoriGoalReflection)"
                                        :key="index" class="bullet">
                                        {{bullet}}
                                    </li>
                                </ul>
                                <!-- PROFILE PIC -->
                                <!-- <div class="profile-pic-wrap">
                                    <img id="profile-pic" v-bind:src="funnyPhoto" />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>


            </div>



            <!-- TOHU -->
            <div class="tohuContainer" :style="{ backgroundImage: 'url(' + image + ')', opacity:'0.4'}">
                <!-- <img
                id="tohu-cover"
                v-bind:src="require('@/assets/tohu-grey.svg')"
              /> -->
            </div>

        </div>

    </div>
</template>

<script>
    import Vue from "vue";
    import Buefy from "buefy";
    import "buefy/dist/buefy.css";
    import {
        db,
        storage
    } from "./firebaseInit";

    Vue.use(Buefy);

    export default {
        name: "KTKOKM",
        props: ["student", "overview", "a4", "ruakura"],
        data() {
            return {
                standards: [],
                itlp: [],
                funnyPhoto: null,
                seriousPhoto: null,
                standardsRuakura: [],
                image: require("@/assets/tohuLight.svg")
            };
        },
        mounted() {
            // get standards from firebase
            this.$bind(
                "standards",
                db.collection(`/students/${this.student.id}/openCredits2021`)
            );
            this.$bind(
                "itlp",
                db.collection(`students/${this.student.id}/itlp2021`)) // Load ITLP
            // this.$bind(
            //   "standardsRuakura",
            //   db.collection(`/studentsRuakura/${this.student.id}/openCredits2020`)
            // );
            //this.getFunProfilePic(this.student.given_name)
        },
        methods: {
            formatBulletList(list) {
                if (list.search("-") < 0) {
                    var arr = []
                    arr.push(list)
                    return arr
                } else {
                    let split = list.split("-")
                    split.splice(0, 1)
                    return split
                }
            },
            getFunProfilePic(name) {
                var nospaces = name.split(" ").join("")
                console.log("getting photo for ", nospaces)
                storage.ref('taiohi-fun-highres/' + nospaces.toLowerCase() + '.png').getDownloadURL().then((url) => {
                    console.log("returning ", url)
                    this.funnyPhoto = url
                })
            },
            getTotal() {
                //=== achieved credits
                const achievedCredits = this.standards.filter(
                    stnd => stnd.completed == "Achieved"
                );
                const achievedTotal = achievedCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("achieved credits:", achievedTotal);
                //=== merit credits
                const meritCredits = this.standards.filter(
                    stnd => stnd.completed == "Merit"
                );
                const meritTotal = meritCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("merit credits:", meritTotal);
                //=== excellence credits
                const excellenceCredits = this.standards.filter(
                    stnd => stnd.completed == "Excellence"
                );
                const excellenceTotal = excellenceCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("excellence credits:", excellenceTotal);

                const completedTotal =
                    Number(achievedTotal) + Number(meritTotal) + Number(excellenceTotal);

                return completedTotal;
            },
            getTotalRuakura() {
                //=== achieved credits
                const achievedCredits = this.standardsRuakura.filter(
                    stnd => stnd.completed == "Achieved"
                );
                const achievedTotal = achievedCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("achieved credits:", achievedTotal);

                //=== merit credits
                const meritCredits = this.standardsRuakura.filter(
                    stnd => stnd.completed == "Merit"
                );
                const meritTotal = meritCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("merit credits:", meritTotal);

                //=== excellence credits
                const excellenceCredits = this.standardsRuakura.filter(
                    stnd => stnd.completed == "Excellence"
                );
                const excellenceTotal = excellenceCredits.reduce(
                    (prev /* number */ , curr /* standard */ ) =>
                    prev + curr.assessmentCredits,
                    0
                );
                // console.log("excellence credits:", excellenceTotal);

                const completedTotal =
                    Number(achievedTotal) + Number(meritTotal) + Number(excellenceTotal);

                return completedTotal;
            },
            formatStudentName: function (name) {
                var name = name.replace(/\s/g, "");
                return name.toLowerCase();
            }
        }
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Cantarell:400i|Caudex|Eczar|Cinzel:wght@900|Exo|Itim|Marcellus|Noto+Serif+SC|Quattrocento|Stoke|ZCOOL+XiaoWei&display=swap');
    /*
      font-family: 'Exo', sans-serif;
      font-family: 'Quattrocento', serif;
      font-family: 'ZCOOL XiaoWei', serif;
      font-family: 'Cantarell', sans-serif;
      font-family: 'Stoke', serif;
      font-family: 'Marcellus', serif;
      font-family: 'Itim', cursive;
      font-family: 'Eczar', serif;
      font-family: 'Noto Serif SC', serif;
      font-family: 'Caudex', serif;
      font-family: 'Cinzel', serif;
      */


    .darkGreyBg {
        background-color: #393e46;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .detailsContainer {
        position: relative;
        height: 100%;
        overflow: hidden;
        padding-top: 30px;
    }

    #tt-logo {
        width: 150px;
    }

    #presents {
        color: white;
        font-size: 1.3em;
        font-family: 'ZCOOL XiaoWei', serif;
    }

    /* Name */
    .title {
        margin-top: 20px;
        /* font-family: 'Caudex', serif; */
        font-family: 'Stoke', serif;
        color: white;
        font-size: 3em;
    }

    .iwi {
        color: white;
        font-size: 2em;
        font-family: 'Itim', cursive;
    }

    .subtitle {
        color: white;
        font-family: 'ZCOOL XiaoWei', serif;
    }

    .credits {
        /* margin: 5px 0 0 0; */
        color: white;
        position: relative;
        z-index: 3;
    }

    .creditTotal {

        /* font-family: 'ZCOOL XiaoWei', serif; */
        /* font-family: 'Eczar', serif; */

        font-size: 2.5em;
        background-color: #23d160;
        color: white;
        border-radius: 50%;
        text-align: center;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        margin-bottom: 1.5rem;
        padding: 60px;
        position: relative;
        z-index: 3;
    }

    .report {
        font-size: 1.6em;
        font-family: 'Caudex', serif;
        color: white;
        font-weight: bold;
        z-index: 20;
        position: relative;
        margin-top: -10px;
    }

    .profileContainer {
        padding: 0;
        position: absolute;
        bottom: -10px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        z-index: 2;
    }

    .tohuContainer {
        padding: 0;
        position: absolute;
        bottom: -80px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        height: 60%;
        width: 100%;
        z-index: 0;

        background-position: -25px 66px;
        background-repeat: no-repeat;


        /* -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
        filter: alpha(opacity=50);
        -moz-opacity: 0.5;
        -khtml-opacity: 0.5;
        opacity: 0.5; */


    }

    .tohuContainer {

        /*
        opacity: 0.5;
        filter: alpha(opacity=50); For IE8 and earlier
        */
    }

    .profile-pic-wrap {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    #profile-pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #777777;
        position: relative;
        right: 0px;
        bottom: 5px;
    }

    .columns {
        flex: auto;
    }

    .flex {
        display: flex;
        align-items:flex-start;
        align-content:flex-start;
    }

    .ktkokm {}



    .principle-title {
        /* font-family: 'Exo', sans-serif; */
        font-family: 'Cinzel', serif;
        font-size: 3.5rem;
        font-weight: 800;
        letter-spacing: 10px;
        color: white;
        margin-top: 50px;
    }

    .principle-content {
        background-color: white;
        border-radius: 5px;
        margin: 10px;
        padding: 20px;
        text-align: left;
        width: 50%;
        z-index: 1;
        /* height: auto; */
        /* border: red solid 2px; */
        align-items:flex-start;
        align-content:flex-start;
    }

    .principle-goal {}

    .principle-reflection {}

    ul {
        list-style-type: disc;
        font-size: 0.9em;
    }

    @media (min-width: 1200px) {}
</style>