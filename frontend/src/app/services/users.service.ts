import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUserData, User, UserData } from '../models/user.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<ApiUserData[]>(environment.apiUrl + '/users').pipe(
      map(response => {
        return response.map(userData => {
          return new User(
            userData._id,
            userData.username
          );
        });
      })
    );
  }

  createUser(userData: UserData) {
    const formData = new FormData();
    formData.append('username', userData.username);

    return this.http.post(environment.apiUrl + '/users', formData);
  }

}
