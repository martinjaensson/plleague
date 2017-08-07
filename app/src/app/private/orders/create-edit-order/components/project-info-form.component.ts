import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderService, ComboboxItemsService } from '../../../../core/services';
import { ComboboxItem, ComboboxItemType, Project, Order } from '../../../../core/models';
import { ComboboxItemsState,OrderState } from '../../../../core/state';

@Component({
    selector: 'project-info-form',
    templateUrl: './project-info-form.component.html',
    styleUrls: ['./project-info-form.component.scss'],
})
export class ProjectInfoFormComponent implements OnInit, OnChanges {
    private form: FormGroup;
    private projectsComboboxItems$: Observable<ComboboxItem[]>;
    private mainProjectLeadersComboboxItems$: Observable<ComboboxItem[]>;
    private usersComboboxItems$: Observable<ComboboxItem[]>;
    private comboboxItemsState$: Observable<ComboboxItemsState>;
    private order$: Observable<Order>;
    private orderState$: Observable<OrderState>;

    @Input()
    project: Project;

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
            'id': [null, [Validators.required]],
            'name': [null, [Validators.required]],
            'projectLeaderNo': [null, ],
            'endCustomerNo': [null, ],
            'oemNo': [null, ],
            'agentNo': [null, ],
            'comment': [null, ]
        });
    }

    // *** INIT ***
    ngOnInit() {
        this.initComboboxItems();
        this.initOrder();
    }

    initComboboxItems(): void {
        // Loading comboboxitems in order-info-form
        this.comboboxItemsState$ = this._comboboxItemsService.get();
        this.projectsComboboxItems$ = this.comboboxItemsState$.map(s => s.projects.list);
        this.mainProjectLeadersComboboxItems$ = this.comboboxItemsState$.map(s => s.employees.list);
        this.usersComboboxItems$ = this.comboboxItemsState$.map(s => s.users.list);
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
        if('project' in changes && !!this.disabled) {
            this.update();
        }
    }

    cancelForm(): void {
        this.cancel.emit(true);
        this.update();
    }

    update(): void {
        if (!this.project)
            this.form.reset()
        else
            this.form.patchValue(this.project);
    }

    updateDisabledState(): void {
        if (this.disabled)
            this.form.disable();
        else
            this.form.enable();
    }

    saveForm(): void {
        this.save.emit({ ...this.project, ...this.form.value }); 
    }

    changeProject(project: any) {
        this.form.patchValue(project);
    }

}