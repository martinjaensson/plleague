import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../utils';

export const ActionTypes = {
    SET_SEARCH:                 type('[OrdersFilter] SET_SEARCH'),
    CLEAR:                      type('[OrdersFilter] CLEAR')
};


export class SetSearch implements Action {
    type = ActionTypes.SET_SEARCH;

    constructor(public payload: string) {}
}

export class Clear implements Action {
    type = ActionTypes.CLEAR;
}