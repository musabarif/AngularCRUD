import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'
import { HttpErrorResponse } from "@angular/common/http/src/response";
import { error } from "selenium-webdriver";

@Injectable()
export class productService
{
     private productUrl:any;
    private saveproductUrl="http://localhost:59064/api/Products/SaveProduct";
    private deleteUrl:any;
    constructor(private _http:HttpClient) {}

    getProducts(pageIndex,pageSize):Observable<IProduct[]>
    {
        this.productUrl='http://localhost:59064/api/Products/getproducts?pageIndex='+pageIndex+'&pageSize='+pageSize;
        return this._http.get<IProduct[]>(this.productUrl)
                // .do(data =>console.log('All :'+ JSON.stringify(data)))    
                .catch(this.handleError);
    }

    getProduct(id:number):Observable<IProduct>
    {
        this.productUrl='http://localhost:59064/api/Products/getproduct?id='+id;
        return this._http.get<IProduct>(this.productUrl)
                // .do(data =>console.log('All :'+ JSON.stringify(data)))    
                .catch(this.handleError);
    }

    saveProduct(product:IProduct)
    {
        console.log("saving products");
         return this._http.post(this.saveproductUrl, product)
         .toPromise()
         .then(response => {console.log(response); return response }, this.handleError);
        
    }

    deleteProduct(productId:any)
    {
        this.deleteUrl='http://localhost:59064/api/Products/deleteProduct?productId='+productId;    
        return this._http.delete(this.deleteUrl)
        .toPromise()
        .then(response=> {console.log(response); return response },this.handleError);
    
    }
    private handleError(err:HttpErrorResponse)
    {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}