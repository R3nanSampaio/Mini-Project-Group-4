import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:'', component: TestComponent},
    {path:'test', component: TestComponent}


];
