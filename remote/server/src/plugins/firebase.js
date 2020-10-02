import * as firebase from "firebase/app";
import "firebase/firestore";

import {FIREBASE_CONFIG} from "../../env";

if (!firebase.apps.length) {   
    firebase.initializeApp(FIREBASE_CONFIG);
}
const db = firebase.firestore();

export { db };