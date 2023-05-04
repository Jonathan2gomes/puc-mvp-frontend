import {Component} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {ProductsService} from "../services/products.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Product} from "../model/product";

@Component({
  selector: 'app-prod-form',
  templateUrl: './prod-form.component.html',
  styleUrls: ['./prod-form.component.scss']
})
export class ProdFormComponent {

  form = this.formBuilder.group({
    id: [''],
    name: [''],
    measureUnit: ['LITRO'],
    quantity: ['1'],
    price: [1],
    expirationDate: ['2023-01-01'],
    manufacturingDate: ['2023-01-01'],
    perishable: [false]

  });



  constructor(private formBuilder: NonNullableFormBuilder,
              private service: ProductsService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.form.patchValue({
      id: product.id,
      name: product.name,
      measureUnit: product.measureUnit,
      quantity: product.quantity,
      price: product.price,
      expirationDate: product.expirationDate,
      manufacturingDate: product.manufacturingDate,
      perishable: product.perishable

    });
  }

  save() {
    this.service.save(this.form.value)
       .subscribe(result => this.onSuccess(), error => this.onError());
  }

  cancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Product created with success!', '', {duration: 5000});
    this.cancel();
  }

  private onError() {
    this.snackBar.open('Error creating product.', '', {duration: 5000});
  }

  // getErrorMessage(fieldName: string) {
  //   const field = this.form.get(fieldName);
  //
  //   if (field?.hasError('required')) {
  //     return 'Campo obrigatório';
  //   }
  //
  //   if (field?.hasError('minlength')) {
  //     const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
  //     return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
  //   }
  //
  //   if (field?.hasError('maxlength')) {
  //     const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
  //     return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
  //   }
  //
  //   return 'Campo Inválido';
  // }
}
