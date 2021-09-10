import { Component, OnInit } from '@angular/core';
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public year : number;
  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear() + 1;
  }

  downloadPdf(pdfUrl: string, pdfName: string ) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }
}
