import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { name: 'Teclado Gamer', description: 'Teclado mecânico retroiluminado', price: 89.99, quantity: 50 },
  { name: 'Mouse Óptico', description: 'Mouse de alta precisão', price: 19.99, quantity: 100 },
  { name: 'Monitor LED', description: 'Monitor Full HD de 24 polegadas', price: 199.99, quantity: 30 },
  { name: 'Notebook', description: 'Notebook com processador i5 e 8 GB de RAM', price: 599.99, quantity: 20 },
  { name: 'Impressora Laser', description: 'Impressora a laser de alta velocidade', price: 149.99, quantity: 10 },
  { name: 'Webcam HD', description: 'Câmera para videoconferências', price: 29.99, quantity: 50 },
  { name: 'Roteador Wi-Fi', description: 'Roteador dual-band de alta velocidade', price: 49.99, quantity: 40 },
  { name: 'SSD 512GB', description: 'Unidade de estado sólido de alta capacidade', price: 79.99, quantity: 15 },
  { name: 'Caixa de Som Bluetooth', description: 'Caixa de som portátil com Bluetooth', price: 39.99, quantity: 25 },
  { name: 'Teclado Gamer', description: 'Teclado mecânico retroiluminado', price: 89.99, quantity: 50 },
  { name: 'Mouse Óptico', description: 'Mouse de alta precisão', price: 19.99, quantity: 100 },
  { name: 'Monitor LED', description: 'Monitor Full HD de 24 polegadas', price: 199.99, quantity: 30 },
  { name: 'Notebook', description: 'Notebook com processador i5 e 8 GB de RAM', price: 599.99, quantity: 20 },
  { name: 'Impressora Laser', description: 'Impressora a laser de alta velocidade', price: 149.99, quantity: 10 },
  { name: 'Webcam HD', description: 'Câmera para videoconferências', price: 29.99, quantity: 50 },
  { name: 'Roteador Wi-Fi', description: 'Roteador dual-band de alta velocidade', price: 49.99, quantity: 40 },
  { name: 'SSD 512GB', description: 'Unidade de estado sólido de alta capacidade', price: 79.99, quantity: 15 },
  { name: 'Caixa de Som Bluetooth', description: 'Caixa de som portátil com Bluetooth', price: 39.99, quantity: 25 },
];

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.css']
})
export class ModalAddProductComponent implements OnInit {
  displayedColumns: string[] = ['name','description','price','quantity'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ModalAddProductComponent>
  ){ 
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
