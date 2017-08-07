import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {type} from '../utils';
import {Project} from '../../models';

export const ActionTypes = {
    LOAD :              type('[Projects] LOAD'),
    LOAD_SUCCESS :      type('[Projects] LOAD_SUCCESS'),
    LOAD_ERROR :        type('[Projects] LOAD_ERROR'),   
};

export class Load implements Action {
    type = ActionTypes.LOAD;
}

export class LoadSucces implements Action {
    type = ActionTypes.LOAD_SUCCESS;
}

export class LoadError implements Action {
    type = ActionTypes.LOAD_ERROR;
}