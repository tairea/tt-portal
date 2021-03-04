import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './firebaseConfig'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export const studentsDb = db.collection("students");
export const studentsDbRuakura = db.collection("studentsRuakura");
