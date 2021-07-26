import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { StripeService } from 'ngx-stripe';

import { StripeServices } from 'src/app/_services/stripe.service';
import { switchMap } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-payement-subcription',
  templateUrl: './payement-subcription.component.html',
  styleUrls: ['./payement-subcription.component.css']
})
export class PayementSubcriptionComponent implements OnDestroy, AfterViewInit {
  // @ts-ignore
  @ViewChild('cardInfo') public cardInfo:ElementRef  ;
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError:any ="";
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PayementSubcriptionComponent>,
  ) {
    this._totalAmount = data['totalAmount'];
  }
  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
  ngAfterViewInit() {
    this.initiateCardElement();
  }
  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', {cardStyle});
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }
  onChange({error}:any) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }
  async createStripeToken() {
    const {token, error} = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }
  onSuccess(token:string) {
    this.dialogRef.close({token});
  }
  onError(error:any) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
