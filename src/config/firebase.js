import * as firebase from "firebase";

var FirebaseConfig = {
  apiKey: "AIzaSyCnZCY0wi3qvRDJwSYCnLCSYHM2LEswPMA",
  authDomain: "todo-117.firebaseapp.com",
  databaseURL: "https://todo-117.firebaseio.com",
  projectId: "todo-117",
  storageBucket: "todo-117.appspot.com",
  messagingSenderId: "244500501438"
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
