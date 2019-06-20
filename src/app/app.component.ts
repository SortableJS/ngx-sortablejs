import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  navbarCollapsed = true;

  get showTestCases() {
    return localStorage.getItem('showTestCases') === 'true';
  }

}
