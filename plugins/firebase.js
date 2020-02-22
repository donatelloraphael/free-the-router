import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

if (!firebase.apps.length) {   

 		const config = {
        apiKey: "AIzaSyAGPDCLt8tpLYIKuFuBL_RXHq5Wgeu0VRQ",
			  authDomain: "free-the-router.firebaseapp.com",
			  databaseURL: "https://free-the-router.firebaseio.com",
			  projectId: "free-the-router",
			  storageBucket: "free-the-router.appspot.com",
			  messagingSenderId: "633316623851",
			  appId: "1:633316623851:web:34c5416e40a491a03c85ae",
			  measurementId: "G-T6KW8ZJ40F"
 		}    

    firebase.initializeApp(config);
    firebase.firestore();
}

const db = firebase.firestore();

export { db };