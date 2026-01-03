import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends BaseComponent implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.showSpinner(SpinnerType.BallTrianglePath)

    if (!_isAuthenticated) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastrService.message(
        'Oturum açmanız gerekiyor!',
        'Yetkisiz Erişim',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopRight,
        }
      );
    }

    this.hideSpinner(SpinnerType.BallTrianglePath)

    return true;
  }
}
