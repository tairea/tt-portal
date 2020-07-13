<template>
    <div id="app">
        <!-- <img src="./assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <div class="reveal">
            <div class="slides">
                
                <!-- Slide 1 -->
                <section class="pa-0">
                    <CreditLeaderboard :students="students"/>
                </section>
                
                <!-- Slide 2 -->
                <!-- <section>
                    Timetable
                </section> -->

            </div>
        </div>
    </div>
</template>

<script>
    import { db } from "./firebaseInit";
    import Reveal from 'reveal.js';
    import CreditLeaderboard from '@/components/CreditLeaderboard.vue'

    export default {
        name: 'app',
        components: {
            CreditLeaderboard
        },
        data() {
            return {
                students: []
            }
        },
        mounted() {
            Reveal.initialize({
                width: 960,
                height: 700,
                center: false,
                autoSlide: 20000,
                loop: true,
                progress: false,
                controls: false,
            })
            this.$bind( "students", db.collection('students').where("school_year", ">=", 11 ))
        }
    }
</script>

<style>
    @import url('../../node_modules/reveal.js/dist/reveal.css');
    @import url('../../node_modules/reveal.js/dist/theme/white.css');

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /* margin-top: 60px; */
        height: 100vh;
    }
    
</style>