import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eliquor';
  constructor(public auth: AuthService) {

  }
  checkInputs(): void {
    $(".input-box input").each(function () {
      const inp = $(this);
      const val = inp.val();
      if (val.length) {
        inp.addClass("filled");
      }
      else {
        inp.removeClass("filled");
      }
    })
  }
  ngOnInit() {
    const app = this;
    this.checkInputs();
    $(document).on("change", ".input-box input", function () { app.checkInputs() });
    $(document).on("click", ".btn--removeFlavour", function(e) {
      e.preventDefault();
      const btn = $(this);
      const flavour = btn.closest('.flavour-row');
      if (confirm(`Delete flavour from the recipe?`)) {
        flavour.remove();
      }
    });
  }
}
