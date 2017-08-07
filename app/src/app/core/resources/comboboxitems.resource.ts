import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { ComboboxItems } from '../models';

import { CONFIG } from '../../../config';

@Injectable()
export class ComboboxItemsResource extends ApiResource {

    constructor(private _http: Http) { 
        super();
    }

    list(cbxItemTypeNumbers : number[]): Observable<ComboboxItems[]> {
        return this._http.post(`${CONFIG.api_url}/comboboxitems` , JSON.stringify(cbxItemTypeNumbers))
            .map(res => super.mapResponse<ComboboxItems[]>(res))
            .catch(super.mapError);
    }
}