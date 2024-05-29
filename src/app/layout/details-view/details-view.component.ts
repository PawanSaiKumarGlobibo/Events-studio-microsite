import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../apiservices/api.service';
import { DynamicThemeService } from '../../dynamic-theme/dynamic-theme.service';
import { OLD_IMG_BLOB_URL } from '../../utils/constants';
import { CommonModule } from '@angular/common';
import { EncryptionService } from '../../utilservices/encryption-service/encryption.service';
import { ToastService } from '../../utilservices/toast/toast.service';

@Component({
  selector: 'app-details-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.css'
})
export class DetailsViewComponent implements OnInit, AfterViewInit {
  /** Data retrieved from the API */
  data: any;

  /** API endpoint for sponsor details */
  sponsorsApiPath = '/api/SponsorDetails';
  
  /** API endpoint for activity details */
  activityApiPath = '/api/ActivityDetails';
  
  /** ID parameter from the route */
  id!: string;

  isLoading = false;

  /** Object to hold the details view information */
  detailsViewObj = { image: "", title: "", description: "", subTitle: "", url: "" };

  backBtnName!:string

  /**
   * Constructor to inject necessary services and initialize component data.
   * @param apiService - Service to handle API calls.
   * @param router - Router service.
   * @param activatedRoute - Service to access route parameters.
   * @param location - Service to interact with the browser's URL.
   * @param dynamicThemeService - Service to handle dynamic theme configurations.
   * @param elRef - Reference to the component's element.
   * @param renderer - Renderer to manipulate the DOM.
   */
  constructor(
    private apiService: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private encryptionService:EncryptionService,
    private toastService:ToastService
  ) {}

  /** Lifecycle hook to initialize component data */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParamMap.get('id')){
      this.id = this.encryptionService.decrypt(this.activatedRoute.snapshot.queryParamMap.get('id')!)
    }else{
      this.navigateToBack()
    }
    this.handleRouteChange();
    window.scrollTo(0, 0);
  }

    /**
  * Navigates back to the previous page using NavController.
  */
    navigateToBack(): void {
      this.router.navigate(['']);
    }

  /** Lifecycle hook that runs after the component's view has been initialized */
  ngAfterViewInit(): void {
    // Apply dynamic theme configuration
    setTimeout(() => {
      this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
    }, 0);
  }

  /**
   * Handles route changes to determine which data to fetch.
   */
  handleRouteChange(): void {
    console.log(this.router.url);
    if (this.router.url.includes("sponsors")) {
      this.backBtnName = 'Sponsors';
      this.getSponsorDetailsById();
    } else if (this.router.url.includes("activity")) {
      this.backBtnName = 'Activity';
      this.getActivityDetailsById();
    } else {
      this.router.navigate(['']);
    }
  }

  /**
   * Function to retrieve sponsor details by ID.
   */
  getSponsorDetailsById(): void {
    this.isLoading = true;
    this.apiService.getData(this.sponsorsApiPath, { id: this.id }).subscribe(
      (data: any) => {
    this.isLoading = false;
        if (data) {
          // Successful response callback
          this.detailsViewObj = {
            image: OLD_IMG_BLOB_URL + data.sponsor_participation_logo,
            title: data.sponsor_participation_title,
            subTitle: data.sponsor_participation_description2,
            description: data.sponsor_participation_description,
            url: data.url
          };
        }
        // Apply dynamic theme configuration
        setTimeout(() => {
          this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
        }, 0);
      },
      (error: any) => {
        this.isLoading = false;
        this.toastService.showError('Something went wrong ');
        console.log(error);
      }
    );
  }

  /**
   * Function to retrieve activity details by ID.
   */
  getActivityDetailsById(): void {
    this.isLoading = true;
    this.apiService.getData(this.activityApiPath, { id: this.id }).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data) {
          console.log(data);
          // Successful response callback
          this.detailsViewObj = {
            image: OLD_IMG_BLOB_URL + data.icon,
            title: data.event_activity_title,
            subTitle: data.sponsor_participation_description,
            description: data.event_activity_description.replace(/<[^>]+>/g, '').replace(/&[^\s]+;/g, ' '),
            url: data.url
          };
        }
        // Apply dynamic theme configuration
        setTimeout(() => {
          this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
        }, 0);
      },
      (error: any) => {
        this.isLoading = false;
        this.toastService.showError('Something went wrong ');
        console.log(error);
      }
    );
  }
}