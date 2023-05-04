import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products/products.component';
import {TableModule} from "primeng/table";
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import { ProdFormComponent } from './prod-form/prod-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    ProductsComponent,
    ProdFormComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        TableModule,
        AppMaterialModule,
        MatProgressSpinnerModule,
        SharedModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ]
})
export class ProductsModule {
}
