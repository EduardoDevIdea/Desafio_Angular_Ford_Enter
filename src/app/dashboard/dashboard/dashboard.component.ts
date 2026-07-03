import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Veiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-dashboard',
   standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  vinBusca: string = '';
  detalhesVeiculo: any = null;
  erroBusca: string | null = null;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles = response.vehicles;
        // Seleciona o primeiro veículo automaticamente, se houver
        if (this.vehicles.length > 0) {
          this.selectedVehicle = this.vehicles[0];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
      }
    });
  }

  onVehicleSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const id = parseInt(select.value, 10);
    const found = this.vehicles.find(v => v.id === id);
    this.selectedVehicle = found || null;
    // Limpa os dados da tabela ao trocar de veículo
    this.detalhesVeiculo = null;
    this.erroBusca = null;
  }

  buscarDadosVeiculo(): void {
    if (!this.vinBusca.trim()) {
      this.erroBusca = 'Digite um código VIN válido.';
      return;
    }

    this.vehicleService.getVehicleData(this.vinBusca.trim()).subscribe({
      next: (data) => {
        this.detalhesVeiculo = data;
        this.erroBusca = null;
      },
      error: (err) => {
        this.detalhesVeiculo = null;
        if (err.status === 400) {
          this.erroBusca = 'Código VIN não encontrado.';
        } else {
          this.erroBusca = 'Erro ao buscar dados do veículo.';
        }
        console.error(err);
      }
    });
  }
}
