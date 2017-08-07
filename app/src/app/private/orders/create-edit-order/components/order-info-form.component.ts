import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService, ComboboxItemsService } from '../../../../core/services';
import { ComboboxItem, ComboboxItemType, Project, Order } from '../../../../core/models';
import { ComboboxItemsState,OrderState } from '../../../../core/state';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
    selector: 'order-info-form',
    templateUrl: './order-info-form.component.html',
    styleUrls: ['./order-info-form.component.scss'],
})
export class OrderInfoFormComponent implements OnInit, OnChanges {
    private form: FormGroup;
    private orderStatusComboboxItems$: Observable<ComboboxItem[]>;
    private orderTypesComboboxItems$: Observable<ComboboxItem[]>;
    private incomeTypesComboboxItems$: Observable<ComboboxItem[]>;
    private comboboxItemsState$: Observable<ComboboxItemsState>;
    private order$: Observable<Order>;
    private orderState$: Observable<OrderState>;

    @Input()
    order: Order;

    @Input()
    disabled: boolean = true;

    @Output()
    save: EventEmitter<Project> = new EventEmitter<Project>();

    @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    delete: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _comboboxItemsService: ComboboxItemsService,
        private _mdDialog: MdDialog
    ) { 
        this.form = this._formBuilder.group({
            'name': [null, ],
            'orderDate': [null, ],
            'orderValue': [null, ],
            'orderStatusNo': [null, [Validators.required]],
            'orderType': [null, ],
            'incomeType': [null, ],
            'comment': [null, ]
        });
    }

    // *** INIT ***
    ngOnInit() {
        this.initComboboxItems();
        this.initOrder();
    }

    initComboboxItems(): void {
        this.comboboxItemsState$ = this._comboboxItemsService.get();
        this.orderStatusComboboxItems$ = this.comboboxItemsState$.map(s => s.orderStatus.list);
        this.orderTypesComboboxItems$ = this.comboboxItemsState$.map(s => s.orderTypes.list);
        this.incomeTypesComboboxItems$ = this.comboboxItemsState$.map(s => s.incomeTypes.list);
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


    openConfirmDeleteDialog(): Observable<boolean> {
        let config = new MdDialogConfig();
        
        let ref = this._mdDialog.open(ConfirmDeleteDialogComponent, config);
        ref.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.delete.emit(result);
            }
        });
        return ref.afterClosed();
    }

}