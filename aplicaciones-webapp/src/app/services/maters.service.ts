import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MatersService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }



  public esquemaMateria() {

    return {
      'nrc': '',
      'materia': '',
      'section': '',
      'days' : '',
      'hour_inicial': '',
      'salon_final': '',
      'proed' : ''
    }
    
  }

  
  //materias
  
  public validarMateria(data:any, editar : boolean){
    console.log("VALIDANDO MATERIA...", data);
    let error:any =[];

   
    if (!this.validatorService.required(data["nrc"])) {
          error["nrc"] = this.errorService.required;      
    }else if(!this.validatorService.numeric(data["nrc"])){
      alert("El formato es solo números");
    }

    if (!this.validatorService.required(data["materia"])) {
      error["materia"] = this.errorService.required;      
    }

    if (!this.validatorService.required(data["section"])) {
      error["section"] = this.errorService.required;      
    }
    if (!this.validatorService.required(data["days"])) {
      error["days"] = this.errorService.required;      
    }
    if (!this.validatorService.required(data["hour_inicial"])) {
      error["hour_inicial"] = this.errorService.required; 
    }
    if (!this.validatorService.required(data["hour_final"])) {
      error["hour_final"] = this.errorService.required; 
    }

    if(!this.validatorService.required(data["salon"])){
      error["salon"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["proed"])){
      error["proed"] = this.errorService.required;
    }
    return error;
  }
  public registrarMateria (data: any): Observable <any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});    
    return this.http.post<any>(`${environment.url_api}/maters/`,data,{headers:headers});
  }

  public obtenerListaMaters (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-maters/`, {headers:headers});
  }

  public getMatersByID(idMaters: Number){
    return this.http.get<any>(`${environment.url_api}/maters/?id=${idMaters}`,httpOptions); 
  }

  public editarMateria (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/maters-edit/`, data, {headers:headers});
  }

  //Eliminar usuario
  public eliminarMateria(idMaters: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/maters-edit/?id=${idMaters}`,{headers:headers});
  }
}
