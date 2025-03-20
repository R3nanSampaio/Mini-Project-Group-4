import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CdkDragDrop,moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  newItem: string = '';
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex
        
      );
      console.log(this.todo, this.done)
    } else {
      transferArrayItem(
        event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,
      );
      console.log(this.todo, this.done)
    }
  }

  addTask() {
   /*let allArray = this.todo.concat(this.done)
    console.log(allArray)
    for (let i = 0; i< allArray.length; i++) {
      if (this.newItem == allArray[i]) {
        alert("New task cannot be same as an already existing task") 
        return
      }
    }*/
    this.todo.push(this.newItem)
    }    


  test:string = "Testing"
  deleteTodo(parameter:string) {
    for (let i = 0; i< this.todo.length; i++) {
      if (this.todo[i] === parameter) {
        this.todo.splice(i, 1)
      }
    }
  }
  deleteDone(parameter:string) {
    for (let i = 0; i< this.done.length; i++) {
      if (this.done[i] === parameter) {
        this.done.splice(i, 1)
      }
    }
  }
}

