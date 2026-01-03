import { ListProduct } from './../../../contracts/listProduct';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImage } from 'src/app/contracts/listProductImage';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from '../../admin/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService, private alertify:AlertifyService) {}

  create(
    product: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          if (successCallBack) {
            successCallBack();
          }
        },
        (errorResponse: HttpErrorResponse) => {
          let message = '';

          if (errorResponse.error && Array.isArray(errorResponse.error)) {
            const _error: Array<{ key: string; value: Array<string> }> =
              errorResponse.error;
            _error.forEach((v, index) => {
              v.value.forEach((_v, _index) => {
                message += `${_v}<br>`;
              });
            });
          } else if (typeof errorResponse.error === 'string') {
            message = errorResponse.error;
          } else if (
            errorResponse.error &&
            typeof errorResponse.error === 'object'
          ) {
            message = JSON.stringify(errorResponse.error);
          } else {
            message = 'An unknown error occurred.';
          }

          if (errorCallBack) {
            errorCallBack(message);
          }
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalCount:number ;products: ListProduct[]}> {
    const promiseData: Promise<{totalCount:number ;products: ListProduct[]}> = this.httpClientService
      .get<{totalCount:number ;products: ListProduct[]}>({
        controller: 'products',
        queryString:`page=${page}&size=${size}`
      })
      .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      ).finally(()=>successCallBack());
      
    return await promiseData;
  }

  async delete(id:string){
    const deleteObservable:Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);
    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
      action: "getproductimages",
      controller: "products"
    }, id);
    var images: ListProductImage[] = []
    try {
      images = await firstValueFrom(getObservable);
    } catch (error) {
      this.alertify.message("Resimler yüklenirken hata oluştu",{
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight
      })
      
    }finally{
      successCallBack();
    }
    
    
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
