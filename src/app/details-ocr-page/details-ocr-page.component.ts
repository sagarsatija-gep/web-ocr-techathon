import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-ocr-page',
  templateUrl: './details-ocr-page.component.html',
  styleUrls: ['./details-ocr-page.component.css']
})
export class DetailsOcrPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];

}
