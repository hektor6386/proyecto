import { Component, Inject, OnInit } from '@angular/core';
import { MatersService } from 'src/app/services/maters.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-maters',
  templateUrl: './eliminar-maters.component.html',
  styleUrl: './eliminar-maters.component.scss'
})
export class EliminarMatersComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<EliminarMatersComponent>,
    public matersService: MatersService,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Id Maters: ", this.data.id);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarMateria(){
    this.matersService.eliminarMateria(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
