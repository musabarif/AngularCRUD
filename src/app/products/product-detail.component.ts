import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { productService } from './product.service';

@Component({
  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    pageTitle:string='Product Deatils';    
    product:IProduct;
    errorMessage:string="";

  constructor(private _route:ActivatedRoute,private _router:Router,private _service:productService) {

   }

  ngOnInit() {
    let id =+this._route.snapshot.paramMap.get('id');
    // this.pageTitle += `: ${id}`;
    this._service.getProduct(id)
                  .subscribe(result =>  {this.product=result;},
      error => this.errorMessage=<any>error);
      console.log(this.product)    
  }

  onBack():void{
    this._router.navigate(['/products'])
  }

}
 