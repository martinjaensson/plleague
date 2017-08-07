import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ComboboxItems } from '../../core/models';
import { AppState, ComboboxItemsState } from '../state/';

import * as comboboxItemsActions from '../state/actions/comboboxitems.actions';


@Injectable()
export class ComboboxItemsService {
    private _comboboxItemsState$: Observable<ComboboxItemsState>;

    constructor(private _store: Store<AppState>) {

        this._comboboxItemsState$ = this._store.select(state => state.comboboxItems);
    }
    
    load(cbxItemNumbers: number[]): void {
        this._store.dispatch(new comboboxItemsActions.Load(cbxItemNumbers));
    }

    get() : Observable<ComboboxItemsState> {
        return this._comboboxItemsState$;
    }
}