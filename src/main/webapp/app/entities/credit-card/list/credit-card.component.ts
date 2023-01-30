import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICreditCard } from '../credit-card.model';
import { CreditCardService } from '../service/credit-card.service';
import { CreditCardDeleteDialogComponent } from '../delete/credit-card-delete-dialog.component';

@Component({
  selector: 'jhi-credit-card',
  templateUrl: './credit-card.component.html',
})
export class CreditCardComponent implements OnInit {
  creditCards?: ICreditCard[];
  isLoading = false;

  constructor(protected creditCardService: CreditCardService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.creditCardService.query().subscribe(
      (res: HttpResponse<ICreditCard[]>) => {
        this.isLoading = false;
        this.creditCards = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICreditCard): number {
    return item.id!;
  }

  delete(creditCard: ICreditCard): void {
    const modalRef = this.modalService.open(CreditCardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.creditCard = creditCard;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
