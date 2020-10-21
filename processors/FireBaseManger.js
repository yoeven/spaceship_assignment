import { FIREBASE_DEVELOPMENT_API_KEY } from "react-native-dotenv";
import * as firebase from "firebase/app";
import "@firebase/firestore";
import "@firebase/functions";
import "@firebase/auth";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE_DEVELOPMENT_API_KEY,
  authDomain: "spaceship-assignment.firebaseapp.com",
  databaseURL: "https://spaceship-assignment.firebaseio.com",
  storageBucket: "spaceship-assignment.appspot.com",
  projectId: "spaceship-assignment",
};

export function SetUp() {
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

export async function Signout() {
  return await firebase.auth().signOut();
}

export function GetCurrentUser() {
  return firebase.auth().currentUser;
}

export function GetDB() {
  return firebase.firestore();
}

export function GetAuth() {
  return firebase.auth();
}

export function GetFunctions() {
  return firebase.functions();
}

export function GetServerTimeNow() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
