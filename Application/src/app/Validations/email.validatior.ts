import { AbstractControl } from "@angular/forms";



export function emailValidation(control : AbstractControl) : {[key:string]:any}|null
{
    var regex=/^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
    const checkEmail = regex.test(control.value);
    console.log(checkEmail);
    return checkEmail ?  null : {'emailFailed':{value:control.value}};
}