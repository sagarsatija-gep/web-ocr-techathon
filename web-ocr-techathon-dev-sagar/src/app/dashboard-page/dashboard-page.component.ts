import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
// import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
// import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
// import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent {

  columnDefsAll = [
    { headerName:'invoiceNo',
      field: 'invoiceNo' },

    { field: 'userName' },
    { field: 'status'}
];

rowDataAll = [
    { invoiceNo:1 , userName: 'Celica', status: 'processed' },
    { invoiceNo: 2, userName: 'Mondeo', status: 'unprocessed' },
    { invoiceNo: 3, userName: 'Boxter', status: 'processed' }
];
//Invoicedate	CustomerNo	CustomerName	Customer Address	ShipTo	ShipVia	InvoiceSubTotal	InvoiceTAX	INvoiceDiscount	InvoiceTotal
columnDefsProcessed = [
  { field: 'invoiceNo' },
  { field: 'userName' },
  { field: 'status'},
  { field: 'invoiceDate' },
  { field: 'customerNo' },
  { field: 'customerName' },
  { field: 'customerAddress' },
  { field: 'shipTo' },
  { field: 'shipVia' },
  { field: 'invoiceSubTotal' },
  { field: 'invoiceTAX' },
  { field: 'iNvoiceDiscount' },
  { field: 'invoiceTotal' },
  
];

rowDataProcessed = [
  { invoiceNo:1 , userName: 'Celica', status: 'processed' },
  { invoiceNo: 2, userName: 'Mondeo', status: 'unprocessed' },
  { invoiceNo: 3, userName: 'Boxter', status: 'processed' }
];
columnDefsUnProcessed = [
  { field: 'invoiceNo' },
  { field: 'userName' },
  { field: 'status'},
  { field: 'invoiceDate' },
  { field: 'customerNo' },
  { field: 'customerName' },
  { field: 'customerAddress' },
  { field: 'shipTo' },
  { field: 'shipVia' },
  { field: 'invoiceSubTotal' },
  { field: 'invoiceTAX' },
  { field: 'iNvoiceDiscount' },
  { field: 'invoiceTotal' },
  
];

rowDataUnProcessed = [
  { invoiceNo:1 , userName: 'Celica', status: 'processed' },
  { invoiceNo: 2, userName: 'Mondeo', status: 'unprocessed' },
  { invoiceNo: 3, userName: 'Boxter', status: 'processed' }
];
}

// displayedColumns = ['position', 'firstName', 'lastName', 'email'];
//   // dataSource = new MatTableDataSource(ELEMENT_DATA);
//   invoiceCol=['invoiceNo','userName','status'];
//   dataSource = new MatTableDataSource(InvoiceDetails);


// export interface Element {
//   position: number;
//   firstName: string;
//   lastName: string;
//   email: string;
// }
// export interface Details {
//   invoiceNo: number;
//   userName: string;
//   status: string;
// }

// const ELEMENT_DATA: Element[] = [
//   {position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
//   {position: 1, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
//   {position: 1, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
//   {position: 1, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
//   {position: 1, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'}
// ];
// const InvoiceDetails: Details[] = [
//   {invoiceNo: 1, userName: 'John', status: 'processed'},
//   {invoiceNo: 2, userName: 'Mike', status: 'processed'},
//   {invoiceNo: 3, userName: 'Ricky', status: 'unprocessed'},
//   {invoiceNo: 4, userName: 'Martin', status: 'unprocessed'},
//   {invoiceNo: 5, userName: 'Tom', status: 'processed'}
// ];
