import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-so-attachment',
  templateUrl: './so-attachment.component.html',
  styleUrls: ['./so-attachment.component.scss'],
})
export class SoAttachmentComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    console.log(this.router.url)
  }

}
