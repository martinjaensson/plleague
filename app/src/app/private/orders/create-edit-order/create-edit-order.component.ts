import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService, ComboboxItemsService } from '../../../core/services';
import { ComboboxItem, ComboboxItemType, Order, Project, HourlyRateProduct, StatisticsProduct } from '../../../core/models';
import { ComboboxItemsState } from '../../../core/state';

@Component({
    selector: 'ex-create-edit-order',
    templateUrl: './create-edit-order.component.html',
    styleUrls: ['./create-edit-order.component.scss'],
})
export class CreateEditOrderComponent implements OnInit {
    private form: FormGroup;
    private orderNo: number;
    private projectsComboboxItems$: Observable<ComboboxItem[]>;
    private comboboxItemsState$: Observable<ComboboxItemsState>;
    private order$: Observable<Order>;
    private project$: Observable<Project>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _comboboxItemsService: ComboboxItemsService
    ) { }
    

    ngOnInit() {
        this.initParams();
        this.initComboboxItems();
        this.initOrder();
        this.form = this._formBuilder.group({
            'projectId': [, [ Validators.required ]]
        });
    }
    
    initParams(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.orderNo = params['id'];
            if (this.orderNo == 0) {
                console.log("Skapa ny order")
            } else {
                this._orderService.set(this.orderNo);
                console.log("Editera order " + this.orderNo)
            }
        });
    };

    initComboboxItems() : void {
         this._comboboxItemsService.load([ComboboxItemType.projects, ComboboxItemType.employees, ComboboxItemType.users, 
                                        ComboboxItemType.orderStatus, ComboboxItemType.orderTypes, ComboboxItemType.incomeTypes, 
                                        ComboboxItemType.customers, ComboboxItemType.paymentTerms, ComboboxItemType.currencies, 
                                        ComboboxItemType.departments, ComboboxItemType.statisticsProducts]);
        this.comboboxItemsState$ = this._comboboxItemsService.get();
        this.projectsComboboxItems$ = this.comboboxItemsState$.map(s => s.projects.list);
    }

    initOrder() : void {
        this.order$ = this._orderService.get().map(s => s.item);
        this.project$ = this.order$.map(o => o.project);
    }

    saveProject(project: Project): void {
        this._orderService.saveProject(this.orderNo, project);
    }

    saveOrder(order: Order): void {
        this._orderService.saveOrder(order);
    }

    saveCustomer(order: Order): void {
        this._orderService.saveCustomer(order);
    }

    savePaymentPlan(order: Order) {
        this._orderService.savePaymentPlan(order);
    }

    addPaymentPlan(percentToAdd: number) {
        this._orderService.addPaymentPlan(this.orderNo, percentToAdd);
    }

    deletePaymentPlan(lineNo: number) {
        this._orderService.deletePaymentPlan(this.orderNo, lineNo);
    }

    saveHourlyRate(hourlyRateProduct: HourlyRateProduct) {
        this._orderService.saveHourlyRateProduct(this.orderNo, hourlyRateProduct);
    }


    saveStatisticsProduct(statisticsProduct: StatisticsProduct) {
        this._orderService.saveStatisticsProduct(this.orderNo, statisticsProduct);
    }

    addStatisticsProduct(prodNo: string) {
        this._orderService.addStatisticsProduct(this.orderNo, prodNo);
    }

    deleteStatisticsProduct(lineNo: number) {
        this._orderService.deleteStatisticsProduct(this.orderNo, lineNo);
    }

    deleteOrder(del: boolean) {
        if(del) {
           this._orderService.deleteOrder(this.orderNo);
        }
    }

}