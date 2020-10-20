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

  firebase.auth().onAuthStateChanged(async user => {});
}

export async function GetCompleteUserData(force_get = false) {
  const current_user = GetCurrentUser();
  if (current_user != null) {
    if (user_data != null && !force_get) return user_data;
    const uid = current_user.uid;
    const DB = GetDB();
    var query = DB.collection("users_public").doc(uid);
    const user_public_doc = await query.get();
    if (user_public_doc.exists) {
      query = DB.collection("users_private").doc(uid);
      const user_private_doc = await query.get();
      const user_doc = { ...user_public_doc.data(), ...user_private_doc.data() };
      user_data = user_doc;
      return user_doc;
    }
  }
  return null;
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

export function GetFunctions() {
  return firebase.functions();
}

export function GetServerTimeNow() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
