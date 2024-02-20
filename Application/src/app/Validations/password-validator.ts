import { AbstractControl } from "@angular/forms";

export function passwordValidator(control : AbstractControl)  : {[key:string]:any} | null
{
    const pass = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(pass?.pristine || confirmPassword?.pristine)
    {
        return null;
    }

    return pass && confirmPassword && pass?.value != confirmPassword.value ? {'misMatch':true}:null;
}