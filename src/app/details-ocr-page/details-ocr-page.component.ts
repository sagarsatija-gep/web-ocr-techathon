import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { DetailsOcrService } from './details-ocr.service';
import {  Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-ocr-page',
  templateUrl: './details-ocr-page.component.html',
  styleUrls: ['./details-ocr-page.component.css']
})
export class DetailsOcrPageComponent implements OnInit,AfterViewInit {
  url;
  imageUrl;
  InvoiceId:'100';
  gridColumnApi;
  private gridApi;
  subTotal;
  Total;
  Tax;
  val="";
  data;
  constructor(private route: Router,private apiservice:DetailsOcrService,private modalService: NgbModal) { }

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
      this.imageUrl='http://localhost:5000/'+res[0]['fileUrl']
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
  let id=this.data[0]['ocrDocumentId']
  let updateValue={'ocrDocumentId':id,
'statusId':5}
this.open();
  this.apiservice.updateStatus(updateValue).subscribe(((data: {}) => {
    console.log("status updated")
  }))
  this.apiservice.updateEmployee(JSON.stringify(this.data[0])).subscribe((data: {}) => {
   // this.route.navigate(['/dashboard'])
  })
}
open() {
  const modalRef = this.modalService.open(NgbdModalContent);
  modalRef.componentInstance.name = 'World';
}
onNewInvoiceNumber(InvoiceId){
  this.apiservice.getInvoice(InvoiceId).subscribe(res=>{
    // this.data=res;
    // this.rowData=res[0]['lineDetail']
    // this.val=res[0]['invoiceNo']
    // this.subTotal=res[0]['invoiceSubTotal'];
    // this.Tax=res[0]['invoiceTax']
    // this.Total=res[0]['invoiceTotal']
    console.log(res[0]['_id'])
    //this.route.navigate([`/details-ocr/${res[0]['_id']}`]);
    this.redirectTo(`/details-ocr/${res[0]['_id']}`);
  });     

}
redirectTo(uri:string){
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.route.navigate([uri]));
}

// rowData = [
//     { lineno:"1", itemno: 'Celica',itemdesc:"qwerty",qty:12, price: 35000 ,total:2300},
//     { lineno:"2", itemno: 'Cica',itemdesc:"qty",qty:10, price: 40000 ,total:2900},
//     { lineno:"3", itemno: 'Cica',itemdesc:"qty",qty:13, price: 35000 ,total:2800},

//     // { make: 'Ford', model: 'Mondeo', price: 32000 },
//     // { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];

}
@Component({
  selector: 'ngbd-modal-content',
  template: `<div class="modal-content" style ="
  flex-direction: column;
  display:flex;
  position: fixed;
  left: 600px;
  top: 200px;   
  width:400px;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;">
  <div class="modal-header" style= "display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(.3rem - 1px);
  border-top-right-radius: calc(.3rem - 1px);" >
      <h4 class="modal-title">Reciept is Finalized</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-footer" style="display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: .75rem;
    border-top: 1px solid #dee2e6;
    border-bottom-right-radius: calc(.3rem - 1px);
    border-bottom-left-radius: calc(.3rem - 1px);">
      <button type="button" class="btn btn-outline-dark" (click)="onOkay()">Okay</button>
    </div></div>
    
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal,private route:Router) {}
  onOkay(){
    this.activeModal.close('Close click')
    this.route.navigate(['/dashboard'])
  }
}

