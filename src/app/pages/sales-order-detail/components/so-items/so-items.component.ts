import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-so-items',
  templateUrl: './so-items.component.html',
  styleUrls: ['./so-items.component.scss'],
})
export class SoItemsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    console.log(this.router.url)
  }

}
