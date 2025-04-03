import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CdkDragDrop,moveItemInArray, transferArrayItem, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyAnlBSj4ZpvXuJqQ-G6j7Lix9-GXKaGhfs",
  authDomain: "test1-84b3c.firebaseapp.com",
  projectId: "test1-84b3c",
  storageBucket: "test1-84b3c.firebasestorage.app",
  messagingSenderId: "340624408124",
  appId: "1:340624408124:web:8729f2d6def3b1e3104d39"
};

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  todo=[{name:"You are not logged in", id:1, desc:"Changes will not be saved"}, ]
  done=[{name:"You are not logged in", id:2, desc:"Changes will not be saved"}, ]
  progress=[{name:"You are not logged in", id:3, desc:"Changes will not be saved"}, ]



  newItem: string = '';
  newItemdesc:string = '';
  
  itemIndex: object[] = this.todo.concat(this.done, this.progress)
  itemIndexNum:number = this.itemIndex.length


ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateTasks();
      } else {
        return
      }
    });
  }

  async updateTasks() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.todo = userData['todo']
        this.progress = userData['progress']
        this.done = userData['done']

        if (this.todo === undefined) {
          this.todo = []
          this.done=[]
          this.progress=[]
        }
      } 
    } else {
      return
    }
  }



  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex,
        
      );
    } else {
      transferArrayItem(
        event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,
      );
    }
    this.saveUserTasks()
  }


  addTask() {
    
    this.itemIndex = this.todo.concat(this.done,  this.progress)
    this.itemIndexNum = this.itemIndex.length
    if(this.newItem === '') {
      alert('Please enter a task title!')
      return;
    }
    
    const newTask = { 
      name: this.newItem, 
      desc: this.newItemdesc,
      id: this.itemIndexNum
    };

    this.todo.push(newTask)
    console.log(this.todo)
    console.log(this.itemIndexNum)
    console.log(this.newItemdesc)
    this.saveUserTasks()
    this.newItem = '';
    this.newItemdesc = '';
  }

  
  deleteTodo(parameter:number) {
    for (let i = 0; i< this.todo.length; i++) {
      if (this.todo[i].id === parameter) {
        this.todo.splice(i, 1)
      }
    }
    this.saveUserTasks()
  }
  deleteProgess(parameter:number) {
    for (let i = 0; i< this.progress.length; i++) {
      if (this.progress[i].id === parameter) {
        this.progress.splice(i, 1)
      }
    }
    this.saveUserTasks()
  }
  deleteDone(parameter:number) {
    for (let i = 0; i< this.done.length; i++) {
      if (this.done[i].id === parameter) {
        this.done.splice(i, 1)
      }
    }
    this.saveUserTasks()
  }
  async saveUserTasks() {

    

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(userDocRef, {
          todo: this.todo,
          progress: this.progress,
          done: this.done,
        });
        console.log('Tasks saved successfully!');
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    } else {
      console.error('No user is logged in.');
    }
  }
}
  



