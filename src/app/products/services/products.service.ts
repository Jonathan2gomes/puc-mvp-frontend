import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {delay, first, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private readonly API = '/assets/products.json';

  private readonly API = 'http://localhost:8080/product/';

  constructor(private httpClient: HttpClient) {
  }

  list() {
    return this.httpClient.get<Product[]>(this.API)
      .pipe(
        first(),
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Product>(`${this.API}${id}`);
  }

  save(record: Partial<Product>) {
    console.log('to NO METODO SALVAR', record);
    if (record.id) {
      // console.log('update');
      return this.update(record);
    }
    // console.log('create');
    return this.create(record);
  }

   create(record: Partial<Product>) {
     console.log('to NO METODO CRIAR', record);
     return this.httpClient.post<Product>(this.API, record);
  }

  private update(record: Partial<Product>) {
    console.log('to NO METODO ATUALIZAR');
    return this.httpClient.put<Product>(`${this.API}${record.id}`, record).pipe(first());
  }

  remove(id: string) {
  console.log('to NO METODO REMOVER', id)
    return this.httpClient.delete(`${this.API}${id}`).pipe(first());
  }

  // loadById2(id: string) {
  //   return this.httpClient.get<Product>(`${this.API}${id}`);
  // }
}
