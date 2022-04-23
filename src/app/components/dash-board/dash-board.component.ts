import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sucursales } from 'src/app/models/sucursales.model';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';  


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  providers: [SucursalesService,UsuarioService,ProductosSucursalService]

})

export class DashBoardComponent implements OnInit {
  public token;
  public identidad;

  public coloresDinamicos = ['red','blue','green','yellow','orange']
  public random = Math.floor(Math.random()*this.coloresDinamicos.length)


  //EMPRESAS
  public sucursalesModelGet: Sucursales ;
  public sucursalModelId: Sucursales ;

  public sucursalesModelPost: Sucursales ;


  constructor(    public _productoSucursalService: ProductosSucursalService,
    public _activatedRoute: ActivatedRoute, private _sucursalesService: SucursalesService, public _usuarioService: UsuarioService) {
    this.sucursalesModelPost = new Sucursales('','','','','')
    this.sucursalModelId = new Sucursales('','','','','')

    this.token = this._usuarioService.obtenerToken()
    this.identidad = this._usuarioService.obtenerIdentidad();

  }

  public idEmpresa;
  public id;

  ngOnInit(): void {
    console.log(this.identidad)
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{

      console.log(dataRuta.get('idEmpresa'));
      this.idEmpresa = dataRuta.get('idEmpresa')

      this.id = dataRuta.get('id')
      this.getSucursalId('id')

      this.getSucursales ()
    })
  }

  getSucursales (){
    console.log('el id de la empresa es:' + this.idEmpresa)
      this._sucursalesService.ObtenerSucursales (this.idEmpresa, this.token).subscribe(
        (response) => {
          this.sucursalesModelGet = response.Sucursales;
          console.log(response + 'hola');
 
        },
        (error)=>{
          console.log(<any>error)
        }
     )
    
    }

    postSucursal(){
      this._sucursalesService.AgregarSucursales(this.sucursalesModelPost, this.token= this._usuarioService.obtenerToken()).subscribe(
        (response)=>{
          console.log(response);
          this.getSucursales()
          Swal.fire(
            'Se agrego correctamente su sucursal!',
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
      )
    }

    deleteSucursales(idSucursal){
      this._sucursalesService.EliminarUsuarios(idSucursal, this.token = this._usuarioService.obtenerToken()).subscribe(
        (response)=>{
          console.log(response);
          this.getSucursales();
          Swal.fire(
            'Se elimino correctamente su sucursal!',
            '',
            'success'
          )
        },
        (error)=>{
          console.log(<any>error);

        }
      )
    }

    getSucursalId(idSucursal){
      this._productoSucursalService.ObtenerSucursalId(idSucursal, this.token).subscribe(
        (response) => {
          this.sucursalModelId = response.Sucursal;
          console.log(response);
          console.log(this.sucursalModelId);
        },
        (error)=>{
          console.log(<any>error)
        }
      )
    }


}
