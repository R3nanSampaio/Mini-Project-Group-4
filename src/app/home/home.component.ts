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
  todo=[{name:"test1", id:1}, {name:"test2", id:2},{name:"test1", id:3}, {name:"test1", id:4}, {name:"test1", id:5}, ]
  done=[{name:"test1", id:1}, {name:"test2", id:2},{name:"test1", id:3}, {name:"test1", id:4}, {name:"test1", id:5}, ]


  newItem: string = '';
  
  itemIndex: object[] = this.todo.concat(this.done)
  itemIndexNum:number = this.itemIndex.length

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex,
        
      );
    } else {
      transferArrayItem(
        event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,
      );
    }
  }


  addTask() {
    
    this.itemIndex = this.todo.concat(this.done)
    this.itemIndexNum = this.itemIndex.length
    
    const newTask = { 
      name: this.newItem, 
      id: this.itemIndexNum
    };

    this.todo.push(newTask)
    console.log(this.todo)
    console.log(this.itemIndexNum)
  }

  
  deleteTodo(parameter:number) {
    for (let i = 0; i< this.todo.length; i++) {
      if (this.todo[i].id === parameter) {
        this.todo.splice(i, 1)
      }
    }
  }
  deleteDone(parameter:number) {
    for (let i = 0; i< this.done.length; i++) {
      if (this.done[i].id === parameter) {
        this.done.splice(i, 1)
      }
    }
  }
}

