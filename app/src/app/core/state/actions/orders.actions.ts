import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../utils';
import { Order, Project} from '../../models';

export const ActionTypes = {
  LOAD :                          type('[Orders] LOAD'), 
  LOAD_SUCCESS :                  type('[Orders] LOAD_SUCCESS'),
  LOAD_ERROR :                    type('[Orders] LOAD_ERROR'),
  PAGE_PREV:                      type('[Orders] PAGE_PREV'),
  PAGE_NEXT:                      type('[Orders] PAGE_NEXT'), 
  PAGE_SET:                       type('[Orders] PAGE_SET'),
  CREATE_NEW_ORDER:               type('[Orders] CREATE_NEW_ORDER'),
  CREATE_NEW_ORDER_SUCCESS:       type('[Orders] CREATE_NEW_ORDER_SUCCESS'), 
  CREATE_NEW_ORDER_ERROR:         type('[Orders] CREATE_NEW_ORDER_ERROR'),
};

/**
 * Load
 */
export class Load implements Action {
    type = ActionTypes.LOAD;
}

export class LoadSuccess implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Order[]) {}
}

export class LoadError implements Action {
    type = ActionTypes.LOAD_ERROR;
}


/**
 * Page
 */

export class PageSet {
    type = ActionTypes.PAGE_SET;

    constructor(public payload: number) {}
}

export class PageNext {
    type = ActionTypes.PAGE_NEXT;
}

export class PagePrev {
    type = ActionTypes.PAGE_PREV;
}



/**
 * Create New Order
 */

export class CreateNewOrder {
    type = ActionTypes.CREATE_NEW_ORDER;
}

export class CreateNewOrderSuccess {
    type = ActionTypes.CREATE_NEW_ORDER_SUCCESS;
    constructor(public payload: number) {}
}

export class CreateNewOrderError {
    type = ActionTypes.CREATE_NEW_ORDER_ERROR;
}

