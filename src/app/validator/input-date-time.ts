import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class InputDateTime extends Validators {
  static validateDateTime(): ValidatorFn {
    return(control: AbstractControl): {[ key: string ]: boolean } | null => {
      if (control.value) {
        let datetimeValue: string[] = control.value.split(':');
        
        const date = +datetimeValue[2];
        const month = +datetimeValue[1];
        const year = +datetimeValue[0];
        const hour = +datetimeValue[3];
        const minute = +datetimeValue[4];

        let inputDate = new Date();
        inputDate.setFullYear(year);
        inputDate.setMonth(month);
        inputDate.setDate(date);
        inputDate.setHours(hour);
        inputDate.setMinutes(minute);

        if (inputDate.getFullYear() == year && inputDate.getMonth() == month && inputDate.getDate() == date && inputDate.getHours() == hour && inputDate.getMinutes() == minute) {
          return null;
        } else {
          return {
            'invalidDateTime': true
          }
        }
      } else {
        return null;
      }
    }
  }
}
