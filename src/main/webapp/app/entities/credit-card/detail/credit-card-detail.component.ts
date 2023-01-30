import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICreditCard } from '../credit-card.model';

@Component({
  selector: 'jhi-credit-card-detail',
  templateUrl: './credit-card-detail.component.html',
})
export class CreditCardDetailComponent implements OnInit {
  creditCard: ICreditCard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCard }) => {
      this.creditCard = creditCard;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
