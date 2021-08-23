import { Directive, ElementRef, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
@Directive({
  selector: '[MyDirective]'
})
export class MyDirectiveDirective {
  @Output() clicked = new EventEmitter();
  constructor() { }

 @HostListener('click') me(eventData: Event) {
    event.preventDefault();
    this.clicked.emit();
  }
}