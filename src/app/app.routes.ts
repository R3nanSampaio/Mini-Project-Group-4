import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:'', component: HomeComponent},
    {path:'test', component: TestComponent},
    {path:'about-us', component: AboutUsComponent}
];
