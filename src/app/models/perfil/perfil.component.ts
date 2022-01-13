import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/models/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  perfil = {
    id: '',
    email: '',
    nome: '',
  };

  public showError = '';
  public loginError = false;
  
  constructor(private perfilService: PerfilService, private router: Router) {}

  ngOnInit(): void {
    const resultado = this.perfilService.getPerfil().then(data => {
      this.perfil = data[0];
    });
  }

  async onSubmit() {
    try {
      const result = await this.perfilService.setPerfil(this.perfil);
    } catch (error) {
      console.log(error);
    }
  }
}
