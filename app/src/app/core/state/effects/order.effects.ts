import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ComboboxItemType } from '../../models';
import { BaseEffects } from './base.effects';
import { AppState } from '../';
import { Store } from '@ngrx/store';


import { OrderResource } from '../../resources';

import * as orderActions from '../actions/order.actions';
import * as comboboxItemsActions from '../actions/comboboxitems.actions';

@Injectable()
export class OrderEffects extends BaseEffects {

    constructor(private _store: Store<AppState>,
        private _actions$: Actions,
        private _orderResource: OrderResource,
        private _router: Router) {
        super();
    }

    /**
     * Load order from API
     */
    @Effect()
    set$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SET)
        .map(toPayload)
        .switchMap(orderNo => {
            return this._orderResource.item(orderNo)
                .map(order => new orderActions.SetSuccess(order))
                .catch(super.handleError(new orderActions.SetError()));
        });


    @Effect()
    saveProject$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_PROJECT)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.saveProject(payLoad[0], payLoad[1])
                .map(project => {
                    this._store.dispatch(new comboboxItemsActions.Load([ComboboxItemType.projects]));
                    return new orderActions.SaveProjectSuccess(project);
                })
                .catch(super.handleError(new orderActions.SaveProjectError()));
        });

    @Effect()
    saveOrder$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_ORDER)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.saveOrder(payLoad)
                .map(order => new orderActions.SaveOrderSuccess(order))
                .catch(super.handleError(new orderActions.SaveOrderError()));
        });


    @Effect()
    saveCustomer$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_CUSTOMER)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.saveCustomer(payLoad)
                .map(order => new orderActions.SaveCustomerSuccess(order))
                .catch(super.handleError(new orderActions.SaveCustomerError()));
        });

    @Effect()
    savePaymentPlan$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_PAYMENT_PLAN)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.savePaymentPlan(payLoad)
                .map(order => new orderActions.SavePaymentPlanSuccess(order))
                .catch(super.handleError(new orderActions.SavePaymentPlanError()));
        });

    @Effect()
    addPaymentPlan$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.ADD_PAYMENT_PLAN)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.addPaymentPlan(payLoad)
                .map(order => new orderActions.AddPaymentPlanSuccess(order))
                .catch(super.handleError(new orderActions.AddPaymentPlanError()));
        });

    @Effect()
    deletePaymentPlan$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.DELETE_PAYMENT_PLAN)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.deletePaymentPlan(payLoad)
                .map(order => new orderActions.DeletePaymentPlanSuccess(order))
                .catch(super.handleError(new orderActions.DeletePaymentPlanError()));
        });

    @Effect()
    saveHourlyRateProduct$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_HOURLY_RATE_PRODUCT)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.saveHourlyRateProduct(payLoad)
                .map(order => new orderActions.SaveHourlyRateProductSuccess(order))
                .catch(super.handleError(new orderActions.SaveHourlyRateProductError()));
        });


    @Effect()
    saveProduct$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.SAVE_STATISTICS_PRODUCT)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.saveStatisticsProduct(payLoad)
                .map(order => new orderActions.SaveStatisticsProductSuccess(order))
                .catch(super.handleError(new orderActions.SaveStatisticsProductError()));
        });


    @Effect()
    addStatisticsProduct$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.ADD_STATISTICS_PRODUCT)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.addStatisticsProduct(payLoad)
                .map(order => new orderActions.AddStatisticsProductSuccess(order))
                .catch(super.handleError(new orderActions.AddStatisticsProductError()));
        });


    @Effect()
    deleteStatisticsProduct$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.DELETE_STATISTICS_PRODUCT)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.deleteStatisticsProduct(payLoad)
                .map(order => new orderActions.DeleteStatisticsProductSuccess(order))
                .catch(super.handleError(new orderActions.DeletStatisticsProductError()));
        });

    @Effect()
    deleteOrder$: Observable<Action> = this._actions$
        .ofType(orderActions.ActionTypes.DELETE_ORDER)
        .map(toPayload)
        .switchMap(payLoad => {
            return this._orderResource.deleteOrder(payLoad)
                .map(order => { 
                    this._router.navigate([ '/delprojektoversikt' ]);
                    return new orderActions.DeleteOrderSuccess(); 
                })
                .catch(super.handleError(new orderActions.DeleteOrderError()));
        });



}