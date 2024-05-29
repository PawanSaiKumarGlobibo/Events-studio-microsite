import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EVENT_CONFIG_DETAILS, EVENT_PARTICIPANTE_RESPONSE_DATA, EVENT_PARTICIPANTS_DETAILS } from '../../../utils/localstorage-constants';
import { LocalstorageService } from '../../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-confirmation-details',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-details.component.html',
  styleUrl: './confirmation-details.component.css'
})
export class ConfirmationDetailsComponent {

    /** Event configuration details */
    eventConfigDetails: any;
  
    /** Participant details */
    participantDetails: any;

    participantRegisteredResponse:any;
  
    /**
     * Constructor to inject necessary services and initialize component data.
     * @param router - The router service.
     */
    constructor(private router: Router,private localstorageService : LocalstorageService) {
      this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');
      if (!this.eventConfigDetails || Object.keys(this.eventConfigDetails).length === 0) {
        this.router.navigate(['/404']);
      }
      this.participantDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');
      if (!this.participantDetails || Object.keys(this.participantDetails).length === 0) {
        this.router.navigate(['/personal-details']);
      }
      this.participantRegisteredResponse = JSON.parse(this.localstorageService.getItem(EVENT_PARTICIPANTE_RESPONSE_DATA) || '{}');
      if (!this.participantRegisteredResponse || Object.keys(this.participantRegisteredResponse).length === 0) {
        this.router.navigate(['/personal-details']);
      }
    }
  
    /** Lifecycle hook to initialize component data */
    ngOnInit(): void {
      this.localstorageService.removeItem(EVENT_PARTICIPANTS_DETAILS);
      this.localstorageService.removeItem(EVENT_PARTICIPANTE_RESPONSE_DATA);
    }

    goToHomePage(): void {
      this.router.navigate(['']);
    }
  }