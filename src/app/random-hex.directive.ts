import {Directive, ElementRef, Renderer, Input, OnInit} from '@angular/core'

@Directive({
  selector: '[appRandomHex]'
})
export class RandomHexDirective implements OnInit {
  @Input() appRandomHex: string;
  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  getColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }
  updateColor(color = this.getColor()) {
    console.log(this.appRandomHex);
    this.renderer.setElementStyle(this.element.nativeElement, this.appRandomHex || "color",  color);
  }
  ngOnInit(){
    this.updateColor();
  }
}
