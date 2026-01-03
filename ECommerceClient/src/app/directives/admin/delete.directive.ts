import { SpinnerType } from 'src/app/base/base.component';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {
  AlertifyMessageType,
  AlertifyPosition,
  AlertifyService,
} from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialogService: DialogService,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor: pointer;');
    img.width = 30;
    img.height = 30;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallTrianglePath);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe(
            (data) => {
              $(td.parentElement).animate(
                {
                  opacity: 0,
                  left: '+=50',
                  height: 'tooggle',
                },
                500,
                () => {
                  this.callback.emit();
                  this.alertifyService.message('Ürün başarıyla silinmiştir.', {
                    dismissOthers: true,
                    messageType: AlertifyMessageType.Success,
                    position: AlertifyPosition.TopRight,
                  });
                }
              );
            },
            (errorResponse: HttpErrorResponse) => {
              this.spinner.hide(SpinnerType.BallTrianglePath);
              this.alertifyService.message(
                'Ürün silinirken beklenmeyen bir hata oluştu.',
                {
                  dismissOthers: true,
                  messageType: AlertifyMessageType.Error,
                  position: AlertifyPosition.TopRight,
                }
              );
            }
          );
      },
    });
  }
}
