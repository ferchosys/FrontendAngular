import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../interfaces/tipo';



@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private urlApi = 'http://localhost:5161/tipo/lista'
 
  constructor(private http: HttpClient) { }

    getList(): Observable<Tipo[]>{
      console.log(this.http.get<Tipo[]>(this.urlApi));
      return this.http.get<Tipo[]>(this.urlApi);
    }
  
}
