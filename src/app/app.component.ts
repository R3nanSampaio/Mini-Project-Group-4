import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common'

@Component({
  
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule , MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mini-project';
  events: string[] = [];
  opened: boolean = false;
  
}
