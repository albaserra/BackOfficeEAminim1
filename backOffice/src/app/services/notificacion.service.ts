import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Notificacion } from '../interfaces/notificacion';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getListNoficacion(): Observable<Notificacion[]> {
    const myApiUrl: string = 'notificacion/all'
    return this.http.get<Notificacion[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteNotificacion(id: ID): Observable<void> {
    const myApiUrl: string = 'notificacion/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  createNotificacion(notificacion: Notificacion): Observable<Notificacion> {
    const myApiUrl: string = 'notificacion/'
    return this.http.post<Notificacion>(`${this.myAppUrl}${myApiUrl}`, notificacion);
  }

  getNotificacion(id: string): Observable<Notificacion> {
    const myApiUrl: string = 'notificacion/';
    return this.http.get<Notificacion>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateNotificacion(id: string, notificacion: Notificacion): Observable<Notificacion> {
    const myApiUrl: string = 'notificacion/';
    return this.http.put<Notificacion>(`${this.myAppUrl}${myApiUrl}${id}`, notificacion);
  }


}