<template>
    <div id="app">

        <div class="reveal">
            <div class="slides">
                
                <!-- Slide 1 -->
                <section class="pa-0">
                    <p class="title">Year 11s</p>
                    <div class="flexWrap">
                        <TaiohiCard v-for="(student, index) in getSortStudents(11)" :key="`${student.school_year + '-' +index}`" :student="student" class="taiohiCard"/>
                    </div>
                </section>
                
                <!-- Slide 2 -->
                <section>
                    <p class="title">Year 12s</p>
                    <div class="flexWrap">
                        <TaiohiCard v-for="(student, index) in getSortStudents(12)" :key="`${student.school_year + '-' +index}`" :student="student" class="taiohiCard"/>
                    </div>
                    <p class="title">Year 13s</p>
                    <div class="flexWrap">
                            <TaiohiCard  v-for="(student, index) in getSortStudents(13)" :key="`${student.school_year + '-' +index}`" :student="student" class="taiohiCard"/>
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>

<script>
    import { db } from "./firebaseInit";
    import Reveal from 'reveal.js';
    import CreditLeaderboard from '@/components/CreditLeaderboard.vue'
    import Timetable from '@/components/Timetable.vue'
    import TaiohiCard from '@/components/TaiohiCard.vue'

    export default {
        name: 'app',
        components: {
            CreditLeaderboard,
            Timetable,
            TaiohiCard
        },
        data() {
            return {
                students: []
            }
        },
        mounted() {
            Reveal.initialize({
                width: '95%',
                height: '100%',
                center: false,
                autoSlide: 20000,
                loop: true,
                progress: false,
                controls: false,
            })
            this.$bind( "students", db.collection('students').where("school_year", ">=", 11 ))
        },
        methods: {
            sortStudents() {
                let descending = this.students.sort((a, b) => Number(b.creditTotal) - Number(a.creditTotal));
                return descending;
            },
            getSortStudents(year) {
                let studentsByYear = this.students.filter(student => student.school_year == year);
                // let studentsByYear = this.students.filter(student => student.nsn == '137431392');
                let descending = studentsByYear.sort((a, b) => Number(b.creditTotal) - Number(a.creditTotal));
                return descending
            }
        }
    }
</script>


<!-- <style scoped src="../../node_modules/reveal.js/dist/reveal.css"></style>
<style scoped src="../../node_modules/reveal.js/dist/theme/white.css"></style> -->
<style lang="scss" scoped>
    /* scoping not working on reveal css imports */

    @import url('../../node_modules/reveal.js/dist/reveal.scss');
    @import url('../../node_modules/reveal.js/dist/theme/white.scss');

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /* margin-top: 60px; */
        height: 100vh;
    }

    .reveal .slides > section {
        padding: 0 !important;
    }

    .flexWrap {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .taiohiCard {
        width: calc(50% - 20px);
        box-sizing: border-box;
    }
    
</style>