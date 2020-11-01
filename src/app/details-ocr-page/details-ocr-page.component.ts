import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsOcrService } from './details-ocr.service';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-ocr-page',
  templateUrl: './details-ocr-page.component.html',
  styleUrls: ['./details-ocr-page.component.css']
})
export class DetailsOcrPageComponent implements OnInit,AfterViewInit {
  url;
  InvoiceId;
  gridColumnApi;
  private gridApi;
  subTotal;
  Total;
  Tax;
  val="";
  constructor(private route: Router,private apiservice:DetailsOcrService) { }
data;
ngAfterViewInit() {
  // ...
  this.url=this.route.url;
    this.url = this.url.split('/')[2];
    console.log(this.url)
     this.apiservice.getEmployee(this.url).subscribe(res=>{
      this.data=res;
      this.rowData=res[0]['lineDetail']
      this.val=res[0]['invoiceNo']
      this.subTotal=res[0]['invoiceSubTotal'];
      this.Tax=res[0]['invoiceTax']
      this.Total=res[0]['invoiceTotal']
      console.log(res)
    });  
}
   ngOnInit(): void {
    this.url=this.route.url;
    this.url = this.url.split('/')[2];
    console.log(this.url)
     this.apiservice.getEmployee(this.url).subscribe(res=>{
      this.data=res;
      this.rowData=res[0]['lineDetail']
      this.val=res[0]['invoiceNo']
      this.subTotal=res[0]['invoiceSubTotal'];
      this.Tax=res[0]['invoiceTax']
      this.Total=res[0]['invoiceTotal']
      console.log(res)
    });      
  }
  onGridReady(params) {
    this.gridApi = params.api;
    console.log(this.gridApi)
    this.gridColumnApi = params.columnApi;
  }
  rowData;
  columnDefs = [
    
    { 
      headerName: 'Line Number',
      checkboxSelection:true,
      headerCheckboxSelection:true,
      field: 'lineNo',
      editable: true,
    },
    {
      headerName: 'Item Number',
      field: 'itemNo',
      editable: true,
    },
    {
      headerName: 'Item Description',
      field: 'itemDescription',
      editable: true,
    },
    {
      headerName: 'Quantity',
      field: 'itemQty',
      editable: true,
    },
    {
      headerName: 'Price',
      field: 'itemUnitPrice',
    },
    {
      headerName: 'Line Total',
      field: 'itemAmount',
    },
];
onSubmit(){
  let selectedNodes = this.gridApi.getSelectedNodes();
  // console.log(selectedNodes)
  let selectedData = selectedNodes.map(node => node.data);
 // console.log(JSON.stringify(selectedData));
  this.data[0]['lineDetail']=selectedData
  console.log(JSON.stringify(this.data[0]))
  this.apiservice.updateEmployee(JSON.stringify(this.data[0])).subscribe((data: {}) => {
    this.route.navigate(['/dashboard'])
  })
}
onNewInvoiceNumber(InvoiceId){
  this.apiservice.getInvoice(InvoiceId).subscribe(res=>{
    this.data=res;
    this.rowData=res[0]['lineDetail']
    this.val=res[0]['invoiceNo']
    this.subTotal=res[0]['invoiceSubTotal'];
    this.Tax=res[0]['invoiceTax']
    this.Total=res[0]['invoiceTotal']
    console.log(res)
  });     

}

// rowData = [
//     { lineno:"1", itemno: 'Celica',itemdesc:"qwerty",qty:12, price: 35000 ,total:2300},
//     { lineno:"2", itemno: 'Cica',itemdesc:"qty",qty:10, price: 40000 ,total:2900},
//     { lineno:"3", itemno: 'Cica',itemdesc:"qty",qty:13, price: 35000 ,total:2800},

//     // { make: 'Ford', model: 'Mondeo', price: 32000 },
//     // { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];

}
