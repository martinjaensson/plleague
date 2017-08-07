import { EffectsModule } from '@ngrx/effects';

import { ErrorEffects } from './error.effects'; 
import { SessionEffects } from './session.effects'; 
import { OrdersEffects } from './orders.effects';
import { OrderEffects } from './order.effects';
import { ComboboxItemsEffects } from './comboboxitems.effects';

export const EFFECTS = [
    EffectsModule.runAfterBootstrap(ErrorEffects),
    EffectsModule.run(SessionEffects),
    EffectsModule.run(OrdersEffects),
    EffectsModule.run(OrderEffects),
    EffectsModule.run(ComboboxItemsEffects)
];