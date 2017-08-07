import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { BaseEffects } from './base.effects';
import { AppState } from '../';
import { OrderResource } from '../../resources';


import * as ordersActions from '../actions/orders.actions';

@Injectable()
export class OrdersEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _orderResource: OrderResource,
                private _router: Router) {
        super();
    }

    /**
     * Load trailers from API
     */
    @Effect()
    load$: Observable<Action> = this._actions$
        .ofType(ordersActions.ActionTypes.LOAD)
        .switchMap(action => {
            return this._orderResource.list()
                .map(projects => new ordersActions.LoadSuccess(projects))
                .catch(super.handleError(new ordersActions.LoadError()));
        });

    @Effect()
    createNewOrder$: Observable<Action> = this._actions$
        .ofType(ordersActions.ActionTypes.CREATE_NEW_ORDER)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.createNewOrder()
                .map(orderNo => { 
                    this._router.navigate([ '/skaparedigeraprojekt/' +  orderNo ]);
                    return new ordersActions.CreateNewOrderSuccess(orderNo); 
                })
                .catch(super.handleError(new ordersActions.CreateNewOrderError()));
        });
}