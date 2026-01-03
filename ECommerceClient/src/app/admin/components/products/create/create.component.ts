import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createProduct';
import {
  AlertifyMessageType,
  AlertifyPosition,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @Output() createdProduct:EventEmitter<CreateProduct> = new EventEmitter();

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallTrianglePath);
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallTrianglePath);
      this.alertify.message('Product Successfuly Added.', {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight,
      });
      this.createdProduct.emit(create_product);
    },errorMessage =>{
      this.alertify.message(errorMessage, {
        dismissOthers:true,
        position:AlertifyPosition.TopRight,
        messageType:AlertifyMessageType.Error
      })
    }
  );
  }
}
