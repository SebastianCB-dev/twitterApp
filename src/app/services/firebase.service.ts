import {
  Injectable
} from '@angular/core';

// Firebase
import {
  initializeApp
} from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebaseConfig = {
    apiKey: "AIzaSyAeJHtb8NINXDmWizmxyzialfowZXUt4Jw",
    authDomain: "twitterapp-88c29.firebaseapp.com",
    projectId: "twitterapp-88c29",
    storageBucket: "twitterapp-88c29.appspot.com",
    messagingSenderId: "899848472839",
    appId: "1:899848472839:web:25d27555851c561e0ddda2"
  };

  private db;
  userLogin: string = '';

  constructor() {
    initializeApp(this.firebaseConfig);
    this.db = getFirestore();
  }

  async registerUser(name: string, username: string, datebirth: string): Promise < string > {


    setDoc(doc(collection(this.db, 'users'), username), {
      name, username, datebirth
    });

    return username;
  }


  async getUserByUsername(username: string): Promise<boolean> {

    const docRef = doc(this.db, "users", username);
    const docSnap = await getDoc(docRef);
    let userCreated = false;
    if (docSnap.exists()) {
      userCreated = true;
    }
    return userCreated;
  }

}
