import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weekChart: any;
  salesChart: any;

  constructor() { }

  ngOnInit() {
    this.weekChart = new Chart('weekChart', {
      type: 'bar',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
        datasets: [{
          label: 'Quantidade de vendas',
          data: [12, 19, 3, 5, 2, 3,25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(7, 245, 65, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(7, 245, 65, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.salesChart = new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
        datasets: [{
          label: 'Valores de vendas',
          data: [1200, 1300, 400, 674, 420, 442,2500],
          backgroundColor: [
            'rgba(128, 0, 0, 0.2)',
            'rgba(0, 128, 0, 0.2)', 
            'rgba(0, 0, 128, 0.2)', 
            'rgba(128, 128, 0, 0.2)', 
            'rgba(128, 0, 128, 0.2)', 
            'rgba(0, 128, 128, 0.2)', 
            'rgba(142, 122, 192, 0.2)' 
          ],
          borderColor: [
            'rgba(128, 0, 0, 1)', 
            'rgba(0, 128, 0, 1)', 
            'rgba(0, 0, 128, 1)', 
            'rgba(128, 128, 0, 1)', 
            'rgba(128, 0, 128, 1)', 
            'rgba(0, 128, 128, 1)', 
            'rgba(142, 122, 192, 1)' 
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }
}
