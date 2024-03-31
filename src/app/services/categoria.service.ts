import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi = 'http://localhost:5161/categoria/lista'
  private urlGuardar = 'http://localhost:5161/categoria/guardar'
  private urlActualizar = 'http://localhost:5161/categoria/actualizar'
  private urlEliminar = 'http://localhost:5161/categoria/eliminar'
  constructor(private http: HttpClient) { }

    getList(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.urlApi);
    }

    add(modelo: Categoria):Observable<Categoria>{
      return this.http.post<Categoria>(this.urlGuardar, modelo);
    }

    update(cat_id:number,modelo: Categoria):Observable<Categoria>{
      return this.http.put<Categoria>(this.urlActualizar, modelo);
    }

    delete(cat_id:number):Observable<void>{
      return this.http.delete<void>(this.urlEliminar);
    }
}
