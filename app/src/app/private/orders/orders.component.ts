import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../core/models';
import { OrderService } from '../../core/services';
import { ActivatedRoute } from '@angular/router';
import { OrdersFilterState, OrdersState } from '../../core/state';

@Component({
    selector: 'ex-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    private ordersState$: Observable<OrdersState>;
    private orders$: Observable<Order[]>;
    private searchText: string = "";
    private timer: any;
    private page$: Observable<number>;
    private pageCount$: Observable<number>;

    constructor(private _activatedRoute: ActivatedRoute, 
                private _orderService: OrderService) { }

    ngOnInit() {
        this.initOrders();
        this._activatedRoute.queryParams.subscribe(params => {
            this.searchText = params['search'] || "";
            this.search();
        });
        
    }

    initOrders() {
        this._orderService.load();
        this.ordersState$ = this._orderService.list();
        this.orders$ = this.ordersState$.map(state => state.list);
        this.page$ = this.ordersState$.map(state => state.page);
        this.pageCount$ = this._orderService.getPageCount();
    }

    search(): void {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this._orderService.search(this.searchText);
            this._orderService.setPage(1);
        }, 500);
    }

    prevPage() {
        this._orderService.setPreviousPage();
    }

    nextPage() {
        this._orderService.setNextPage();
    }

    createNewOrder(): void {
        this._orderService.createNewOrder();
    }
}