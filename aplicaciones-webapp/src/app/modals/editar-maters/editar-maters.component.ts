import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatersService } from 'src/app/services/maters.service';
@Component({
  selector: 'app-editar-maters',
  templateUrl: './editar-maters.component.html',
  styleUrl: './editar-maters.component.scss'
})
export class EditarMatersComponent {
  constructor(
    private dialogRef: MatDialogRef<EditarMatersComponent>,
    public matersService: MatersService,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    console.log("Id user: ", this.data.id);
    
  }
  
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  
  public editarMaters(){
    this.matersService.editarMateria(this.data).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
