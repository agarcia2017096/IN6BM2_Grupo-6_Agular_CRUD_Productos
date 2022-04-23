import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';  


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [EmpresasService, UsuarioService ]
})

export class EmpresasComponent implements OnInit {
  public token;
  public identidad;


  public coloresDinamicos = ['red','blue','green','yellow','orange']
  public random = Math.floor(Math.random()*this.coloresDinamicos.length)



  //EMPRESAS
  public empresasModelGet: Empresas ;
  public empresasModelPost:Empresas ;
  public empresaModelId: Empresas;


  constructor(private _empresasService: EmpresasService, public _usuarioService: UsuarioService) {
    this.empresasModelPost = new Empresas('','','','','','')
    this.empresaModelId = new Empresas('','','','','','');
    this.token = this._usuarioService.obtenerToken();
    this.identidad = this._usuarioService.obtenerIdentidad();

  }
  ngOnInit(): void {
    this.getEmpresas();

    console.log(this.coloresDinamicos[this.random])

  }

  getEmpresas (){
    this._empresasService.ObtenerUsuarios ().subscribe(
       (response) => {
         this.empresasModelGet = response.Empresas;
         console.log(response.Empresas);

       },
       (error)=>{
         console.log(<any>error)
       }
    )}


  postEmpresas (){
     this._empresasService.RegistrarEmpresas(this.empresasModelPost, this.token = this._usuarioService.obtenerToken()).subscribe(
         (response)=>{
          console.log(<any>response);
            this.getEmpresas()
            Swal.fire(
              'Se agrego correctamente su empresa!',
              '',
              'success'
            )
         },
         (error)=>{
            console.log(<any>error);
            Swal.fire({
              icon: 'error',
              title: error.error.mensaje,
              footer: 'Ingrese los datos de nuevo'
            })
         }
     )}

     deleteEmpresa(idEmpresa) {
      this._empresasService.EliminarUsuarios(idEmpresa,  this.token = this._usuarioService.obtenerToken()).subscribe(
        (response)=>{
          console.log(response);
          this.getEmpresas();
        },
        (error)=>{
          console.log(<any>error);
    
        }
      )
    }
    putEmpresa(){
      this._empresasService.EditarUsuarios(this.empresaModelId, this._usuarioService.obtenerToken()).subscribe(
        (response)=>{
          console.log(response);
          this.getEmpresas();
        },
        (error)=>{
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            footer: 'Ingrese los datos de nuevo'
          })
        }
      )
    }
    
    getEmpresaId(idEmpresa){
      this._empresasService.ObtenerUsuariosId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
        (response) => {
          this.empresaModelId = response.empleadoEncontrado;
          console.log(response);
          console.log(this.empresaModelId);
        },
        (error)=>{
          console.log(<any>error)
        }
      )
    }
  
}
