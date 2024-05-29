import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApiService } from '../../../apiservices/api.service';
import { DynamicThemeService } from '../../../dynamic-theme/dynamic-theme.service';
import { ToastService } from '../../../utilservices/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EARLY_BIRD_TICKET_ID, LATE_BIRD_TICKET_ID } from '../../../utils/constants';
import { Validator } from '../../../utils/validator';
import { CommonModule } from '@angular/common';
import { EVENT_CONFIG_DETAILS, EVENT_ID, EVENT_PARTICIPANTE_RESPONSE_DATA, EVENT_PARTICIPANTS_DETAILS } from '../../../utils/localstorage-constants';
import { LocalstorageService } from '../../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent implements OnInit, AfterViewInit {

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

  isLoading = false;

  /** Event configuration details */
  eventConfigDetails: any;

  /** Ticket IDs */
  EARLY_BIRD_TICKET_ID = EARLY_BIRD_TICKET_ID;
  LATE_BIRD_TICKET_ID = LATE_BIRD_TICKET_ID;

  /** API endpoint for participant registration */
  participanteRegisterApiPath = "/api/Register";

  /**
   * Constructor to inject necessary services.
   * @param dynamicThemeService - The dynamic theme service.
   * @param elRef - The element reference.
   * @param renderer - The renderer.
   * @param apiService - The API service.
   * @param sanitizer - The DOM sanitizer.
   * @param toastService - The toast service.
   * @param router - The router service.
   */
  constructor(
    private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private localstorageService : LocalstorageService
  ) { }

  /** Lifecycle hook to initialize component data */
  ngOnInit(): void {
    // Retrieve event configuration details from local storage
    this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');

    if (!this.eventConfigDetails || Object.keys(this.eventConfigDetails).length === 0) {
      this.router.navigate(['/404']);
    }
  }

  /** Lifecycle hook that runs after the component's view has been initialized */
  ngAfterViewInit() {
    // Apply dynamic theme configuration after view initialization
    setTimeout(() => {
      this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
    }, 10);
  }

  /**
   * Handle changes to the shirt selection.
   * @param event - The change event.
   */
  onShirtChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.participantDetails.shirt = inputElement.value;
  }

  /**
   * Handle changes to the gender selection.
   * @param event - The change event.
   */
  onGenderChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.participantDetails.gender = inputElement.value;
  }

  /**
   * Handle changes to the ticket selection.
   * @param event - The change event.
   */
  onTicketChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.participantDetails.ticketId = inputElement.value;
  }

  onlyNumberKey(event: any) {
    if (this.participantDetails.dob.length == 2) {
      this.participantDetails.dob = this.participantDetails.dob + '/';
    }
    if (this.participantDetails.dob.length == 5) {
      this.participantDetails.dob = this.participantDetails.dob + '/';
    }
  }

  formatDOB(event: any) {
    let input = event.target.value.replace(/[^0-9]/g, '');

    if (input.length >= 2) {
      let day = input.slice(0, 2);
      if (parseInt(day) > 31) {
        day = '31';
      }
      input = day + '/' + input.slice(2);
    }

    if (input.length >= 5) {
      let month = input.slice(3, 5);
      if (parseInt(month) > 12) {
        month = '12';
      }
      input = input.slice(0, 3) + month + '/' + input.slice(5);
    }

    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    if (input.length >= 7) {
      let year = input.slice(6, 10);
      const currentYear = new Date().getFullYear();
      if (parseInt(year) > currentYear) {
        year = currentYear.toString();
      }
      input = input.slice(0, 6) + year;
    }

    this.participantDetails.dob = input;
  }

  preventNonNumeric(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode);
    if (!pattern.test(inputChar) && event.keyCode !== 8 && event.keyCode !== 46) {
      event.preventDefault();
    }
  }


  /**
   * Validate the registration form.
   * @returns {boolean} - Returns true if the form is valid, otherwise false.
   */
  validateRegistrationForm(): boolean {
    if (!this.participantDetails.name) {
      this.toastService.showInfo('Please Enter Name');
      return false;
    }
    if (!this.participantDetails.mobile) {
      this.toastService.showInfo('Please Enter Mobile Number');
      return false;
    }
    if (!this.participantDetails.email) {
      this.toastService.showInfo('Please Enter Email');
      return false;
    }
    if (this.participantDetails.email && !Validator.validateEmail(this.participantDetails.email)) {
      this.toastService.showInfo('Please Enter Valid Email');
      return false;
    }
    if (!this.participantDetails.gender) {
      this.toastService.showInfo('Please Select Gender');
      return false;
    }
    if (!this.participantDetails.ticketId) {
      this.toastService.showInfo('Please Select ticket');
      return false;
    }
    if (!this.participantDetails.terms_conditions) {
      this.toastService.showInfo('Please Accept Terms');
      return false;
    }
    return true;
  }

  generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  /** Method to send participant details to the backend */
  registerParticipant() {

    if (!this.validateRegistrationForm()) return;

    const participateDetailsObj = {
      fk_event_id: this.localstorageService.getItem(EVENT_ID),
      participant_firstname: this.participantDetails.name,
      participant_email: this.participantDetails.email,
      participant_phonenumber: this.participantDetails.mobile,
      participant_gender: this.participantDetails.gender,
      participant_password: this.generatePassword(),
      receive_partner_messages: false,
      fk_ticket_id: this.participantDetails.ticketId,
      participant_tshirt_size: this.participantDetails.shirt.charAt(this.participantDetails.shirt.length-1)
    };
    this.isLoading = true;
    // Post participant details to the API
    this.apiService.postData(this.participanteRegisterApiPath, participateDetailsObj).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data.val === 1) {
          this.localstorageService.setItem(EVENT_PARTICIPANTS_DETAILS, JSON.stringify(this.participantDetails));
          this.localstorageService.setItem(EVENT_PARTICIPANTE_RESPONSE_DATA, JSON.stringify(data));
          this.toastService.showSuccess('Registered successfully');
          this.router.navigate(['/registration/payment']);
        } else if (data.Status === 1) {
          if (data.paid_status === "UnPaid") {
            this.localstorageService.setItem(EVENT_PARTICIPANTE_RESPONSE_DATA, JSON.stringify(data));
            this.toastService.showSuccess('User is already registered but has not paid');
            this.router.navigate(['/registration/payment']);
          }
          else {
            this.toastService.showSuccess(data.message);
          }
        } else if (data.Status === 2) {
          this.toastService.showSuccess('Registrations are already closed');
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}