import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IhomaPage } from '../../modal/IHomepage';
import { IMG_BLOB_URL, OLD_IMG_BLOB_URL } from '../../utils/constants';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../apiservices/api.service';
import { DynamicThemeService } from '../../dynamic-theme/dynamic-theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../utilservices/shared-service/shared.service';
import { EncryptionService } from '../../utilservices/encryption-service/encryption.service';
import { EVENT_CONFIG_DETAILS, EVENT_ENCRYPTED_ID, EVENT_ID } from '../../utils/localstorage-constants';
import { LocalstorageService } from '../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  /** Event configuration details */
  eventConfigurations!: IhomaPage;

  /** URL path to fetch event details */
  pathUrlEventDetails = "/api/HompageNewAPI/homepageNew";

  /** Event ID from query parameters */
  encrypted_eventId!: string;

  OLD_IMG_BLOB_URL = OLD_IMG_BLOB_URL;
  IMG_BLOB_URL = IMG_BLOB_URL;

  isLoading = false;

  /** Explore section details */
  explore = {
    leftSide: [
      { name: '', imgPath: '', id: '' },
      { name: '', imgPath: '', id: '' },
      { name: '', imgPath: '', id: '' },
      { name: 'Register', imgPath: 'calender.png', id: 'register' },
      { name: 'Activities', imgPath: 'activities-icon.png', id: 'activities' },
      { name: '', imgPath: '', id: '' }
    ],
    rightSide: [
      { name: 'Sponsors', imgPath: 'star.png', id: 'sponsors' },
      { name: 'Organisers', imgPath: 'organisers.png', id: 'organisers' },
      { name: '', imgPath: '', id: '' },
      { name: '', imgPath: '', id: '' }
    ]
  };

  /**
   * Constructor to inject necessary services.
   * @param router - The router service.
   * @param apiService - The API service.
   * @param activatedRoute - The activated route service.
   * @param dynamicThemeService - The dynamic theme service.
   * @param elRef - The element reference.
   * @param renderer - The renderer.
   * @param sharedService - The shared service.
   */
  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private sharedService: SharedService,
    private encryptionService:EncryptionService,
    private localstorageService :LocalstorageService
  ) { }

  /** Lifecycle hook that runs after the component's view has been initialized */
  ngOnInit() {
    // Retrieve the event ID from the query parameters
    if (this.activatedRoute.snapshot.queryParamMap.get('id')) {
      this.encrypted_eventId = this.activatedRoute.snapshot.queryParamMap.get('id')!;
    } else if (this.localstorageService.getItem(EVENT_ENCRYPTED_ID)) {
      this.encrypted_eventId = this.localstorageService.getItem(EVENT_ENCRYPTED_ID)!;
    } else {
      this.router.navigate(['/404']);
    }

    // Check if eventId exists
    if (this.encrypted_eventId) {
      // Clear local storage
      this.localstorageService.clear();
      // Fetch event details
      this.getEventDetails();
    }
    window.scrollTo(0, 0);
  }

  /** Navigate to the registration page */
  openRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  /**
   * Navigate to the sponsors page.
   * @param sponsor - The sponsor details.
   */
  openSponsorsPage(sponsorId:any) {
    this.router.navigate(['/sponsors'],{queryParams:{id:this.getEncryptionId(sponsorId)}});
  }

  /**
   * Navigate to the activities page.
   * @param activity - The activity details.
   */
  openActivityPage(activityId:any) {
    this.router.navigate(['/activity'],{queryParams:{id:this.getEncryptionId(activityId)}});
  }

  getEncryptionId(id:number){
   return this.encryptionService.encrypt(id.toString())
  }

  /** Function to retrieve event details */
  getEventDetails() {
    this.isLoading = true;
    this.apiService.getData(this.pathUrlEventDetails, { eventPassword: this.encrypted_eventId }).subscribe(
      // Successful response callback
      (data: any) => {
        this.isLoading = false;
        if (!data || !data.homepage || !data.homepage.pk_id) {
          this.router.navigate(['/404']);
          return;
        }
        // Assign the retrieved data to eventConfigurations
        this.eventConfigurations = data.homepage;
        // Store event configuration details in local storage
        this.localstorageService.setItem(EVENT_CONFIG_DETAILS, JSON.stringify(this.eventConfigurations));
        this.localstorageService.setItem(EVENT_ENCRYPTED_ID, this.encrypted_eventId);
        this.localstorageService.setItem(EVENT_ID, this.eventConfigurations.pk_id.toString());

        this.sharedService.upDateThemeChanged("UPDATE_THEME");

        // Apply dynamic theme configuration
        setTimeout(() => {
          this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
        }, 0);
      },
      // Error callback
      (error: any) => {
        this.isLoading = false;
        // Log any errors that occur during the data retrieval process
        console.log(error);
      }
    );
  }

  /** Get the list of organisers */
  getOrganiserList() {
    if (!this.eventConfigurations || !this.eventConfigurations.eventOrganisers) return;
    return this.eventConfigurations.eventOrganisers.sort((a, b) => a.order - b.order);
  }

  /**
   * Scroll to the view of the element with the given ID.
   * @param id - The ID of the element to scroll to.
   */
  scrollToView(id: string) {
    if (id === 'register') {
      this.openRegistrationPage();
      return;
    }
    document.getElementById(id)!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}