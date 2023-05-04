import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProdFormComponent} from "./prod-form/prod-form.component";
import {ProductResolver} from "./guards/product.resolver";

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'new', component: ProdFormComponent, resolve: {product: ProductResolver}},
  {path: 'edit/:id', component: ProdFormComponent, resolve: {product: ProductResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
