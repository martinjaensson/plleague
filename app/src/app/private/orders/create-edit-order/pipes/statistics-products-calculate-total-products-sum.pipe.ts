import { PipeTransform, Pipe } from '@angular/core';
import { StatisticsProduct } from '../../../../core/models';

@Pipe({
    name: 'calculateTotalStatisticsProductsSum',
    pure: false
})
export class StatisticsProductsCalculateTotalSumPipe implements PipeTransform {
    transform(statisticsProducts: StatisticsProduct[]): number {
        if (statisticsProducts == null) {
            return null;
        }
        let sum = 0;
        statisticsProducts.map(p => sum += Number(p.sum))
        return sum; 
    }
}
