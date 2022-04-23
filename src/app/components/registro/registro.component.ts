import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [EmpresasService, UsuarioService]

})
export class RegistroComponent implements OnInit {
  public token;

  public usuarioModel: Empresas;
  public empresasModelPost: Empresas;
  constructor(private _empresasService: EmpresasService, private _usuarioService: UsuarioService, private _router: Router) {
    this.empresasModelPost = new Empresas('','', '', '', '', '')
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
  }
  postEmpresas() {
    this._empresasService.RegistrarEmpresas(this.empresasModelPost, this.token = this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        localStorage.setItem("identidad", JSON.stringify(response.usuario))
        console.log(response);
          this._router.navigate(['/login']);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

}
