import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacePipe } from './shared/convert-to-spaces.pipe';
import { starComponenet } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductGuardService } from './products/product-guard.service';
import { AddProductComponent } from './products/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './products/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacePipe,
    starComponenet,
    ProductDetailComponent,
    WelcomeComponent,
    AddProductComponent,
    EditProductComponent
   
  ],
  imports: [
    BrowserModule,
    ToastModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    RouterModule.forRoot([
      {path:'products',component:ProductListComponent},
      {path:'products/:id',
      canActivate:[ ProductGuardService ],
      component:ProductDetailComponent},
      {path:'editProduct/:id',component:EditProductComponent},     
      {path:'welcome',component:WelcomeComponent},
      {path:'addProduct',component:AddProductComponent},
        {path:'',redirectTo:'welcome',pathMatch:'full'},
        {path:'**',redirectTo:'welcome',pathMatch:'full'}
      

    ])
  ],
  providers: [ProductGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
