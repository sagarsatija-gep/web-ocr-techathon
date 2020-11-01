import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem,  FileUploader} from 'ng2-file-upload';
import { DashboardPageService } from './dashboard-page.service';
import 'rxjs/Rx';
import * as moment from 'moment'; 
import { RestApiService } from '../shared/rest-api.service';

const uri = 'http://localhost:5000/api/upload-documents';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
// var uo: FileUploaderOptions = {};
// uo.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' } ]
export class DashboardPageComponent implements OnInit{
  userId:any;
  public uploader:FileUploader = new FileUploader({url:uri,
    headers: [{
      name:'Content-Type',
      value: 'multipart/form-data'
    }],
    itemAlias: 'file',
    allowedMimeType:[
      "image/jpeg", "image/png", "application/pdf"
    ]});

   
    constructor(private route: Router,
      private _dashboardService:DashboardPageService,
      private service:RestApiService,
      private http : HttpClient){
        
    }
   
  ngOnInit(): void {
    this.userId=this.service.getUserType()
    this.uploader.uploadAll();
        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {  if (!fileItem.file.type)  fileItem.file.type = 'multipart/form-data'; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response,headers);
        
    };
 
   
    this._dashboardService.getOcrAll().subscribe(res=>{

      this.rowDataAll=res;
      for(let i=0;i<res.length;i++){
      if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
        this.rowDataAll[i].uploadedBy="John Smith";
      }}
      for(let i=0;i<res.length;i++){
      switch(res[i].statusId){
        case 1:{
          this.rowDataAll[i].statusId="Draft";
          break;
        };
        case 2:{
          this.rowDataAll[i].statusId="InProgress";
          break;
        };
        case 3:{
          this.rowDataAll[i].statusId="UnProcessed";
          break;
        };
        case 4:{
          this.rowDataAll[i].statusId="Processed";
          break;
        };
        case 5:{
          this.rowDataAll[i].statusId="Finalized";
          break;
        };
        default:{
          this.rowDataAll[i].statusId="InProgress";
          break;
        }
      }
    }
      
      
    });
    this._dashboardService.getOcrProcessed(4).subscribe(res=>{
      this.rowDataProcessed=res;
      for(let i=0;i<res.length;i++){
        if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
          this.rowDataProcessed[i].uploadedBy="John Smith";
        }}
     
    });
    this._dashboardService.getOcrUnProcessed(3).subscribe(res=>{
      this.rowDataUnProcessed=res;
      for(let i=0;i<res.length;i++){
        if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
          this.rowDataUnProcessed[i].uploadedBy="John Smith";
        }}
        for(let i=0;i<res.length;i++){
          switch(res[i].reasonId){
            case 1:{
              this.rowDataUnProcessed[i].reasonId="Unable to detect character from document";
              break;
            };
            case 2:{
              this.rowDataUnProcessed[i].reasonId="Unable to update OCR converted document";
              break;
            };
            case 3:{
              this.rowDataUnProcessed[i].reasonId="Unable to detect document in PDF format";
              break;
            };
            default:{
              this.rowDataUnProcessed[i].statusId="Unable to detect character from document";
              break;
            }
          }
        }
     
    });
    this._dashboardService.getOcrFinalized(5).subscribe(res=>{
      this.rowDataFinal=res;
      for(let i=0;i<res.length;i++){
        if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
          this.rowDataFinal[i].uploadedBy="John Smith";
        }}
      
    });
    this._dashboardService.getOcrInprogress(2).subscribe(res=>{
      this.rowDataInprogress=res;
      for(let i=0;i<res.length;i++){
        if(res[i].uploadedBy=='5f9c4151c6f8e54c3bfd51a6'){
          this.rowDataInprogress[i].uploadedBy="John Smith";
        }}
      
    });
    
  }

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
      field: 'documentDetail.invoiceNo',
    width:300 },
    { headerName:'Status',
      field: 'statusId',
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
{ headerName:'InvoiceNo',
      field: 'documentDetail.invoiceNo',
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
{ headerName:'InvoiceNo',
      field: 'documentDetail.invoiceNo',
    width:300 },
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
{ headerName:'InvoiceNo',
      field: 'documentDetail.invoiceNo',
    width:300 },
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
  { headerName:'InvoiceNo',
  field: 'documentDetail.invoiceNo',
width:300 },
{ headerName:'Reason',
  field: 'reasonId',
width:300 },
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

