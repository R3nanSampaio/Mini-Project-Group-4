import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
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
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  invoices: {baseCost: string, milk: string, syrup: string, caffeine: string,discount: string, subtotal: string, tax: string, total: string}[] = []
  empty = "none"
  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateInvoice();
      } else {
        alert("Please log in or register to view invoices.");
        return
      }
    });
    
  }

  async updateInvoice() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.invoices = userData['invoices']
        

        if (this.invoices=== undefined) {
          this.invoices = []
        }
      } 
      this.checkEmpty();
    } else {
      return
    }
    
  }
  checkEmpty() {
    if (this.invoices.length === 0) {
      this.empty = "inline-block"
    } else {
      this.empty = "none"
    }
  }
}
