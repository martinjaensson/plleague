import { ComboboxItems } from '../../models';

export interface ComboboxItemsState {
    loading: boolean;
    projects: ComboboxItems;
    employees: ComboboxItems;
    users: ComboboxItems;
    orderStatus: ComboboxItems;
    orderTypes: ComboboxItems;
    incomeTypes: ComboboxItems;
    customers: ComboboxItems;
    paymentTerms: ComboboxItems;
    currencies: ComboboxItems;
    departments: ComboboxItems;
    statisticsProducts: ComboboxItems;
}
