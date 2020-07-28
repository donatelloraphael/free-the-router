import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/analytics";

import {FIREBASE_CONFIG} from "../../.env";

if (!firebase.apps.length) {   

    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.firestore();
}

const db = firebase.firestore();

export { db, firebase };