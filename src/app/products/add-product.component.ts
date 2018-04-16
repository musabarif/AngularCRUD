import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { NgForm } from '@angular/forms';
import { FormsModule ,FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { productService } from './product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { IErrors } from './errors';
import { error } from 'selenium-webdriver';
import { isNull } from 'util';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit,OnDestroy {
  
  form: FormGroup;
  paneltitle:string;
  constructor(private _route:ActivatedRoute,private _productService:productService,private formBuilder: FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef,private _service:productService) { 
    this.toastr.setRootViewContainerRef(vcr);
  }
  public product:IProduct; 
  public errors:IErrors;
  errorExist:string;
  errorMessage:string;
  
  ngOnInit() {
    this.product={
      productName:'',
      productId:null,
      productCode:'',
      description:'',
      releaseDate:'',
      price:null,
      starRating:null,
      imageUrl:''
    
   }    
    
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

   
    this.paneltitle="Add product";
    this.errorExist="";
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

  refereshFields()
  {
    this.product={
      productName:'',
      productId:null,
      productCode:'',
      description:'',
      releaseDate:'',
      price:null,
      starRating:null,
      imageUrl:''
    }
  }
  saveProduct(myForm) {     
    if(this.validate(this.product))
    {
      this._productService.saveProduct(this.product).then(
        response => { 
          if(response.toString()=='Success')
          {this.toastr.success('Successfully added.');this.refereshFields();}
          else{
            this.toastr.warning('Error in adding the product.');
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

  ngOnDestroy()
  {
  }
  


}
