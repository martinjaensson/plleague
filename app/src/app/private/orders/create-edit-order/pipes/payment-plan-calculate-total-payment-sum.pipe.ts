import { PipeTransform, Pipe } from '@angular/core';
import { PaymentPlan } from '../../../../core/models';

@Pipe({
    name: 'calculateTotalPaymentPlanSum',
    pure: false
})
export class PaymentPlanCalculateTotalPaymentSumPipe implements PipeTransform {
    transform(paymentplans: PaymentPlan[]): number {
        if (paymentplans == null) {
            return null;
        }
        let sum = 0;
        paymentplans.map(p => sum += Number(p.sum))
        return sum; 
    }
}
