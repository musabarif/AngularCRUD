import {Component} from '@angular/core'
import { IProduct } from './product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { productService } from './product.service';
import { ToastsManager } from 'ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({    
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit
{
    pageTitle:string="Product List";
    imageWidth:number=50;
    imageMargin:number=2;
    showImage:boolean=false;
    errorMessage:string;
    _listFilter:string;
    CurrentPage:number;
    pageSize:number;
    PageIndex:number;
    pageSizeSelected:number;
    sortAsc:number;
    get listFilter():string
    {
        return this._listFilter;
    }
    set listFilter(value:string)
    {
        this._listFilter=value;
        this.filteredProducts=this._listFilter? this.performFilter(this._listFilter):this.products;
    }
    filteredProducts:IProduct[];
    products:IProduct[];
    toggleImage():void{
        this.showImage=!this.showImage;
    }

    ngOnInit():void{        
        this.PageIndex=1;
        this.pageSize=5;
       this._productService.getProducts(this.PageIndex,this.pageSize)
                            .subscribe(products => {this.products= products
                                                    this.filteredProducts=products;
                                                    },
                                        error => this.errorMessage=<any>error);
                                                    
                                        this.CurrentPage=1;
                                        this.pageSizeSelected=5;                                        
                                }

    constructor(private _productService:productService,public toastr: ToastsManager, vcr: ViewContainerRef)
    {
            this._listFilter='';
            this.toastr.setRootViewContainerRef(vcr);
    }

    performFilter(filterBy:string):IProduct[]
    {
        filterBy=filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct)=>product.productName.toLocaleLowerCase().indexOf(filterBy) !==-1);
    }

    onStarClicked(message:string):void{
        this.pageTitle="product List "+message;
    }
    sortByProduct(sortByType:string):IProduct[]
    {
        return this.products.sort(function(a,b){
                if (a.productName < b.productName)
                return -1;
                if(a.productName> b.productName)
                return 1;
            return 0;
        });
    }
    sortByCode(sortByType:string):IProduct[]
    {
        return this.products.sort(function(a,b){
                if (a.productCode < b.productCode)
                return -1;
                if(a.productCode> b.productCode)
                return 1;
            return 0;
        });
    }
    sortByDate(sortByType:string):IProduct[]
    {
        return this.products.sort(function(a,b){
                if (a.releaseDate < b.releaseDate)
                return -1;
                if(a.releaseDate> b.releaseDate)
                return 1;
            return 0;
        });
    }
    sortByPrice(sortByType:string):IProduct[]
    {
        return this.products.sort(function(a,b){
                if (a.price < b.price)
                return -1;
                if(a.price> b.price)
                return 1;
            return 0;
        });
    }
    sortByRating(sortByType:string):IProduct[]
    {
        return this.products.sort(function(a,b){
                if (a.starRating < b.starRating)
                return -1;
                if(a.starRating> b.starRating)
                return 1;
            return 0;
        });
    }
    changePageSize()
    {
        this.pageSize=this.pageSizeSelected;
        this.getProductsCall();
        
    }
    
    
    getFirstPage()
    {
        this.pageSize=5;
        this.PageIndex=1;
        this.getProductsCall();
    }
    getPreviousPage()
    {
        this.pageSize=5;
        if(this.PageIndex>1)
        {this.PageIndex-=1;}
        this.getProductsCall();
    }
    getNextPage()
    {
        this.pageSize=5;
        this.PageIndex+=1;
        this.getProductsCall();
    }
    getLastpage()
    {
        this.pageSize=5;
        this.PageIndex=5;
        this.getProductsCall();
    }
    getProductsCall()
    {
        this._productService.getProducts(this.PageIndex,this.pageSize)
        .subscribe(products => {this.products= products
                                this.filteredProducts=products;
                                },
                    error => this.errorMessage=<any>error);  
    }


    delete(Productid:any)
    {
        console.log(Productid);
        this._productService.deleteProduct(Productid).then(
            response => {this.getProductsCall();
                if(response.toString()=='Success'){
                    this.toastr.success('Successfully deleted.');}
                else
                {this.toastr.warning('Error in deleting the product.');}
                }
        );
        
    }
}