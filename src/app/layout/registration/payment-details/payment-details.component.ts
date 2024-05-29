import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIRMATION_PAGE_URL, COUNTRY_CURRENCY_CODE, EARLY_BIRD_TICKET_AMOUNT,
        EARLY_BIRD_TICKET_ID, LATE_BIRD_TICKET_AMOUNT, LATE_BIRD_TICKET_ID, PAYPAL_BUSINESS_MAIL_ID,
        PAYPAL_PAYMENT_URL, TICKET_TYPE_EARLY_BIRD, TICKET_TYPE_LATE_BIRD } from '../../../utils/constants';
import { CommonModule } from '@angular/common';
import { DynamicThemeService } from '../../../dynamic-theme/dynamic-theme.service';
import { EVENT_CONFIG_DETAILS, EVENT_PARTICIPANTE_RESPONSE_DATA, EVENT_PARTICIPANTS_DETAILS } from '../../../utils/localstorage-constants';
import { LocalstorageService } from '../../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit, AfterViewInit {

  /** Participant details */
  participantDetails = {
    name: "",
    dob: "",
    mobile: "",
    shirt: "",
    email: "",
    gender: "",
    ticketId: "",
    terms_conditions: false,
    participant_id: ""
  };

  participantRegisteredResponse: any;

  price_details: any;

  paypalFormDetails: any

  /** Event configuration details */
  eventConfigDetails: any;
  /**
   * Constructor to inject necessary services and initialize component data.
   * @param router - The router service.
   */
  constructor(private router: Router,private dynamicThemeService:DynamicThemeService,  private elRef: ElementRef,
    private renderer: Renderer2,private localstorageService: LocalstorageService) {
    this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');
    if (!this.eventConfigDetails || Object.keys(this.eventConfigDetails).length === 0) {
      this.router.navigate(['/404']);
    }
    this.participantDetails = JSON.parse(this.localstorageService.getItem(EVENT_PARTICIPANTS_DETAILS) || '{}');
    if (!this.participantDetails || Object.keys(this.participantDetails).length === 0) {
      this.router.navigate(['/personal-details']);
    }
    this.participantRegisteredResponse = JSON.parse(this.localstorageService.getItem(EVENT_PARTICIPANTE_RESPONSE_DATA) || '{}');
    if (!this.participantRegisteredResponse || Object.keys(this.participantRegisteredResponse).length === 0) {
      this.router.navigate(['/personal-details']);
    }
    if (this.participantRegisteredResponse && this.participantRegisteredResponse.price_details && this.participantRegisteredResponse.price_details.length > 0) {
      this.price_details = this.participantRegisteredResponse.price_details[0];
    } else {
      this.router.navigate(['/personal-details']);
    }
  }

  /** Lifecycle hook to initialize component data */
  ngOnInit(): void {
    //Sanbox url for testing
    this.paypalFormDetails = {
      paypalUrl: PAYPAL_PAYMENT_URL,
      businessId: PAYPAL_BUSINESS_MAIL_ID,
      confirmationPageURL: CONFIRMATION_PAGE_URL,
      ticketAmount: this.participantDetails.ticketId === EARLY_BIRD_TICKET_ID ? EARLY_BIRD_TICKET_AMOUNT : LATE_BIRD_TICKET_AMOUNT,
      itemName: this.participantDetails.ticketId === EARLY_BIRD_TICKET_ID ? TICKET_TYPE_EARLY_BIRD : TICKET_TYPE_LATE_BIRD,
      country_code:COUNTRY_CURRENCY_CODE,
      participantId: this.price_details.attendence_id
    }
    console.log(this.paypalFormDetails);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
    }, 10);
  }
}
