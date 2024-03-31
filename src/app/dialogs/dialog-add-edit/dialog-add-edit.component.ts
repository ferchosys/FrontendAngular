import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Tipo } from '../../interfaces/tipo';
import { Categoria } from '../../interfaces/categoria';
import { TipoService } from '../../services/tipo.service';
import { CategoriaService } from '../../services/categoria.service';

export const MY_DATE_FORMATS = {

  parse:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }

}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.scss',
  providers:[

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit {

  formCategoria:FormGroup;
  tituloAccion: string="Nueva";
  botonAccion:string="Guardar";
  listaTipos: Tipo[] =[];

  constructor(
    private dialogoReferencia:MatDialogRef<DialogAddEditComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _tipoService: TipoService,
    private _categoriaService: CategoriaService
  ){

    this.formCategoria = this.fb.group({
      nombre:['',Validators.required],
      observacion:[''],
      fecha:[Date],
      tipo:['',Validators.required]
    })

    this._tipoService.getList().subscribe({
      next:(data)=>{
        console.log(data);
        this.listaTipos = data;
      },error:(e)=>{}
    });


  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }


  addEditCategoria(){

    const modelo:Categoria={
      catId:0,
      catMon:this.formCategoria.value.nombre,
      catObs:this.formCategoria.value.observacion,
      catFec:this.formCategoria.value.fecha,
      catTipo:this.formCategoria.value.tipo
      
    }
    
    this._categoriaService.add(modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("Empleado fue creado","Listo");
        this.dialogoReferencia.close("creado");
      },error:(e)=>{
        this.mostrarAlerta("No se pudo crear","Error");
      }
    })
    console.log(this.formCategoria)
    console.log(this.formCategoria.value)
  }


  ngOnInit(): void {
    
  }

}
