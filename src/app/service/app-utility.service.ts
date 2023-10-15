import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ObjectData } from '../model/ObjectData';

@Injectable({
  providedIn: 'root'
})
export class AppUtilityService {

  constructor() { }

  /**
   * https://jsdoc.app/index.html
   * fix date timezone
   * @function
   * @name fixDateTimezone
   * @param date
   * @returns Date
   */
  fixDateTimezone(date: Date): Date {
    return date;
  }

  formatDate(ISODateString: string): string {
    let ISODate: Date = new Date(ISODateString);
    return ISODate.toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase();
  }

  formatTime(ISODateString: string): string {
    let ISODate: Date = new Date(ISODateString);
    return ISODate.toLocaleString('en-GB', { timeStyle: 'short', hour12: true }).toUpperCase();
  }

  setInputDate(dateDD: string, dateMM: string, dateYY: string, timeHH: string, timeMM: string, timeAMPM: string) {
    let HH24String = '';

    if (timeHH && timeAMPM) {
      let HH24 = timeAMPM == 'PM' ? +timeHH + 12 : +timeHH;
      HH24String = HH24 == 24 ? '00' : HH24.toString();
    }

    return dateYY + ':' + String(+dateMM - 1).padStart(2, '0') + ':' + String(dateDD).padStart(2, '0') + ':' + String(HH24String).padStart(2, '0') + ':' + String(timeMM).padStart(2, '0');
  }

  setDate(dateDD: string, dateMM: string, dateYY: string, timeHH: string, timeMM: string, timeAMPM: string) {
    let HH24String = '';

    if (timeHH && timeAMPM) {
      let HH24 = timeAMPM == 'PM' ? +timeHH + 12 : +timeHH;
      HH24String = HH24 == 24 ? '00' : HH24.toString();
    }

    return dateYY + '-' + dateMM + '-' + dateDD + ' ' + HH24String + ':' + timeMM;
  }

  fixDateOffset(dateString: string) {
    let date = new Date(dateString);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  }

  returnFormattedDate(ISODate: Date) {
    let date = ISODate.toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase()
    let time = new Intl.DateTimeFormat('default', { hour12: true, hour: 'numeric', minute: 'numeric' }).format(ISODate);
    
    return date + ", " + time;
  }

  /**
   * function display PDF file
   * @function
   * @name onDisplayFile
   * @param base64String
   */
  onDisplayFile(base64String: string): void {
    let pdfArrayBuffer = this.convertBase64ToArrayBuffer(base64String);
    let pdfFile = new Blob([pdfArrayBuffer], {type:'application/pdf'});
    let pdfFileURL = URL.createObjectURL(pdfFile);
    
    window.open(pdfFileURL, "_blank");
  }

  /**
   * function to convert base64 string into arrayBuffer
   * @function
   * @name convertBase64ToArrayBuffer
   * @param base64String
   * @returns ArrayBufferLike
   */
  convertBase64ToArrayBuffer(base64String: string): ArrayBufferLike {
    let binaryString: string = window.atob(base64String);
    let binaryStringLength: number = binaryString.length;

    let bytes = new Uint8Array(binaryStringLength);

    for (let i = 0; i < binaryStringLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  onOpenURLNewWindow(URL: string) {
    window.open(URL, "_blank");
  }

  isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  isObjectNotEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length !== 0;
  }

  checkFormGroupValid(formGroup: FormGroup, formControlName: string, errorType: string, submitStatus: boolean): boolean {
    let formControl = this.getFormControl(formGroup, formControlName);
    const { dirty, touched, errors } = formControl;
    return formControl.hasError(errorType) && ((dirty && touched && (errors ? true : false)) || submitStatus) ;
  }

  checkFormGroupHasError(formGroup: FormGroup, formControlName: string, errorType: string) {
    return this.getFormControl(formGroup, formControlName).hasError(errorType);
  }

  checkFormGroupSubmitted(formGroup: FormGroup, formControlName: string, submitStatus: boolean) {
    const { dirty, touched, errors } = this.getFormControl(formGroup, formControlName);
    return (dirty && touched && errors) || submitStatus;
  }

  getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
    return formGroup.get(formControlName) as FormControl;
  }

  sortArrayOfObjectByProp(propertyName: string) {
    let sortOrder: number = 1;

    if(propertyName[0] === "-") {
      sortOrder = -1;
      propertyName = propertyName.substring(1);
    }

    return function (a: any,b: any) {
      let result = (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  capitalizeString(wordString: string) {
    const words: string[] = wordString.toLowerCase().split(' ');

    return words.map((word: string) => { 
      return word[0].toUpperCase() + word.substring(1); 
    }).join(' ');
  }

  sortObjectAscByProperty(propertyName: string) {
    return function (a: any, b: any) {
      return ((a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0) * 1;
    }
  }

  generateData(objects: ObjectData[]) {
    const data = new FormData();

    objects.forEach((object: ObjectData) => {
      switch (object.objectFormat) {
      case 'JSON':
        data.append(object.objectName!, new Blob([JSON.stringify(object.object)], {
          type: 'application/json',
        }));
        break;
      default:
        data.append(object.objectName!, object.object)
        break;
      }
    });

    return data;
  }

  textEllipsis(str: string, maxLength: number, { side = "END", ellipsis = "..." } = {}) {
    if (str.length > maxLength) {
      switch (side) {
        case "STR":
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case "END":
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }
    return str;
  }
  
  downloadCSVFile(JSONData: any, objectArrayHeader: string[], fileHeader: string[], fileName: string) {
    let CSVData = this.convertToCSV(JSONData, objectArrayHeader, fileHeader);
    let blob = new Blob(['\ufeff' + CSVData], { type: 'text/csv;charset=utf-8;' });

    let downloadLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let safariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (safariBrowser) {
      downloadLink.setAttribute('target', '_blank');
    }
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', fileName);
    downloadLink.style.visibility = 'hidden';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  convertToCSV(objectArray: any, headerList: string[], headerName: string[]) {
    let JSONArray = typeof objectArray != 'object' ? JSON.parse(objectArray) : objectArray;
    let str = '';
    let row = 'Number, ';

    for (let index in headerName) {
      row += headerName[index] + ',';
    }

    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < JSONArray.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        
        if (head.includes('.')) {
          let heads = head.split('.');

          switch (heads.length) {
            case 2:
              if (JSONArray[i][heads[0]]) {
                line += ',' + this.replaceString(JSONArray[i][heads[0]][heads[1]]);
              }
              break;
            case 3:
              if (JSONArray[i][heads[0]]) {
                if (JSONArray[i][heads[0]][heads[1]]) {
                  line += ',' + this.replaceString(JSONArray[i][heads[0]][heads[1]][heads[2]]);
                }
              }
              break;
          }
        } else {
          line += ',' + this.replaceString(JSONArray[i][head]);
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  replaceString(data: any) {
    if (!data) {
      return ' ';
    }

    switch (typeof data) {
      case 'string':
        let removeComma = data.replace(/,/g, ' ');
        let removeNewLine = removeComma.replace(/(?:\r|\n|\r\n)/g, ' ');
        return removeNewLine;
        break;
      case 'undefined':
        return '-';
        break;
      case 'number':
        return data.toString();
        break;
      default:
        return data
        break;
    }
  }
}
