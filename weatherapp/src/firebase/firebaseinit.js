import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCCD0eY3cZeBobfMobuc2NL1k1FuNMqErU",
    authDomain: "weatherapp-9c54f.firebaseapp.com",
    projectId: "weatherapp-9c54f",
    storageBucket: "weatherapp-9c54f.appspot.com",
    messagingSenderId: "1009550147468",
    appId: "1:1009550147468:web:a21a954d58b417961be0a9",
    measurementId: "G-H93JGR4S7S"
  };

  //Initialize firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export default db;