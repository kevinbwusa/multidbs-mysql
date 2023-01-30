import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CreditCardComponent } from './list/credit-card.component';
import { CreditCardDetailComponent } from './detail/credit-card-detail.component';
import { CreditCardUpdateComponent } from './update/credit-card-update.component';
import { CreditCardDeleteDialogComponent } from './delete/credit-card-delete-dialog.component';
import { CreditCardRoutingModule } from './route/credit-card-routing.module';

@NgModule({
  imports: [SharedModule, CreditCardRoutingModule],
  declarations: [CreditCardComponent, CreditCardDetailComponent, CreditCardUpdateComponent, CreditCardDeleteDialogComponent],
  entryComponents: [CreditCardDeleteDialogComponent],
})
export class CreditCardModule {}
