import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../utils';
import { ComboboxItems, Project } from '../../models';

export const ActionTypes = {
  LOAD :             type('[ComboboxItems] LOAD'), 
  LOAD_SUCCESS :     type('[ComboboxItems] LOAD_SUCCESS'),
  LOAD_ERROR :       type('[ComboboxItems] LOAD_ERROR')
};

/**
 * Load
 */
export class Load implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: number[]) { }
}

export class LoadSuccess implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: ComboboxItems[]) {}
}

export class LoadError implements Action {
    type = ActionTypes.LOAD_ERROR;
}

