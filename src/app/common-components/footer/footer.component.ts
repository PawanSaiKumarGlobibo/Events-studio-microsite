import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DynamicThemeService } from '../../dynamic-theme/dynamic-theme.service';
import { SharedService } from '../../utilservices/shared-service/shared.service';
import { EVENT_CONFIG_DETAILS } from '../../utils/localstorage-constants';
import { LocalstorageService } from '../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  eventConfigDetails:any;

  constructor(private dynamicThemeService: DynamicThemeService,
    private elRef: ElementRef, private renderer: Renderer2, private sharedService: SharedService,
  private localstorageService:LocalstorageService) { }

  ngOnInit(): void {
    this.sharedService.applyheaderTheme$.subscribe((data: any) => {
      setTimeout(() => {
        this.eventConfigDetails = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');
        this.dynamicThemeService.configureTheme(this.elRef, this.renderer);
      }, 10);
    });
  }
    

}
