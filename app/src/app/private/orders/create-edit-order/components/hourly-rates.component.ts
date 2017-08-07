import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../../../core/services';
import { Order, HourlyRateProduct } from '../../../../core/models';
import { OrderState } from '../../../../core/state';



@Component({
    selector: 'hourly-rates',
    templateUrl: './hourly-rates.component.html',
    styleUrls: ['./hourly-rates.component.scss'],
})
export class HourlyRatesComponent implements OnInit {
    private order$: Observable<Order>;
    private hourlyRateProducts$: Observable<HourlyRateProduct[]>;
    private orderState$: Observable<OrderState>;
    private percentToAdd: string;

    @Input()
    order: Order;

    @Output()
    save: EventEmitter<HourlyRateProduct> = new EventEmitter<HourlyRateProduct>();

    constructor(
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.initOrder();
    }

    initOrder(): void {
        this.orderState$ = this._orderService.get()
        this.order$ = this.orderState$.map(s => s.item);
        this.hourlyRateProducts$ = this.order$.map(o => o.hourlyRateProducts);
    }

    hourlyRateChanged(salesPrice: number, i: number) {
        if (salesPrice != this.order.hourlyRateProducts[i].salesPrice && (!isNaN(Number(salesPrice)))) {
           this.order.hourlyRateProducts[i].salesPrice = salesPrice;
            this.save.emit(this.order.hourlyRateProducts[i]);
        }
    }

}