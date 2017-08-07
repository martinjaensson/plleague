import { ValidatorFn, AbstractControl } from "@angular/forms";

export function customValidator(matchValues: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlValue = control.value;
        
        console.log(controlValue);

        if (doesStringBContainsInArrayA(matchValues, controlValue)) {
            return null;
        }

        return { customValidator: { valid: false },};
    }
}

function doesStringBContainsInArrayA(a: string[], b: string) {
    var i = a.length;
    while (i--) {
       if (a[i] === b) {
           return true;
       }
    }
    return false;
}