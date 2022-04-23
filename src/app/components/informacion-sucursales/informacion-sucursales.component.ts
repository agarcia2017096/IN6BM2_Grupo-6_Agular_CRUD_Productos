import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresas } from 'src/app/models/empresas.model';
import { ProductoSucursal } from 'src/app/models/productoSucursal.model';
import { Sucursales } from 'src/app/models/sucursales.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-informacion-sucursales',
  templateUrl: './informacion-sucursales.component.html',
  styleUrls: ['./informacion-sucursales.component.scss'],
  providers: [ UsuarioService, SucursalesService,ProductosSucursalService,EmpresasService]

})
export class InformacionSucursalesComponent implements OnInit {
  public sucursalesModelGet: Sucursales ;

  public productoSucursalesModelGet: ProductoSucursal;


  public token
  public identidad;
  public empresaModelId: Empresas;
  public sucursalModelId: Sucursales;




  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _sucursalesService: SucursalesService,
    public _productoSucursalService: ProductosSucursalService,
    private _empresasService: EmpresasService
    ) {
      this.sucursalModelId = new Sucursales('','','','','')
      this.token = this._usuarioService.obtenerToken();
      this.identidad = this._usuarioService.obtenerIdentidad();
   }

   public idEmpresa;
   public id;
   public idSucursal;


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idEmpresa = dataRuta.get('idSucursal')
  

      this.id = dataRuta.get('id')
      this.getSucursalId(dataRuta.get('idSucursal'))
      console.log(" id sucursal "+this.idEmpresa)


      this.getSucursales (dataRuta.get('idSucursal'))
    })
  }

  getSucursales (idSucursal){

      this._productoSucursalService.ObtenerProductosSucursal (idSucursal, this.token).subscribe(
        (response) => {
          this.sucursalesModelGet = response.producto;
          console.log(response + 'hola');
 
        },
        (error)=>{
          console.log(<any>error)
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
