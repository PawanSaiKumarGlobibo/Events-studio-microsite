import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DynamicThemeService } from '../../dynamic-theme/dynamic-theme.service';
import { CommonModule } from '@angular/common';
import { EVENT_CONFIG_DETAILS } from '../../utils/localstorage-constants';
import { LocalstorageService } from '../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  /** Event configuration details */
  eventConfigDetails: any;

  /**
   * Constructor to inject necessary services and initialize event configuration details.
   * @param dynamicThemeService - The dynamic theme service.
   * @param elRef - The element reference.
   * @param renderer - The renderer.
   * @param router - The router service.
   */
  constructor(
    private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private localstorageService:LocalstorageService
  ) {
  }

  /** Lifecycle hook to initialize component data */
  ngOnInit(): void {
    // Retrieve event configuration details from local storage
    this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');

    if (!this.eventConfigDetails || Object.keys(this.eventConfigDetails).length === 0) {
      this.router.navigate(['/404']);
    }
    // Apply dynamic theme configuration after view initialization
    setTimeout(() => {
      this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
    }, 0);
    window.scrollTo(0,0);
  }

  /**
   * Check the currently activated tab based on the router URL.
   * @returns {Number} - The index of the currently activated tab.
   */
  checkCurrentActivatedTab(): Number {
    if (this.router.url.includes("personal-details")) {
      return 1;
    } else if (this.router.url.includes("payment")) {
      return 2;
    } else if (this.router.url.includes("confirmation")) {
      return 3;
    } else {
      this.router.navigate(['/404']);
      return 0;
    }
  }
}