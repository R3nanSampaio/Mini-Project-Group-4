import { Component, OnInit } from '@angular/core';
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
  selector: 'app-product',
  imports: [FormsModule, ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  isHot: boolean = true;

  type: string = ''

  invoices: {baseCost: string, milk: string, syrup: string, caffeine: string,discount: string, subtotal: string, tax: string, total: string, id: number, type: string}[] = []
  

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;

  if (user) {
    this.updateInvoice();
  } else {
    alert("Please log in to view this page.");
    window.location.href = '/login';
  }
}

  
  code:string = ''

  discountBoo:boolean = false

  milkVal: number = 0
  milkCost: number = this.milkVal*0.50
  milkCost2 = this.milkCost.toFixed(2)
  
  syrupVal:number = 0
  syrupCost:number = this.syrupVal*0.55
  syrupCost2 = this.syrupCost.toFixed(2)
  
  caffeineVal:number = 0
  caffeineCost:number = this.caffeineVal*0.60
  caffeineCost2 = this.caffeineCost.toFixed(2)
  
  subtotal: number = this.milkVal*0.50 + this.syrupVal*0.55 + this.caffeineVal*0.60 +0.50
  subtotal2 = this.subtotal.toFixed(2)
  subtotalTax = (this.subtotal*0.10).toFixed(2)

  total:string = (this.subtotal + this.subtotal*0.10).toFixed(2)

  

  calculateSubtotal() {
    this.subtotal = this.milkVal*0.50 + this.syrupVal*0.55 + this.caffeineVal*0.60 + 0.50
    this.subtotal2 = this.subtotal.toFixed(2)
    this.subtotalTax = (this.subtotal*0.10).toFixed(2)
    
    if (this.discountBoo) {
      this.total = ((this.subtotal + this.subtotal*0.10)*0.80).toFixed(2)
    }
    else {this.total = (this.subtotal + this.subtotal*0.10).toFixed(2)}

  }
  calculateCaffeineCost() {
    this.caffeineCost = this.caffeineVal*0.60
    this.caffeineCost2 = this.caffeineCost.toFixed(2)
  }
  calculateMilkCost() {
    this.milkCost = this.milkVal*0.50
    this.milkCost2 = this.milkCost.toFixed(2)
  }
  calculateSyrupCost() {
    this.syrupCost = this.syrupVal*0.55
    this.syrupCost2 = this.syrupCost.toFixed(2)
  }

  addMilk(amount: number = 1) {
    this.milkVal += amount;
    this.subtotal = this.subtotal
    this.calculateSubtotal()
    this.calculateMilkCost()
  }
  addSyrup(amount: number = 1) {
    this.syrupVal += amount;
    this.calculateSubtotal()
    this.calculateSyrupCost()
  }
  addCaffeine(amount: number = 1) {
    this.caffeineVal += amount;
    this.calculateSubtotal()
    this.calculateCaffeineCost()
  }

  lessMilk(amount: number = 1) {
    this.milkVal -= amount;
    this.calculateSubtotal()
    this.calculateMilkCost()
  }
  lessSyrup(amount: number = 1) {
    this.syrupVal-= amount;
    this.calculateSubtotal()
    this.calculateSyrupCost()
    
  }
  lessCaffeine(amount: number = 1) {
    this.caffeineVal -= amount;
    this.calculateSubtotal()
    this.calculateCaffeineCost()
  }

  checkDiscount() {
    if (this.code.toLocaleUpperCase() == "BOMBA") {
      this.discountBoo = true
      const discountP = document.getElementById("Discount")
      if (discountP) {
        discountP.style.display="block"
      }
      alert("Code is valid")  
      this.calculateSubtotal()
    }
    else {
      this.discountBoo = false
      const discountP = document.getElementById("Discount")
      if (discountP) {
        discountP.style.display="none"
      }
      this.calculateSubtotal()
      alert("Invalid code")}
}
  clearAll() {
    this.milkVal = 0 
    this.syrupVal = 0
    this.caffeineVal = 0  
    this.code = ''
    this.discountBoo = false
    this.milkCost = 0
    this.syrupCost = 0
    this.caffeineCost = 0
    this.subtotal = 0
    this.subtotal2 = "0.00"
    this.subtotalTax = "0.00"
    this.total = "0.00"
  }
         
 
    addInvoice() {
      if (this.isHot) {
        this.type = "Hot"}

        else {
          this.type = "Cold"}

      const invoice = {
        baseCost: "0.50",
        milk: this.milkCost2,
        syrup: this.syrupCost2,
        caffeine: this.caffeineCost2,
        discount: this.discountBoo ? "20%" : "None",
        subtotal: this.subtotal2,
        tax: this.subtotalTax,
        total: this.total,
        id: this.invoices.length + 1,
        type: this.type
      };
      this.invoices.unshift(invoice);
      console.log(this.invoices)
      this.saveInvoices()
      alert("Thank you for your order!")
      this.clearAll()
    }
    async saveInvoices() {
      const auth = getAuth();
      const user = auth.currentUser;
    
      if (!user) {
        console.log('User is not logged in. Invoices will not be saved.');
        return;
      }
    
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid); 
    
      try {
        await updateDoc(userDocRef, {
          invoices: this.invoices, 
        });
        console.log('Invoices saved successfully!');
      } catch (error) {
        console.error('Error saving invoices:', error);
      }
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
      } else {
        return
      }
    }
  
    

}
