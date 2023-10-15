import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class InputFileType extends Validators {
  /**
   * custom validator to validate input file type
   * @function
   * @name validateFileType
   * @param acceptedFileTypes: string[]
   * @returns object || null
   */
  static validateFileType(acceptedFileTypes: string[]): ValidatorFn {
    return(control: AbstractControl): {[ key: string ]: boolean } | null => {
      if (control.value) {
        let filePath = control.value;
        let fileType: string = filePath.slice(filePath.lastIndexOf('.') + 1);

        if(acceptedFileTypes.includes(fileType)) {
          return null;
        } else {
          return {
            'invalidFileType': true
          }
        }
      } else {
        return null;
      }
    }
  }
}
