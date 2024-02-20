import { AbstractControl } from "@angular/forms";



export function usernameValidation(control : AbstractControl) : {[key:string]:any}|null
{
    var phn=/admin/;
    const checkName = phn.test(control.value);
    console.log(checkName);
    return checkName ?  {'usernameFailed':{value:control.value}} : null ;
}