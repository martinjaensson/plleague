import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order, Project, HourlyRateProduct, StatisticsProduct } from '../../core/models';
import { AppState, OrdersState, OrderState, OrdersFilterState } from '../state/';

import * as ordersActions from '../state/actions/orders.actions';
import * as orderActions from '../state/actions/order.actions';
import * as ordersFilterActions from '../state/actions/orders-filter.actions';

@Injectable()
export class OrderService {
    private _order$: Observable<OrderState>;
    private _orders$: Observable<OrdersState>;
    private _ordersFilter$: Observable<OrdersFilterState>;
    private pageLength: number = 6;

    constructor(private _store: Store<AppState>) {
        this._orders$ = this._store.select(state => state.orders);
        this._order$ = this._store.select(state => state.order);
        this._ordersFilter$ = this._store.select(state => state.ordersFilter);
    }

    /**
     * List of orders
     */

    private searchList(): Observable<OrdersState> {
        return Observable.combineLatest(this._orders$, this._ordersFilter$)
            .map(([orders, filter]) => Object.assign({}, orders, {
                list: orders.list ? orders.list
                    .filter(p => this._searchByText(p, filter ? filter.search : ''))
                    : null
            }));
    }

    list(): Observable<OrdersState> {
        return this.updatePageBreak(this.searchList());
    }


    updatePageBreak(list: Observable<OrdersState>): Observable<OrdersState> {
        return list
            .map(orders => Object.assign({}, orders, {
                list: orders.list ? orders.list
                    .slice((orders.page - 1) * this.pageLength, orders.page * this.pageLength)
                    : null
            }));
    }

    getPageCount(): Observable<number> {
        return this.searchList().map(products => Math.ceil((products.list ? products.list.length : 1) / this.pageLength));;
    }

    private _searchByText(order: Order, search: string): boolean {
        if (!search || !search.length) {
            return true;
        }
        var splitSearch = search.trim().split("+");
        var matchString = this.buildMatchString(order);
        for (var i = 0; i < splitSearch.length; i++) {
            if (matchString.indexOf(splitSearch[i]) == -1) {
                 return false;
            }
        }
        return true;
    }

    private buildMatchString(order: Order): string {
        var matchString = "";
        if (order.id && order.name) {
            matchString += order.id.toString() + " - " + order.name.toLowerCase();
        }
        if(order.customer) {
            matchString += order.customer.name.toLowerCase();
        }
        if(order.project) {
            if (order.project.id && order.project.name) {
                matchString += order.project.id.toString() + " - " + order.project.name.toLowerCase();
            }
            if (order.project.projectLeader) {
                matchString += order.project.projectLeader.employeeName.toLowerCase();
            }
        }
        if(order.orderStatus) {
             matchString += order.orderStatus.name.toLowerCase();
        }
        return matchString;
    }

    load(): void {
        this._store.dispatch(new ordersActions.Load());
    }

    search(search: string): void {
        this._store.dispatch(new ordersFilterActions.SetSearch(search));
    }

    set(orderNo: number): void {
        this._store.dispatch(new orderActions.Set(orderNo));
    }

    get(): Observable<OrderState> {
        return this._order$;
    }

    saveProject(orderNo: number, project: Project): void {
        this._store.dispatch(new orderActions.SaveProject([orderNo, project]));
    }

    saveOrder(order: Order): void {
        this._store.dispatch(new orderActions.SaveOrder(order));
    }

    saveCustomer(order: Order): void {
        this._store.dispatch(new orderActions.SaveCustomer(order));
    }

    savePaymentPlan(order: Order): void {
        this._store.dispatch(new orderActions.SavePaymentPlan(order));
    }

    addPaymentPlan(orderNo: number, percentToAdd: number): void {
        this._store.dispatch(new orderActions.AddPaymentPlan([orderNo, percentToAdd]));
    }

    deletePaymentPlan(orderNo: number, lineNo: number): void {
        this._store.dispatch(new orderActions.DeletePaymentPlan([orderNo, lineNo]));
    }

    saveHourlyRateProduct(orderNo: number, hourlyRateProduct: HourlyRateProduct): void {
        this._store.dispatch(new orderActions.SaveHourlyRateProduct([orderNo, hourlyRateProduct]));
    }

    saveStatisticsProduct(orderNo: number, statisticsProduct: StatisticsProduct): void {
        this._store.dispatch(new orderActions.SaveStatisticsProduct([orderNo, statisticsProduct]));
    }

    addStatisticsProduct(orderNo: number, prodNo: string): void {
        this._store.dispatch(new orderActions.AddStatisticsProduct([orderNo, prodNo]));
    }

    deleteStatisticsProduct(orderNo: number, lineNo: number): void {
        this._store.dispatch(new orderActions.DeleteStatisticsProduct([orderNo, lineNo]));
    }

    setNextPage(): void {
        this._store.dispatch(new ordersActions.PageNext());
    }

    setPreviousPage(): void {
        this._store.dispatch(new ordersActions.PagePrev());
    }

    setPage(page: number) {
        this._store.dispatch(new ordersActions.PageSet(page));
    }
    
    createNewOrder() {
        this._store.dispatch(new ordersActions.CreateNewOrder());
    }

    deleteOrder(orderNo: number) {
        this._store.dispatch(new orderActions.DeleteOrder(orderNo));
    }
}