import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { EVENT_CONFIG_DETAILS } from '../utils/localstorage-constants';
import { LocalstorageService } from '../utilservices/localstorage-service/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class DynamicThemeService {


  constructor(private localstorageService: LocalstorageService) { }

  /**
   * Configures the theme based on stored configurations.
   * 
   * @param elRef The ElementRef referencing the host element to apply styles.
   * @param renderer The Renderer2 instance used to modify the DOM.
   */
  configureTheme(elRef: ElementRef, renderer: Renderer2): void {
    // Retrieve theme configuration from local storage
    const config = JSON.parse(this.localstorageService.getItem(EVENT_CONFIG_DETAILS) || '{}');

    // Apply theme styles if configuration exists
    if (config) {
      this.applyHeaderStyles(config, elRef, renderer);
      this.applyTabStyles(config, elRef, renderer);
      this.applyListStyles(config, elRef, renderer);
      this.applyCardStyles(config, elRef, renderer);
      this.applySearchBorderColor(config, elRef, renderer);
      this.applyStrokeColorToSvgIcon(config, elRef, renderer);
      this.applyDetailViewImageBorderColour(config, elRef, renderer);
      this.applyFillColorToSvgIcon(config, elRef, renderer);
      this.applyFillColorToNavSvgIcon(config, elRef, renderer);
      this.applyNavTextColor(config, elRef, renderer);
      this.applyheaderColour(config, elRef, renderer);
      this.applyFooterColour(config, elRef, renderer);
      this.applyInputStyle(config, elRef, renderer);
      // Add more style applications here as needed
    }
  }



  /************************************ HEADER ****************************************/

  /**
   * Applies header-related styles based on the provided configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */

  private applyHeaderStyles(config: any, elRef: ElementRef, renderer: Renderer2): void {
    this.applyH1Background(config, elRef, renderer);
    this.applyH1Text(config, elRef, renderer);
    this.applyH2Background(config, elRef, renderer);
    this.applyNavIconColor(config, elRef, renderer);
    this.applyBorderColor(config, elRef, renderer);
    this.applyImageBorderColor(config, elRef, renderer);
    this.applyTextTitleColor(config, elRef, renderer);
    // Add more header styles as needed
  }

  /**
   * Applies background color to H1 elements based on configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */
  private applyH1Background(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_color1 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.bar-stable.bar.bar-header, .default-back, .heading-box');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background-color', config.header_color1);
      });
      const shade = config.header_color1.split(',');
      shade[3] = '0.6)';
      const shadeElements = elRef.nativeElement.querySelectorAll('.cover-bg-shade');
      shadeElements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background-color', shade.join(','));
      });
      const borderElements = elRef.nativeElement.querySelectorAll('.dynaborder');
      borderElements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border-color', config.header_color1);
      });
    }
  }

  /**
 * Applies text color to H1 elements based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyH1Text(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_text_color1 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.bar .title a, .heading-box > .content, .bar-stable .button.button-clear');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.header_text_color1);
      });
    }
  }


  /**
   * Applies background color to H2 elements based on configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */
  private applyH2Background(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_color2 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.H2-Background');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.headre_text_color_2);
      });
    }
  }

  /************************************ NAVIGATION ****************************************/


  /**
   * Applies navigation icon color based on configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */

  private applyNavIconColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_color2 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.fill-svg-icon-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'fill', config.headre_text_color_2);
      });
    }
  }

  /**
 * Applies background color to H2 elements based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyNavTextColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.nav_text_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.nav-text-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.nav_text_color);
      });
    }
  }

  /**
* Applies background color to H2 elements based on configuration.
* 
* @param config The theme configuration object.
* @param elRef The ElementRef referencing the host element.
* @param renderer The Renderer2 instance used to apply styles to the DOM.
*/
  private applyFillColorToNavSvgIcon(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.nav_icon_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.nav-icon-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'fill', config.nav_icon_color);
      });
    }
  }

  /************************************ TABS ****************************************/


  /**
 * Applies tab-related styles based on the provided configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyTabStyles(config: any, elRef: ElementRef, renderer: Renderer2): void {
    this.applyTabColor(config, elRef, renderer);
  }

  /**
   * Applies color to tab icons based on configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */
  private applyTabColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_color2 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.tab-icon-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.tabs_active_font_color);
      });
    }
  }


  /************************************ LISTS/TABLE ****************************************/

  /**
   * Applies list/table-related styles based on the provided configuration.
   * 
   * @param config The theme configuration object.
   * @param elRef The ElementRef referencing the host element.
   * @param renderer The Renderer2 instance used to apply styles to the DOM.
   */
  private applyListStyles(config: any, elRef: ElementRef, renderer: Renderer2): void {
    // this.applyListBackgroundColor(config, elRef, renderer);
    this.applyListTitleColor(config, elRef, renderer);
    this.applyListSubTitleColor(config, elRef, renderer);
    this.applyListBottomColor(config, elRef, renderer);
  }
  /**
  * Applies color to list titles based on configuration.
  * 
  * @param config The theme configuration object.
  * @param elRef The ElementRef referencing the host element.
  * @param renderer The Renderer2 instance used to apply styles to the DOM.
  */
  //  private applyListBackgroundColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
  //   if (config.list_bg != null) {
  //     const elements = elRef.nativeElement.querySelectorAll('.background-list');
  //     elements.forEach((element: HTMLElement) => {
  //       renderer.setStyle(element, 'background-color', config.list_bg);
  //     });
  //   }
  // }

  /**
 * Applies color to list titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyListTitleColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.list_title != null) {
      const elements = elRef.nativeElement.querySelectorAll('.list-title-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.list_title);
      });
    }
  }

  /**
 * Applies color to list sub-titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyListSubTitleColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.list_font_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.list-sub-title-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.list_font_color);
      });
    }
  }

  /**
  * Applies color to list sub-titles based on configuration.
  * 
  * @param config The theme configuration object.
  * @param elRef The ElementRef referencing the host element.
  * @param renderer The Renderer2 instance used to apply styles to the DOM.
  */
  private applyListBottomColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.main_list_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.main-list-border-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border-bottom', `2px solid ${config.main_list_border_color}`);
      });
    }
  }


  /************************************ CARD ****************************************/

  /**
 * Applies card-related styles based on the provided configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */

  private applyCardStyles(config: any, elRef: ElementRef, renderer: Renderer2): void {
    this.applyCardTitleColor(config, elRef, renderer);
    this.applyCardBackgroundColor(config, elRef, renderer);
    this.applyCardShape(config, elRef, renderer);
  }

  /**
 * Applies color to card titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */

  private applyCardTitleColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.card_heading_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.card-heading-text-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.card_heading_color);
      });
    }
  }
   

  private applyCardBackgroundColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.card_background_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.card_background_color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background-color', config.card_background_color);
      });
    }
  }

  private applyCardShape(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.card_shape != null) {
      const elements = elRef.nativeElement.querySelectorAll('.card_shape');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border', config.card_shape == 'curvysquared' ? '5px':'0px');
      });
    }
  }

  
  /**
 * Applies color to list sub-titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyBorderColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.nav_icon_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.list-sub-title-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border-bottom', config.main_list_border_color);
      });
    }
  }

  private applyImageBorderColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.button1_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.image-border-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background', config.button1_border_color);
      });
    }
  }


  /**
  * Applies color to list sub-titles based on configuration.
  * 
  * @param config The theme configuration object.
  * @param elRef The ElementRef referencing the host element.
  * @param renderer The Renderer2 instance used to apply styles to the DOM.
  */
  private applySearchBorderColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.nav_icon_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.search-box-border-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border', 'none');
        renderer.setStyle(element, 'border-bottom', `2px solid ${config.nav_icon_border_color}`);
        renderer.setStyle(element, 'background', '#FFF');
        renderer.setStyle(element, 'border-radius', '0px');
      });
    }
  }

  /**
 * Applies color to list sub-titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */
  private applyStrokeColorToSvgIcon(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.button2_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.svg-icon-stroke-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'stroke', config.button2_border_color);
      });
    }
  }


  /**
* Applies navigation icon color based on configuration.
* 
* @param config The theme configuration object.
* @param elRef The ElementRef referencing the host element.
* @param renderer The Renderer2 instance used to apply styles to the DOM.
*/

  private applyFillColorToSvgIcon(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.button2_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.fill-svg-icon-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'fill', config.button2_border_color);
      });
    }
  }


  /**
* Applies color to list sub-titles based on configuration.
* 
* @param config The theme configuration object.
* @param elRef The ElementRef referencing the host element.
* @param renderer The Renderer2 instance used to apply styles to the DOM.
*/
  private applyDetailViewImageBorderColour(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.button1_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.detail-view-image-border');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border', config.button1_border_color);
      });
    }
  }

  // Header 



  /**
* Applies color to list sub-titles based on configuration.
* 
* @param config The theme configuration object.
* @param elRef The ElementRef referencing the host element.
* @param renderer The Renderer2 instance used to apply styles to the DOM.
*/
  private applyheaderColour(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.header_text_color1 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.header-container');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background-color', config.header_color1);
        renderer.setStyle(element, 'color', config.header_text_color1);
      });
    }
  }

  // Footer 

  /**
* Applies color to list sub-titles based on configuration.
* 
* @param config The theme configuration object.
* @param elRef The ElementRef referencing the host element.
* @param renderer The Renderer2 instance used to apply styles to the DOM.
*/
  private applyFooterColour(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.button1_border_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.footer-container');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'background-color', config.footer_background_color);
        renderer.setStyle(element, 'color', config.footer_text_color);
      });
    }
  }



  /**
 * Applies color to card titles based on configuration.
 * 
 * @param config The theme configuration object.
 * @param elRef The ElementRef referencing the host element.
 * @param renderer The Renderer2 instance used to apply styles to the DOM.
 */

  private applyTextTitleColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.text_color1 != null) {
      const elements = elRef.nativeElement.querySelectorAll('.text_color1');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.text_color1);
      });
    }
  }


  

  /************************************ INPUT  ****************************************/

  private applyInputStyle(config: any, elRef: ElementRef, renderer: Renderer2): void {
    this.applyInputLabelColor(config, elRef, renderer);
    this.applyInputTextColor(config, elRef, renderer);
    this.applyCustomPlaceholderClass(config, elRef, renderer);
    this.applyInputBorderColor(config, elRef, renderer);
  }

  private applyInputBorderColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.homepage_description_box_fold_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.input-border-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'border-color', config.homepage_description_box_fold_color);
      });
    }
  }

  private applyInputLabelColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.input_box_label != null) {
      const elements = elRef.nativeElement.querySelectorAll('.input-label-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.input_box_label);
      });
    }
  }

  private applyInputTextColor(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.input_box_color != null) {
      const elements = elRef.nativeElement.querySelectorAll('.input-text-color');
      elements.forEach((element: HTMLElement) => {
        renderer.setStyle(element, 'color', config.input_box_color);
      });
    }
  }

  private applyCustomPlaceholderClass(config: any, elRef: ElementRef, renderer: Renderer2): void {
    if (config.input_box_placeholder != null) {
      const style = renderer.createElement('style');
      style.textContent = `
        .custom-placeholder::placeholder {
          color: ${config.input_box_placeholder} !important;
        }
      `;
      renderer.appendChild(document.head, style);

      const elements = elRef.nativeElement.querySelectorAll('input, textarea');
      elements.forEach((element: HTMLElement) => {
        renderer.addClass(element, 'custom-placeholder');
      });
    }
  } 
}

