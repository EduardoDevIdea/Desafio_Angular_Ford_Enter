import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeiculosAPI, Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3001';  // URL da sua API

  constructor(private http: HttpClient) { }

  // Busca a lista de veículos
  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`);
  }

  // Busca os dados detalhados de um veículo pelo VIN
  getVehicleData(vin: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicleData`, { vin });
  }
}