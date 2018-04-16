import {Component} from '@angular/core';
import { productService } from './products/product.service';


@Component({
    selector:'pm-root',
    template:`
    <div>
      <nav class='navbar navbar-default'>
        <div class='container-fluid'>
          <a class="navbar-brand">{{pageTitle}}</a>
            <ul class="nav navbar-nav">
              <li><a [routerLink]="['/welcome']">Home</a></li>
              <li><a [routerLink]="['/products']">Product List</a></li>
              <li><a [routerLink]="['/addProduct']">Add Product</a></li>
            </ul>
        </div>
      </nav>
          <div class="container">
              <router-outlet></router-outlet>
          </div>
    </div>
    `
    ,
    providers:[productService]
    
})
export class AppComponent
{
  pageTitle:string=" Product Management";
  
}