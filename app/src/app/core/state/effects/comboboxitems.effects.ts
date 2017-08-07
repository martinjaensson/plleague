import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { BaseEffects } from './base.effects';
import { AppState } from '../';

import { ComboboxItemsResource } from '../../resources';

import * as comboboxItemsActions from '../actions/comboboxitems.actions';

@Injectable()
export class ComboboxItemsEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _comboboxItemsResource: ComboboxItemsResource) {
        super();
    }

    /**
     * Load trailers from API
     */
    @Effect()
    load$: Observable<Action> = this._actions$
        .ofType(comboboxItemsActions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(cbxItemTypeNo => {
            return this._comboboxItemsResource.list(cbxItemTypeNo)
                .map(res => new comboboxItemsActions.LoadSuccess(res))
                .catch(super.handleError(new comboboxItemsActions.LoadError()));
        });
}