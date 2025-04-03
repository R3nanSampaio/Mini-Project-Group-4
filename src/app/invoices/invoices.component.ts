import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { PDFDocument, rgb } from 'pdf-lib';


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
  invoices: {baseCost: string, milk: string, syrup: string, caffeine: string,discount: string, subtotal: string, tax: string, total: string, id: number}[] = []
  empty = "none"
  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateInvoice();
      } else {
        alert("Please log in to view invoices.");
        window.location.href = '/login';
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

  async downloadInvoicePDF(invoiceId: number) {
    const invoice = this.invoices.find(inv => inv.id === invoiceId);
  
    if (!invoice) {
      alert('Invoice not found!');
      return;
    }
  
    try {
      const pdfDoc = await PDFDocument.create();
  
      const page = pdfDoc.addPage([600, 400]);
  
      const fontSize = 12;
      let yPosition = 350;
  
      page.drawText(`Invoice ID: ${invoice.id}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Base Cost: ${invoice.baseCost}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Milk Cost: ${invoice.milk}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Syrup Cost: ${invoice.syrup}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Caffeine Cost: ${invoice.caffeine}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Discount: ${invoice.discount}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Subtotal: ${invoice.subtotal}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Tax: ${invoice.tax}`, { x: 50, y: yPosition, size: fontSize });
      yPosition -= 20;
      page.drawText(`Total: ${invoice.total}`, { x: 50, y: yPosition, size: fontSize });
  
      const pdfBytes = await pdfDoc.save();
  
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Invoice_${invoice.id}.pdf`;
  
      link.click();
  
      URL.revokeObjectURL(link.href);
  
      console.log('Invoice PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF.');
    }
  }
}
