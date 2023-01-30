import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CreditCardComponent } from '../list/credit-card.component';
import { CreditCardDetailComponent } from '../detail/credit-card-detail.component';
import { CreditCardUpdateComponent } from '../update/credit-card-update.component';
import { CreditCardRoutingResolveService } from './credit-card-routing-resolve.service';

const creditCardRoute: Routes = [
  {
    path: '',
    component: CreditCardComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CreditCardDetailComponent,
    resolve: {
      creditCard: CreditCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CreditCardUpdateComponent,
    resolve: {
      creditCard: CreditCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CreditCardUpdateComponent,
    resolve: {
      creditCard: CreditCardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(creditCardRoute)],
  exports: [RouterModule],
})
export class CreditCardRoutingModule {}
