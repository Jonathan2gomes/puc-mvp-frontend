import {Component} from '@angular/core';
import {Product} from "../model/product";
import {ProductsService} from "../services/products.service";
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$: Observable<Product[]> | null = null;
  displayedColumns = ['id', 'name', 'quantity', 'price', 'expirationDate', 'manufacturingDate', 'perishable', 'actions'];

  // private dialog: any;

  constructor(
  private dialog: MatDialog,
  private productService: ProductsService,
  private router: Router,
  private route: ActivatedRoute,
  private snackBarr: MatSnackBar) {
    this.refresh();
    // this.products$ = this.productService.list()
    //   .pipe(
    //     catchError(error => {
    //       this.onError('Error loading products')
    //       return of([])
    //     })
    //   );
  }

  refresh() {
    this.products$ = this.productService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd() {
    // this.dialog.open(ProdFormComponent);
    console.log('adding product');
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  onEdit(product: Product) {
    this.router.navigate(['edit', product.id], {relativeTo: this.route});
  }

  onRemove(product: Product) {
  console.log('removing product', product);

        this.productService.remove(product.id).subscribe(
          () => {product.id
            this.refresh();
          },
          () => this.onError('Error trying to remove product.')
        );
      }


}
