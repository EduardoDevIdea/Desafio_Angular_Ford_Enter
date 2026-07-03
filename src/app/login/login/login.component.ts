import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    nome: '',
    senha: ''
  };

  erro: string | null = null;
  carregando = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.erro = null;
    this.carregando = true;

    this.authService.login(this.usuario.nome, this.usuario.senha)
      .subscribe({
        next: (user) => {
          this.carregando = false;
          this.authService.setUser(user);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.carregando = false;
          if (err.status === 401 || err.status === 400) {
            this.erro = 'Usuário ou senha incorretos!';
          } else {
            this.erro = 'Falha na comunicação com o servidor.';
          }
          console.error('Erro no login:', err);
        }
      });
  }
}