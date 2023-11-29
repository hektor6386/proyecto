import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from 'src/app/services/facade.service';
import { MatersService } from 'src/app/services/maters.service';
import { Location } from '@angular/common';
import { EliminarMatersComponent } from 'src/app/modals/eliminar-maters/eliminar-maters.component';



@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrl: './lista-materias.component.scss'
})
export class ListaMateriasComponent implements OnInit {
  public token : string = "";
  public lista_materias: any[] = [];

  displayedColumns: string[] = ['nrc', 'materia', 'section', 'days', 'hour_inicial', 'hour_final', 'salon', 'proed', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private location: Location,
    private facadeService: FacadeService,
    private matersService: MatersService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Mandar a ejecutar la función
    this.obtenerMaterias();

    //Para paginador
    this.initPaginator();


  }

  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  public regresar(){
    this.location.back();
  }

  public goEditar(idMaters: number){
    this.router.navigate(["regist/"+idMaters]);

  }


  


  public obtenerMaterias(){
    this.matersService.obtenerListaMaters().subscribe(
      (response)=>{
        this.lista_materias = response;
        console.log("Lista maters: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          //Agregar datos 
          this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias")
      }
    )
  }
  
   //Función para eliminar
   public delete(idMaters: number){
    console.log("Maters:", idMaters);
    const dialogRef = this.dialog.open(EliminarMatersComponent,{
      data: {id: idMaters}, //Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminado ");
        console.log("No se eliminó la materia");
        //alert("No se eliminó el usuario");
      }
    });
  }


}

export interface DatosMateria {
  id: number,
  nrc: number,
  maters: string,
  section: number,
  days: String,
  hour_inicial: number,
  hour_final: number,
  salon: number,
  proed: string,
}
