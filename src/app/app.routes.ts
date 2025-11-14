import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { JewelryList } from './components/jewelry-list/jewelry-list';
import { JewelryDetailsComponent } from './components/jewelry-details-component/jewelry-details-component';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'about', component: AboutUs, title: 'About' },
  { path: 'items', component: JewelryList, title: 'Jewelry' },
  { path: 'items/:id', component: JewelryDetailsComponent, title: 'Jewelry Details' },
  { path: 'login', component: Login, title: 'Login' },
];
