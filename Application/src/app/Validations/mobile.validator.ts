import { AbstractControl } from "@angular/forms";



export function mobileValidation(control : AbstractControl) : {[key:string]:any}|null
{
    var phn=/^[6-9][0-9]{9}/;
    const checkEmail = phn.test(control.value);
    console.log(checkEmail);
    return checkEmail ?  null : {'mobileFailed':{value:control.value}};
}