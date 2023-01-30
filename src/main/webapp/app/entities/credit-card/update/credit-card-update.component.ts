import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICreditCard, CreditCard } from '../credit-card.model';
import { CreditCardService } from '../service/credit-card.service';

@Component({
  selector: 'jhi-credit-card-update',
  templateUrl: './credit-card-update.component.html',
})
export class CreditCardUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    type: [],
    number: [],
  });

  constructor(protected creditCardService: CreditCardService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCard }) => {
      this.updateForm(creditCard);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const creditCard = this.createFromForm();
    if (creditCard.id !== undefined) {
      this.subscribeToSaveResponse(this.creditCardService.update(creditCard));
    } else {
      this.subscribeToSaveResponse(this.creditCardService.create(creditCard));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreditCard>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(creditCard: ICreditCard): void {
    this.editForm.patchValue({
      id: creditCard.id,
      type: creditCard.type,
      number: creditCard.number,
    });
  }

  protected createFromForm(): ICreditCard {
    return {
      ...new CreditCard(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      number: this.editForm.get(['number'])!.value,
    };
  }
}
