import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatersService } from 'src/app/services/maters.service';
import { EditarMatersComponent } from 'src/app/modals/editar-maters/editar-maters.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
declare var $:any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{
  public editar: boolean = false;
  public maters:any = {};
  public idMaters: number = 0;
  public dialog: MatDialog;
  public errors:any ={};



  constructor(
    private location: Location,
    private matersService: MatersService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
  
    
  ){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.maters = this.matersService.esquemaMateria();
  }

  public registrar(){
   
    //Validar
    this.errors = [];

    this.errors = this.matersService.validarMateria(this.maters,false);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.matersService.registrarMateria(this.maters).subscribe(
      (Response)=>{
        alert("Materia registrada");
        console.log("materia registrada: ", Response);
        this.router.navigate(["/home"]);
      }, (error)=>{
        alert("no se pudo registrar");
      }
      )
    
    }

  public regresar(){
    this.location.back();
  }

  public actualizar(){
    const dialogRef = this.dialog.open(EditarMatersComponent,{
      data: this.maters,
      height: '268px',
      width: ' 328px',

    })

    dialogRef.afterClosed().subscribe(result=>{
      if(result.isDelete){
        console.log("Materia actiulizada")

        this.router.navigate(["lista-materias"])
      }else{
        console.log("no se actualizo ")
      }
    })
  }

}
