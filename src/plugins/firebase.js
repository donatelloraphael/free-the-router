import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/analytics";
import "firebase/performance";

import {FIREBASE_CONFIG} from "../../env";

if (!firebase.apps.length) {   
    firebase.initializeApp(FIREBASE_CONFIG);
}

const perf = firebase.performance();

const db = firebase.firestore();

export { db, firebase };