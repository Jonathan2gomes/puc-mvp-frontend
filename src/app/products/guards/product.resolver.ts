import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

  constructor(private productService: ProductsService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    if (route.params && route.params['id']) {
      return this.productService.loadById(route.params['id']);
    }
    return of({id: '', name: 'oi', measureUnit:'', quantity: '', price: 0, expirationDate: '', manufacturingDate: '', perishable: false});
  }
}
