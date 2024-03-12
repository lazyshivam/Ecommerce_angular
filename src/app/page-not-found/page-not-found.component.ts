import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{
  currentUrl: string='';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
