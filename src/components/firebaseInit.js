import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const studentsDb = db.collection("students");
export const studentsDbRuakura = db.collection("studentsRuakura");
