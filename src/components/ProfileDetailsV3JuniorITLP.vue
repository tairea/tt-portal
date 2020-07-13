<template>
    <div class="columns is-mobile detailsContainer" :class="{darkGreyBg: a4}">
        <div v-if="overview" class="column">

            <div class="logo">
                <img id="tt-logo" v-bind:src="require('@/assets/tt-logo.png')" style="" />
                <!-- <p id="presents">Presents</p> -->
            </div>

            <!-- PROFILE PIC -->
            <div class="column profileContainer">
                <img id="profile-pic"
                    v-bind:src="seriousPhoto" />
            </div>


            <!-- DETAILS-->
            <div class="column is-full">
                <!-- NAME -->
                <p :class="{title: a4}" style="font-weight: bold; font-size: 2.2em">{{student.given_name}}
                    {{student.family_name}}</p>

                <!-- <p class="iwi">{{student.iwi.join(', ')}}</p> -->

                <!-- ITLP Title -->
                <div class="report" style="margin-top: 30px;">
                    <h2 v-if="a4" style="font-weight: bold;">Individualised Tailored Learning Plan<br><span
                            style="font-size: 1.5em;">(ITLP)</span>
                    </h2>
                </div>

            </div>
            <!-- END DETAILS -->

            <!-- ITLP -->
            <div v-for="(endTerm1, index) in itlp" :key="index">
                <div class="leftOfPic">
                    <!-- Interests -->
                    <div class="infoWrap content">
                        <div class="subtitle is-5 infoTitle">Interests</div>
                        <div class="infoText">{{endTerm1.interests}}</div>
                    </div>
                    <!-- Good at -->
                    <div class="infoWrap content">
                        <div class="subtitle is-5 infoTitle">Skills</div>
                        <div class="infoText">{{endTerm1.goodAt}}</div>
                    </div>
                    <!-- Passion Project -->
                    <div class="infoWrap content bottomWrap">
                            <div class="subtitle is-5 infoTitle">Passion Project</div>
                            <div class="infoText">{{endTerm1.passionProject}}</div>
                    </div>
                </div>
                <div class="rightOfPic">
                    <!-- CareerQuest -->
                    <div class="infoWrap content">
                            <div class="subtitle is-5 infoTitle">CareerQuest Results</div>
                            <div class="infoText">{{endTerm1.careerQuest}}</div>
                        </div>
                    <!-- Career Aspiration -->
                    <div class="infoWrap content">
                        <div class="subtitle is-5 infoTitle">Career Aspiration</div>
                        <div class="infoText">{{endTerm1.careerAspiration}}</div>
                    </div>
                    <!-- Subject Pathway -->
                    <div class="infoWrap content bottomWrap">
                        <div class="subtitle is-5 infoTitle">Subject Pathways</div>
                        <ul>
                                <li v-for="(bullet, index) in formatBulletList(endTerm1.subjectPathways)"
                                    :key="index" class="bullet" style="text-align: center;">
                                    {{bullet}}
                                </li>
                            </ul>
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
        db, storage
    } from "./firebaseInit";

    Vue.use(Buefy);

    export default {
        name: "ProfileDetailsV3JuniorITLP",
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
                db.collection(`/students/${this.student.id}/openCredits2020`)
            );
            this.$bind(
                "itlp",
                db.collection(`students/${this.student.id}/itlp2020`)) // Load ITLP
            // this.$bind(
            //   "standardsRuakura",
            //   db.collection(`/studentsRuakura/${this.student.id}/openCredits2020`)
            // );
            this.getNormalProfilePic(this.student.given_name)
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
            getNormalProfilePic(name) {
                name = name.split(" ").join("")
                console.log("getting normal photo for ", name)
                storage.ref('taiohi-highres/'+name.toLowerCase()+'.png').getDownloadURL().then((url) => {
                    console.log("returning ", url)
                    this.seriousPhoto = url
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
    @import url('https://fonts.googleapis.com/css?family=Cantarell:400i|Caudex|Eczar|Exo|Itim|Marcellus|Noto+Serif+SC|Quattrocento|Stoke|ZCOOL+XiaoWei&display=swap');
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
      */

      .content {
        z-index: 1;
      }


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

    #profile-pic {
        width: 500px;
        height: 500px;

        /* border-radius: 50%;
        object-fit: cover;
        background-color: #777777; */
    }




    .columns {
        flex: auto;
    }

    .leftOfPic {
        position: absolute;
        left: 10px;
    }

    .rightOfPic {
        position: absolute;
        right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .infoWrap {
        width: 300px;
        background-color: #fff;
        margin-bottom: 50px;
        padding: 25px;
        border-radius: 5px;
    }

    .bottomWrap {
        width: 200px;
    }

    .infoTitle {
        color: #333;
        margin-bottom: 5px;
    }

    .infoText {
        font-size: 0.9rem;
    }

    @media (min-width: 1200px) {}
</style>