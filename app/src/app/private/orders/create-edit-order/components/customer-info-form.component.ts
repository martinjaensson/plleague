import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService, ComboboxItemsService } from '../../../../core/services';
import { ComboboxItem, ComboboxItemType, Project, Order, Customer } from '../../../../core/models';
import { ComboboxItemsState,OrderState } from '../../../../core/state';

@Component({
    selector: 'customer-info-form',
    templateUrl: './customer-info-form.component.html',
    styleUrls: ['./customer-info-form.component.scss'],
})
export class CustomerInfoFormComponent implements OnInit, OnChanges {
    private form: FormGroup;
    private customersComboboxItems$: Observable<ComboboxItem[]>;
    private sellersComboboxItems$: Observable<ComboboxItem[]>;
    private paymentTermsComboboxItems$: Observable<ComboboxItem[]>;
    private currenciesComboboxItems$: Observable<ComboboxItem[]>;
    private departmentsComboboxItems$: Observable<ComboboxItem[]>;
    private comboboxItemsState$: Observable<ComboboxItemsState>;
    private order$: Observable<Order>;
    private orderState$: Observable<OrderState>;
    private clickGetCustomer: boolean;

    @Input()
    order: Order;

    @Input()
    disabled: boolean = true;

    @Output()
    save: EventEmitter<Project> = new EventEmitter<Project>();

    @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _comboboxItemsService: ComboboxItemsService
    ) { 
        this.form = this._formBuilder.group({
            'customerNo': [null, ],
            'sellerOrBuyer': [null, ],
            'paymentTerms': [null, ],
            'currencyNo': [null, ],
            'customerOrderNo': [null, ],
            'department': [null, ],
            'customersReference': [null, ]
        });
    }

    // *** INIT ***
    ngOnInit() {
        this.initComboboxItems();
        this.initOrder();
    }

    initComboboxItems(): void {
        this.comboboxItemsState$ = this._comboboxItemsService.get();
        this.customersComboboxItems$ = this.comboboxItemsState$.map(s => s.customers.list);
        this.sellersComboboxItems$ = this.comboboxItemsState$.map(s => s.employees.list);
        this.paymentTermsComboboxItems$ = this.comboboxItemsState$.map(s => s.paymentTerms.list);
        this.currenciesComboboxItems$ = this.comboboxItemsState$.map(s => s.currencies.list);
        this.departmentsComboboxItems$ = this.comboboxItemsState$.map(s => s.departments.list);
    }

    initOrder(): void {
        this.orderState$ = this._orderService.get()
        this.order$ =  this.orderState$.map(st => st.item);
    }
    // *** END OF INIT ***

    ngOnChanges(changes: SimpleChanges): void {
        if('disabled' in changes)  {
            this.updateDisabledState();
        } 
        if('order' in changes && !!this.disabled) {
            this.update();
        }
    }

    cancelForm(): void {
        this.cancel.emit(true);
        this.update();
    }

    update(): void {
        if (!this.order)
            this.form.reset()
        else
            this.form.patchValue(this.order);
    }

    updateDisabledState(): void {
        if (this.disabled)
            this.form.disable();
        else
            this.form.enable();
    }

    saveForm(): void {
        this.save.emit({ ...this.order, ...this.form.value }); 
    }

    changeProject(order: any) {
        this.form.patchValue(order);
    }

    getCustomerInfo() {
        this.clickGetCustomer = !this.clickGetCustomer;
    }

    updateCustomer(customer: Customer) {
        this.form.patchValue({sellerOrBuyer: customer.sellerOrBuyer, 
                               paymentTerms: customer.paymentTerms,
                               currencyNo: customer.currencyNo,
                               department: customer.department,
                               customersReference: customer.customersReference});
    }

}