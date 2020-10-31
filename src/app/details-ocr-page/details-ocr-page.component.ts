import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-ocr-page',
  templateUrl: './details-ocr-page.component.html',
  styleUrls: ['./details-ocr-page.component.css']
})
export class DetailsOcrPageComponent implements OnInit {
  url;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.url=this.route.url;
    this.url = this.url.split('/')[2];
    console.log(this.url)
  }
  columnDefs = [
    // {
    //   checkboxSelection:true,

    // },
    {
     
      headerName: 'Line Number',
      checkboxSelection:true,
      headerCheckboxSelection:true,
      field: 'lineno',
      editable: true,
    },
    {
      headerName: 'Item Number',
      field: 'itemno',
      editable: true,
    },
    {
      headerName: 'Item Description',
      field: 'itemdesc',
      editable: true,
    },
    {
      headerName: 'Quantity',
      field: 'qty',
      editable: true,
    },
    {
      headerName: 'Price',
      field: 'price',
    },
    {
      headerName: 'Line Total',
      field: 'total',
    },
];

rowData = [
    { lineno:"1", itemno: 'Celica',itemdesc:"qwerty",qty:12, price: 35000 ,total:2300},
    { lineno:"2", itemno: 'Cica',itemdesc:"qty",qty:10, price: 40000 ,total:2900},
    { lineno:"3", itemno: 'Cica',itemdesc:"qty",qty:13, price: 35000 ,total:2800},

    // { make: 'Ford', model: 'Mondeo', price: 32000 },
    // { make: 'Porsche', model: 'Boxter', price: 72000 }
];

}
