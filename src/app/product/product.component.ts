import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
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
}
