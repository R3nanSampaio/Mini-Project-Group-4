import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common'
import {MatIconModule} from '@angular/material/icon';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyB8wWFUVIDDdN-nLIKV5gMMGRluCq5DOfI",
  authDomain: "miniprojectg4-97534.firebaseapp.com",
  projectId: "miniprojectg4-97534",
  storageBucket: "miniprojectg4-97534.firebasestorage.app",
  messagingSenderId: "74212901424",
  appId: "1:74212901424:web:68093d5cb5b045d705e3f5"
};

const app = initializeApp(firebaseConfig);

@Component({
  
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule , MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, CommonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mini-project';
  events: string[] = [];
  opened: boolean = false;

  menuDisplay: string = 'inline-block';
  signOutDisplay: string = 'none';
  
  logOrNot: string = '';

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateLogOrNot();
      } else {
        this.logOrNot = "Please log in or register";
        this.signOutDisplay = 'none';
      }
    });
  }

  async updateLogOrNot() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.logOrNot = `Hello ${userData['username']}`
        this.menuDisplay = 'none';
        this.signOutDisplay = 'inline-block';
      } 
    } else {
      this.logOrNot = "Please log in or register";
    }
  }

  

  signOut() {
    const auth = getAuth();
    if (auth.currentUser) {
      signOut(auth).then(() => {
        alert('Sign-out successful!');
      }).catch((error) => {
        alert('Error during sign-out:');
      })
      .finally(() => {
        window.location.href = '/home';
        });
      
    }
    
    else {
  alert('No user is currently signed in.');
  };
  }
}
