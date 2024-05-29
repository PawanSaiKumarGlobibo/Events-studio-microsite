import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DynamicThemeService } from '../../dynamic-theme/dynamic-theme.service';
import { SharedService } from '../../utilservices/shared-service/shared.service';
import { Router } from '@angular/router';
import { EVENT_CONFIG_DETAILS } from '../../utils/localstorage-constants';
import { LocalstorageService } from '../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  eventConfigDetails: any;

  constructor(private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef, private renderer: Renderer2, private sharedService: SharedService,
  private router:Router, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.sharedService.applyheaderTheme$.subscribe((data: any) => {
      setTimeout(() => {
        this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
        this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');
      }, 10);
    });
  }

  goTohomePage(){
    this.router.navigate(['/']);
  }

}
