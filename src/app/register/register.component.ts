import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { FormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  confirmPassword: string = '';

  register() {

    const auth = getAuth();
    const db = getFirestore();

    if (this.registerPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
      .then(async (userCredential) => {

        const user = userCredential.user;
        const db = getFirestore();

        const userDocRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        username: this.userName, 
      });
        
        alert('Registration successful!');
        window.location.href = '/login';
              })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already in use. Please use a different email.');
          console.error('Error during registration:', error)
          return
        }
        console.error('Error during registration:', error);
        alert(`Error: ${error.message}`);
      });
  }

}
