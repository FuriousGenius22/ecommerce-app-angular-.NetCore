import { Token } from './../../../contracts/token/token';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { AlertifyService } from '../../admin/alertify.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/user/createUser';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> =
      this.httpClientService.post<CreateUser | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as CreateUser;
  }
}
