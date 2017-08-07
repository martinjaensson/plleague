import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService, ComboboxItemsService } from '../../../../core/services';
import { Order, StatisticsProduct, ComboboxItem } from '../../../../core/models';
import { OrderState, ComboboxItemsState } from '../../../../core/state';

@Component({
    selector: 'statistics-products',
    templateUrl: './statistics-products.component.html',
    styleUrls: ['./statistics-products.component.scss'],
})
export class StatisticsProductsComponent implements OnInit {
    private order$: Observable<Order>;
    private statisticsProducts$: Observable<StatisticsProduct[]>;
    private orderState$: Observable<OrderState>;
    private percentToAdd: string;
    private comboboxItemsState$: Observable<ComboboxItemsState>;
    private statisticsProductsComboboxItems$: Observable<ComboboxItem[]>;
    private clickAddStatisticsProduct: boolean;

    @Input()
    order: Order;

    @Input()
    disabled: boolean = true;

    @Output()
    save: EventEmitter<StatisticsProduct> = new EventEmitter<StatisticsProduct>();

    @Output()
    add: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    delete: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private _orderService: OrderService,
        private _comboboxItemsService: ComboboxItemsService
    ) { }

    ngOnInit() {
        this.initComboboxItems();
        this.initOrder();
    }

    initComboboxItems(): void {
        this.comboboxItemsState$ = this._comboboxItemsService.get();
        this.statisticsProductsComboboxItems$ = this.comboboxItemsState$.map(s => s.statisticsProducts.list);
    }

    initOrder(): void {
        this.orderState$ = this._orderService.get()
        this.order$ = this.orderState$.map(s => s.item);
        this.statisticsProducts$ = this.order$.map(o => o.statisticsProducts);
    }

    priceChanged(price: string, i: number) {
        if (Number(price) != this.order.statisticsProducts[i].price && (!isNaN(Number(price))) || Number(price)==0) {
            if (price != "") {
                this.order.statisticsProducts[i].price = Number(price);
                this.save.emit(this.order.statisticsProducts[i]);
            } else {
                this.order.statisticsProducts[i].price = -1;
                this.save.emit(this.order.statisticsProducts[i]);
                this.order.statisticsProducts[i].price = 0;
            } 

        }
    }

    quantityChanged(quantity: number, i: number) {
        if (quantity != this.order.statisticsProducts[i].quantity && (!isNaN(Number(quantity)))) {
            this.order.statisticsProducts[i].quantity = quantity;
            this.save.emit(this.order.statisticsProducts[i]);
        }
    }

    addStatisticsProductBtnClicked() {
        this.clickAddStatisticsProduct = !this.clickAddStatisticsProduct;
    }

    addStatisticsProduct(id : string) {
        if(id != undefined) {
            this.add.emit(id);
        }
    }

    deleteStatisticsProduct(lineNo: number) {
        this.delete.emit(lineNo);
    }
}