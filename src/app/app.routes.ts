import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PersonalDetailsComponent } from './layout/registration/personal-details/personal-details.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { PaymentDetailsComponent } from './layout/registration/payment-details/payment-details.component';
import { ConfirmationDetailsComponent } from './layout/registration/confirmation-details/confirmation-details.component';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { DetailsViewComponent } from './layout/details-view/details-view.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sponsors', component: DetailsViewComponent },
    { path: 'activity', component: DetailsViewComponent },
    {
        path: 'registration', component: RegistrationComponent,
        children: [
            { path: '', redirectTo: 'personal-details', pathMatch: 'prefix' },
            { path: 'personal-details', component: PersonalDetailsComponent },
            { path: 'payment', component: PaymentDetailsComponent },
            { path: 'confirmation', component: ConfirmationDetailsComponent },
        ]
    },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }  
];
