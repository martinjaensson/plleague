import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { Order, Project, HourlyRateProduct, StatisticsProduct} from '../models';

import { CONFIG } from '../../../config';

@Injectable()
export class OrderResource extends ApiResource {

    constructor(private _http: Http) { 
        super();
    }

    list(): Observable<Order[]> {
        return this._http.get(`${CONFIG.api_url}/orders`)
            .map(res => super.mapResponse<Order[]>(res))
            .catch(super.mapError);
    }

    item(orderNo : number): Observable<Order> {
        return this._http.get(`${CONFIG.api_url}/order/` + orderNo)
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    saveProject(orderNo : number, project : Project): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/project/` + orderNo + `/save`, JSON.stringify(project))
            .map(res => super.mapResponse<Project>(res))
            .catch(super.mapError);
    }

    saveOrder(order: Order): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/order/` + order.id + `/save`, JSON.stringify(order))
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }
    
    saveCustomer(order: Order): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/customer/` + order.id + `/save`, JSON.stringify(order))
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    savePaymentPlan(order: Order): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/paymentplan/` + order.id + `/save`, JSON.stringify(order))
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    addPaymentPlan(payLoad: [number,number]): Observable<Order> {
        return this._http.get(`${CONFIG.api_url}/paymentplan/` + payLoad[0] + `/add/` + payLoad[1])
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    deletePaymentPlan(payLoad: [number,number]): Observable<Order> {
        return this._http.get(`${CONFIG.api_url}/paymentplan/` + payLoad[0] + `/delete/` + payLoad[1])
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    saveHourlyRateProduct(payLoad: [number,HourlyRateProduct]): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/hourlyrateproduct/` + payLoad[0] + `/save/`, JSON.stringify(payLoad[1]))
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    saveStatisticsProduct(payLoad: [number, StatisticsProduct]): Observable<Order> {
        return this._http.post(`${CONFIG.api_url}/statisticsproduct/` + payLoad[0] + `/save`, JSON.stringify(payLoad[1]))
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    addStatisticsProduct(payLoad: [number, number]): Observable<Order> {
        return this._http.get(`${CONFIG.api_url}/statisticsproduct/` + payLoad[0] + `/add/` + payLoad[1])
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    deleteStatisticsProduct(payLoad: [number, number]): Observable<Order> {
        return this._http.get(`${CONFIG.api_url}/statisticsproduct/` + payLoad[0] + `/delete/` + payLoad[1])
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    createNewOrder(): Observable<number> {
        return this._http.get(`${CONFIG.api_url}/createneworder`)
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }

    deleteOrder(orderNo: number): Observable<boolean> {
        return this._http.get(`${CONFIG.api_url}/deleteorder/` + orderNo)
            .map(res => super.mapResponse<Order>(res))
            .catch(super.mapError);
    }



}