import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { DashboardPageService } from './dashboard-page.service';

const uri = 'http://localhost:4200/file/upload';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements OnInit{
  uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];

    constructor(private route: Router,
      private _dashboardService:DashboardPageService,
      private http : HttpClient){

        this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
    }
  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/ocr').subscribe(res=>{
      this.rowDataAll=res;
      console.log(res);
    });
    
  }
//   fileChange(event) {
//     let fileList: FileList = event.target.files;
//     if(fileList.length > 0) {
//         let file: File = fileList[0];
//         let formData:FormData = new FormData();
//         formData.append('uploadFile', file, file.name);
//         // let headers = new Headers();
//         // /** In Angular 5, including the header Content-Type can invalidate your request */
//         // headers.append('Content-Type', 'multipart/form-data');
//         // headers.append('Accept', 'application/json');
//         // let options = new RequestOptions({ headers: headers });
//         this.http.post(`${this.apiEndPoint}`, formData, options)
//             .map(res => res.json())
//             .catch(error => Observable.throw(error))
//             .subscribe(
//                 data => console.log('success'),
//                 error => console.log(error)
//             )
//     }
// }
  
  // selectedFile: File

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  // onUpload() {
  //   // upload code goes here
  // }
  onRowClicked(event: any) 
  { 
    let id=event.data.invoiceDocumentId;
    this.route.navigate([`/details-ocr/${id}`])
    console.log(id);
    console.log('row', event); 
   }

  columnDefsAll = [
    { headerName:'FileName',
      field: 'fileName' ,
      rowSelection:'single'
  },
 
    { headerName:'UploadedBy',
      field: 'uploadedBy' },
    { headerName:'UploadedDate',
      field: 'uploadedDate'}//invoiceDocumentId
];
rowDataAll:any;
// rowDataAll = [
//     { invoiceNo:1 , userName: 'Celica', status: 'processed' },
//     { invoiceNo: 2, userName: 'Mondeo', status: 'unprocessed' },
//     { invoiceNo: 3, userName: 'Boxter', status: 'processed' }
// ];
//Invoicedate CustomerNo  CustomerName  Customer Address  ShipTo  ShipVia InvoiceSubTotal InvoiceTAX  INvoiceDiscount InvoiceTotal
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



