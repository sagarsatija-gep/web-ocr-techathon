import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { DashboardPageService } from './dashboard-page.service';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import * as moment from 'moment';
import { RestApiService } from '../shared/rest-api.service';

const uri = 'http://localhost:4000/api/upload';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
// var uo: FileUploaderOptions = {};
// uo.headers = [{ name: 'x-ms-blob-type', value : 'BlockBlob' } ]
export class DashboardPageComponent implements OnInit{
  userId;
  public uploader:FileUploader = new FileUploader({url:uri,
    itemAlias: 'file',
    // headers: [{
    //   name:'Content-Type',
    //   value: 'multipart/form-data'
    // }]
  });
    // headers: {
    //   'Content-Type':'multipart/form-data'
    // }


    attachmentList:any = [];
   //file;
    
    constructor(private route: Router,
      private _dashboardService:DashboardPageService,
      private service:RestApiService,
      private http : HttpClient){

        // this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
        //     //this.attachmentList.push(JSON.parse(response));
        //     console.log(JSON.parse(response));
        // }
        
    }
    //multipart/form-data

//     public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
//   ngOnInit() {
//     this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
//     this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
//          console.log('FileUpload:uploaded successfully:', item, status, response);
//          alert('Your file has been uploaded successfully');
//     };
//  }
  ngOnInit(): void {
    // this.http.get(`http://localhost:5000/api/ocr`).subscribe(res=>{
    //   this.rowDataAll=res;
    //   console.log(res);
    // });
   this.userId=this.service.getUserType()
   console.log(this.userId)
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    debugger;
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      debugger;
      console.log(headers)
         console.log('FileUpload:uploaded successfully:', item, status, response,headers);
        // alert('Your file has been uploaded successfully');
    };
 
    // this.uploader.uploadAll();
    //     this.uploader.onAfterAddingFile = (file) => { file.formData =file._file; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //      console.log('FileUpload:uploaded successfully:', item, status, response);
    //      //alert('Your file has been uploaded successfully');
    // };
    this._dashboardService.getOcrAll().subscribe(res=>{
      this.rowDataAll=res;
      console.log(res);
    });
    this._dashboardService.getOcrProcessed(3).subscribe(res=>{
      this.rowDataProcessed=res;
      console.log(res);
    });
    this._dashboardService.getOcrUnProcessed(4).subscribe(res=>{
      this.rowDataUnProcessed=res;
      console.log(res);
    });
    this._dashboardService.getOcrFinalized(5).subscribe(res=>{
      this.rowDataFinal=res;
      console.log(res);
    });
    this._dashboardService.getOcrInprogress(2).subscribe(res=>{
      this.rowDataInprogress=res;
      console.log(res);
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
      width:300
  },
 
    { headerName:'UploadedBy',
      field: 'uploadedBy',
    width:300 },
    { headerName:'UploadedDate',
      field: 'uploadedDate',
      width:300,
      valueFormatter: function (params){
       return moment (params.value).format ('MM/DD/YYYY');
      }}
      //invoiceDocumentId
];
rowDataAll:any;
columnDefsInprogress = [
  { headerName:'FileName',
    field: 'fileName' ,
    rowSelection:'single',
    width:300
},

  { headerName:'UploadedBy',
    field: 'uploadedBy',
    width:300 },
  { headerName:'UploadedDate',
    field: 'uploadedDate',
    width:300,
    valueFormatter: function (params){
      return moment (params.value).format ('MM/DD/YYYY');
     }}//invoiceDocumentId
];
rowDataInprogress:any;
columnDefsFinal = [
  { headerName:'FileName',
    field: 'fileName' ,
    rowSelection:'single',
    width:300
},

  { headerName:'UploadedBy',
    field: 'uploadedBy' ,
    width:300},
  { headerName:'UploadedDate',
    field: 'uploadedDate',
    width:300,
    valueFormatter: function (params){
      return moment (params.value).format ('MM/DD/YYYY');
     }}//invoiceDocumentId
];
rowDataFinal:any;
columnDefsProcessed = [
  { headerName:'FileName',
  field: 'fileName' ,
  rowSelection:'single',
  width:300
},

{ headerName:'UploadedBy',
  field: 'uploadedBy' ,
  width:300},
{ headerName:'UploadedDate',
  field: 'uploadedDate',
  width:300,
  valueFormatter: function (params){
    return moment (params.value).format ('MM/DD/YYYY');
   }}
];

rowDataProcessed :any;
columnDefsUnProcessed = [
  { headerName:'FileName',
      field: 'fileName' ,
      rowSelection:'single',
      width:300
  },
 
    { headerName:'UploadedBy',
      field: 'uploadedBy' ,
      width:300},
    { headerName:'UploadedDate',
      field: 'uploadedDate',
      width:300,
      valueFormatter: function (params){
        return moment (params.value).format ('MM/DD/YYYY');
       }}
  
];
onSelectionChanged(event){
  console.log(event)
}

rowDataUnProcessed :any;
}

