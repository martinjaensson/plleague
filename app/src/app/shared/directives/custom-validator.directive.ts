import { Directive, OnChanges, Input, SimpleChanges } from "@angular/core";
import { NG_VALIDATORS, Validator, Validators, AbstractControl } from "@angular/forms";

import { customValidator } from "../validators";

@Directive({
  selector: '[customValidator]',
  providers: [
        {
            provide: NG_VALIDATORS, 
            useExisting: CustomValidatorDirective, 
            multi: true
        }
    ]
})
export class CustomValidatorDirective implements Validator, OnChanges {
    
    @Input()
    customValidator: string[];

    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['customValidator'];
        if (change) {
            this.valFn = customValidator(this.customValidator);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }
 
    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }

}