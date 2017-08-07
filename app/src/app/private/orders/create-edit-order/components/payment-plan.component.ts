import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../../../core/services';
import { Order, PaymentPlan } from '../../../../core/models';
import { OrderState } from '../../../../core/state';

@Component({
    selector: 'payment-plan',
    templateUrl: './payment-plan.component.html',
    styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
    private order$: Observable<Order>;
    private paymentPlans$: Observable<PaymentPlan[]>;
    private orderState$: Observable<OrderState>;
    private percentToAdd: string;

    @Input()
    order: Order;

    @Input()
    disabled: boolean = true;

    @Output()
    save: EventEmitter<Order> = new EventEmitter<Order>();

    @Output()
    add: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    delete: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.initOrder();
    }

    initOrder(): void {
        this.orderState$ = this._orderService.get()
        this.order$ = this.orderState$.map(s => s.item);
        this.paymentPlans$ = this.order$.map(o => o.paymentPlan);
    }

    addPaymentPlanClicked() {
        if (!isNaN(Number(this.percentToAdd))) {
            this.add.emit(Number(this.percentToAdd)*this.order.orderValue/100);
        } else {
            this.add.emit(0);
        }
    }

    descriptionChanged(desc: string, i: number) {
        if (desc != this.order.paymentPlan[i].description) {
            this.order.paymentPlan[i].description = desc;
            this.save.emit(this.order);
        }
    }

    sumChanged(sum: number, i: number) {
        if (sum != this.order.paymentPlan[i].sum && (!isNaN(Number(sum)))) {
            this.order.paymentPlan[i].sum = sum;
            this.save.emit(this.order);
        }
    }

    invoiceDateChanged(invoiceDate: Date, i: number) {
        var re = new RegExp("^([0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$");
        if (re.test(invoiceDate.toString())) {
            if (invoiceDate != this.order.paymentPlan[i].invoiceDate) {
                this.order.paymentPlan[i].invoiceDate = invoiceDate;
                this.save.emit(this.order);
            }
        } 
    }

    deletePaymentPlan(lineNo: number) {
        this.delete.emit(lineNo);
    }
}