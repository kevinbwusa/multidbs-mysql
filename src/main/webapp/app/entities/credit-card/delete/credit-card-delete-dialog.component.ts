import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICreditCard } from '../credit-card.model';
import { CreditCardService } from '../service/credit-card.service';

@Component({
  templateUrl: './credit-card-delete-dialog.component.html',
})
export class CreditCardDeleteDialogComponent {
  creditCard?: ICreditCard;

  constructor(protected creditCardService: CreditCardService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.creditCardService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
