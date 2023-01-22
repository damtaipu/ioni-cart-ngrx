import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, Observable, of } from 'rxjs';
import { decrement, increment, reset } from '../store/actions';
import { CartModel } from '../store/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  count$: Observable<CartModel>;
  showNumberItens: number = 0;

  productList: CartModel[] = [
    {
      prodId: 6587,
      prodName: 'Scandal',
      prodPrice: 10.0,
      prodQty: 1
    },
    {
      prodId: 147,
      prodName: 'Oud',
      prodPrice: 100.0,
      prodQty: 1
    },
    {
      prodId: 458,
      prodName: 'Dylan Blue',
      prodPrice: 500.0,
      prodQty: 1
    }]



  constructor(private store: Store<{ payload: CartModel }>) {
    this.count$ = store.select('payload');

    this.count$.subscribe((r: any) => {
      console.log(r)
      this.showNumberItens = r.length
    })

    // Itens de carrinho local ou remoto
    this.requestProducts().subscribe(r => {
      r.forEach((e: any) => {
        this.increment(e)
      });
    })
  }

  increment(prod: CartModel) {
    let prodPayload = prod
    this.store.dispatch(increment({ payload: prodPayload }));
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  requestProducts(): Observable<any> {
    let productsRequest = [
      {
        "prodId": 6587,
        "prodName": "Scandal",
        "prodPrice": 10,
        "prodQty": 1
      },
      {
        "prodId": 147,
        "prodName": "Oud",
        "prodPrice": 100,
        "prodQty": 1
      }
    ]
    return of(productsRequest).pipe(delay(2000));
  }

}
