import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { firebaseData } from '../../environments/firebase.data';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  user = new Subject<Usuario>();

  constructor(private http: HttpClient) { }

  iniciarSesion(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseData.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      })
    );
  }

  private handleAuth(email: string, localId: string, token: string, expiresIn: number): Usuario {
    const expireInDate = new Date(new Date().getTime() + expiresIn);
    const user = new Usuario(email, token, expireInDate, localId)
    this.user.next(user);
    return user;
  }

  registrar(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseData.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      }));
  }
  salirSesion() { }
  obtenerUsuarioActual() { }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'El email ya existe'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'El email no existe'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'La credencial es incorrecta'
        break;
      case 'USER_DISABLED':
        errorMessage = 'El usuario ha sido deshabilidato por un administrador'
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'EL usuario proporcionado es invalido'
        break;
    }
    return throwError(errorMessage);
  }
}

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
