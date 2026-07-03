import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private currentUser: Usuario | null = null;

  constructor(private http: HttpClient) {
    // Recupera usuário do localStorage ao iniciar
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  login(nome: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { nome, senha });
  }

  setUser(user: Usuario): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Usuario | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}