import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem, FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { DashboardPageService } from './dashboard-page.service';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import * as moment from 'moment';
import { of } from 'rxjs';  
import { catchError } from 'rxjs/operators'; 

const uri = 'http://localhost:4000/api/upload';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
// var uo: FileUploaderOptions = {};
// uo.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' } ]
export class DashboardPageComponent implements OnInit{
  
  public uploader:FileUploader = new FileUploader({url:uri,
    headers: [{
      name:'Content-Type',
      value: 'multipart/form-data'
    }],
    itemAlias: 'file',
    allowedMimeType:[
      "image/jpeg", "image/png", "application/pdf"
    ]});

    // attachmentList:any = [];
    // userId;
    // userName;

   //file;
  //  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
    constructor(private route: Router,
      private _dashboardService:DashboardPageService,
      
      private http : HttpClient){
        
    }

  ngOnInit(): void {

    this.uploader.uploadAll();
        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {  if (!fileItem.file.type)  fileItem.file.type = 'multipart/form-data'; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response,headers);
         //alert('Your file has been uploaded successfully');
    };
 
    // this.uploader.uploadAll();
    //     this.uploader.onAfterAddingFile = (file) => { file.formData =file._file; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('FileUpload:uploaded successfully:', item, status, response);
    //      //alert('Your file has been uploaded successfully');
    // };
    this._dashboardService.getOcrAll().subscribe(res=>{

      this.rowDataAll=res;
      for(let i=0;i<res.length;i++){
      if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
        this.rowDataAll[i].uploadedBy="John Smith";
      }}
      //console.log(this.rowDataAll)
      // for(let i=11;i<res.length;i++){
      //   if(res[i].documenDetail.invoiceNo!=''){
      //     this.rowDataAll[i].documenDetail.invoiceNo=res[i].documenDetail.invoiceNo;
      //   }}
      //console.log(res);
      
    });
    this._dashboardService.getOcrProcessed(4).subscribe(res=>{
      this.rowDataProcessed=res;
      for(let i=0;i<res.length;i++){
        if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
          this.rowDataAll[i].uploadedBy="John Smith";
        }}
      //console.log(res);
    });
    this._dashboardService.getOcrUnProcessed(3).subscribe(res=>{
      this.rowDataUnProcessed=res;
      //console.log(res);
    });
    this._dashboardService.getOcrFinalized(5).subscribe(res=>{
      this.rowDataFinal=res;
      //console.log(res);
    });
    this._dashboardService.getOcrInprogress(2).subscribe(res=>{
      this.rowDataInprogress=res;
      //console.log(res);
    });
    
  }
//   uploadFile(file) {  
//     const formData = new FormData();  
//     formData.append('file', file.data);  
//     file.inProgress = true;  
//     this._dashboardService.upload(file.data).pipe(  
//       map(event => {  
//         switch (event.type) {  
//           case HttpEventType.UploadProgress:  
//             file.progress = Math.round(event.loaded * 100 / event.total);  
//             break;  
//           case HttpEventType.Response:  
//             return event;  
//         }  
//       }),  
//       catchError((error: HttpErrorResponse) => {  
//         file.inProgress = false;  
//         return of(`${file.data.name} upload failed.`);  
//       })).subscribe((event: any) => {  
//         if (typeof (event) === 'object') {  
//           console.log(event.body);  
//         }  
//       });  
//   }
//   private uploadFiles() {  
//     this.fileUpload.nativeElement.value = '';  
//     this.files.forEach(file => {  
//       this.uploadFile(file);  
//     });  
// }
// onClick() {  
//   const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
//   for (let index = 0; index < fileUpload.files.length; index++)  
//   {  
//    const file = fileUpload.files[index];  
//    this.files.push({ data: file, inProgress: false, progress: 0});  
//   }  
//     this.uploadFiles();  
//   };  
//   fileUpload.click();  
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
      rowSelection:'single',
      width:300,
      resizable:true,
      headerTooltip:'FileName',
      enableTooltip : true,
      cellRenderer: (invNum) => 
              `<a href="/details-ocr/${invNum.data.invoiceDocumentId}" >${invNum.value}</a>` 
      
  },
  { headerName:'InvoiceNo',
      field: 'documenDetail.invoiceNo',
    width:300 },
 
    { headerName:'UploadedBy',
      field: 'uploadedBy',
    width:300 },
    { headerName:'UploadedDate',
      field: 'uploadedDate',
      width:300,
      valueFormatter: function (params){
       return moment (params.value).format ('MM/DD/YYYY HH:mm');
      }}
      //invoiceDocumentId
];
rowDataAll:any;
columnDefsInprogress = [
  { headerName:'FileName',
    field: 'fileName' ,
    rowSelection:'single',
    width:300,
    resizable:true,
      headerTooltip:'FileName',
      enableTooltip : true,
      cellRenderer: (invNum) => 
              `<a href="/details-ocr/${invNum.data.invoiceDocumentId}" >${invNum.value}</a>` 
},

  { headerName:'UploadedBy',
    field: 'uploadedBy',
    width:300 },
  { headerName:'UploadedDate',
    field: 'uploadedDate',
    width:300,
    valueFormatter: function (params){
      return moment (params.value).format ('MM/DD/YYYY HH:mm');
     }}//invoiceDocumentId
];
rowDataInprogress:any;
columnDefsFinal = [
  { headerName:'FileName',
    field: 'fileName' ,
    rowSelection:'single',
    width:300,
    resizable:true,
      headerTooltip:'FileName',
      enableTooltip : true,
      cellRenderer: (invNum) => 
              `<a href="/details-ocr/${invNum.data.invoiceDocumentId}" >${invNum.value}</a>` 
},

  { headerName:'UploadedBy',
    field: 'uploadedBy' ,
    width:300},
  { headerName:'UploadedDate',
    field: 'uploadedDate',
    width:300,
    valueFormatter: function (params){
      return moment (params.value).format ('MM/DD/YYYY HH:mm');
     }}//invoiceDocumentId
];
rowDataFinal:any;
columnDefsProcessed = [
  { headerName:'FileName',
  field: 'fileName' ,
  rowSelection:'single',
  width:300,
  resizable:true,
      headerTooltip:'FileName',
      enableTooltip : true,
      cellRenderer: (invNum) => 
              `<a href="/details-ocr/${invNum.data.invoiceDocumentId}" >${invNum.value}</a>` 
},

{ headerName:'UploadedBy',
  field: 'uploadedBy' ,
  width:300},
{ headerName:'UploadedDate',
  field: 'uploadedDate',
  width:300,
  valueFormatter: function (params){
    return moment (params.value).format ('MM/DD/YYYY HH:mm');
   }}
];

rowDataProcessed :any;
columnDefsUnProcessed = [
  { headerName:'FileName',
      field: 'fileName' ,
      rowSelection:'single',
      width:300,
      resizable:true,
      headerTooltip:'FileName',
      enableTooltip : true,
      cellRenderer: (invNum) => 
              `<a href="/details-ocr/${invNum.data.invoiceDocumentId}" >${invNum.value}</a>` 
  },
 
    { headerName:'UploadedBy',
      field: 'uploadedBy' ,
      width:300},
    { headerName:'UploadedDate',
      field: 'uploadedDate',
      width:300,
      valueFormatter: function (params){
        return moment (params.value).format ('MM/DD/YYYY HH:mm');
       }}
  
];
onSelectionChanged(event){
  console.log(event)
}

rowDataUnProcessed :any;
}

