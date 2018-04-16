import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { productService } from './product.service';
import { ToastsManager } from 'ng2-toastr';
import { IErrors } from './errors';

@Component({
  selector: 'pm-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product:IProduct;
  errorMessage:string;
  public errors:IErrors;
  errorExist:string;
  

  constructor(private _route:ActivatedRoute,private _router:Router,private _service:productService,public toastr: ToastsManager,) {

  }

  ngOnInit() {
    let id =+this._route.snapshot.paramMap.get('id');
    // this.pageTitle += `: ${id}`;
    this._service.getProduct(id)
                  .subscribe(result =>  {this.product=result;},
      error => this.errorMessage=<any>error);
      console.log(this.product);

      this.errors={
        productName:'',
        productId:'',
        productCode:'',
        description:'',
        releaseDate:'',
        price:'',
        starRating:'',
        imageUrl:''
      }
  }

  saveProduct(myform):any
  {
    if(this.validate(this.product))
    {
      this._service.saveProduct(this.product).then(
        response => { 
          if(response.toString()=='Success')
          {this.toastr.success('Successfully added.');
          // this.refereshFields();
        }
          else{
            this.toastr.warning('Error in updating the product.');
          }
        }
      );      
    }  
  }
  validate(product:IProduct):boolean
  {
    
      this.refereshErrors();
      var re = /^[A-Za-z ]+$/;
      if(!re.test(product.description))
       {this.errors.description='Invalid description';this.errorExist='true';}
      if(product.productName=='')
      {this.errors.productName='Product Name is required';this.errorExist='true';}   
      if(product.productCode=='')
      {this.errors.productCode='Product Code is required';this.errorExist='true';} 
      if(product.releaseDate=='')
      {this.errors.releaseDate='Release Date is required';this.errorExist='true';} 
      if(product.description=='')
      {this.errors.description='Description is required';this.errorExist='true';}
      if(product.imageUrl.search('http://')==-1)
      {this.errors.imageUrl='Image Url is not valid';this.errorExist='true';}   
      if(product.imageUrl=='')
      {this.errors.imageUrl='Image Url is required';this.errorExist='true';}
      if(product.price<=0)
      {this.errors.price='Price is invalid';this.errorExist='true';}      
      if(product.price==null)
      {this.errors.price='Price is required';this.errorExist='true';}
      if(product.starRating<0)
      {this.errors.starRating='Star rating is invalid';this.errorExist='true';}     
      if(product.starRating==null)
      {this.errors.starRating='Star rating is required';this.errorExist='true';}
      if(this.errorExist=='true')
      {return false;}
      
    return true;
  }

  refereshErrors()
  {
    this.errors={
      productName:'',
      productId:'',
      productCode:'',
      description:'',
      releaseDate:'',
      price:'',
      starRating:'',
      imageUrl:''
    }
  }


}
