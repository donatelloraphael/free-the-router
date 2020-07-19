import * as firebase from "firebase/app";

// import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

if (!firebase.apps.length) {   

 		const firebaseConfig = {
		  apiKey: "AIzaSyD94SY_N1ARwue14x4soMI1ojzvuM-Mr80",
		  authDomain: "free-the-router-13e19.firebaseapp.com",
		  databaseURL: "https://free-the-router-13e19.firebaseio.com",
		  projectId: "free-the-router-13e19",
		  storageBucket: "free-the-router-13e19.appspot.com",
		  messagingSenderId: "953622259053",
		  appId: "1:953622259053:web:8ce6d4efddc704e301a664",
		  measurementId: "G-4HXTMT6Z8R"
		};

    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
    // firebase.analytics();

}

const db = firebase.firestore();

export { db, firebase };