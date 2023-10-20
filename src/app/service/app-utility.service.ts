import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ObjectData } from '../model/ObjectData';

@Injectable({
  providedIn: 'root'
})
export class AppUtilityService {

  constructor() { }

  formatDate(ISODateString: string): string {
    let ISODate: Date = new Date(ISODateString);
    return ISODate.toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase();
  }

  formatTime(ISODateString: string): string {
    let ISODate: Date = new Date(ISODateString);
    return ISODate.toLocaleString('en-GB', { timeStyle: 'short', hour12: true }).toUpperCase();
  }

  /**
   * @function setInputDate
   * @param dateDD
   * @param dateMM 
   * @param dateYY 
   * @param timeHH 
   * @param timeMM 
   * @param timeAMPM 
   * @returns Provide date in string type, in YYYY:MM:DD:HH:MM format by combining the all the parameters.
   */
  setInputDate(dateDD: string, dateMM: string, dateYY: string, timeHH: string, timeMM: string, timeAMPM: string) {
    let HH24String = '';

    if (timeHH && timeAMPM) {
      let HH24 = timeAMPM == 'PM' ? +timeHH + 12 : +timeHH;
      HH24String = HH24 == 24 ? '00' : HH24.toString();
    }

    return dateYY + ':' + String(+dateMM - 1).padStart(2, '0') + ':' + String(dateDD).padStart(2, '0') + ':' + String(HH24String).padStart(2, '0') + ':' + String(timeMM).padStart(2, '0');
  }

  /**
   * @function setDate
   * @param dateDD 
   * @param dateMM 
   * @param dateYY 
   * @param timeHH 
   * @param timeMM 
   * @param timeAMPM 
   * @returns Provide date in string type, in YYYY-MM-DD HH:MM format by combining the all the parameters.
   */
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

  returnDate(dateString: string) {
    return new Date(dateString).toLocaleString('en-GB', { dateStyle: "short" }).toUpperCase() + ", " + new Date(dateString).toLocaleString('default', { hour12: true, timeStyle: "short" });
  }

  checkDateInBetween(fromDate: Date, comparedDate: Date, toDate: Date) {
    if (fromDate.getTime() <= comparedDate.getTime() && toDate.getTime() >= comparedDate.getTime()) {
      return true;
    } else {
      return false;
    }
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

  sortArrayOfObjectByProperty(order: string, propertyName: string) {
    return function (a: any, b: any) {
      switch (order) {
        case 'ASC':
          return ((a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0) * 1;
          break;
        case 'DEC':
          return ((a[propertyName] > b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0) * 1;
          break;
      }

      return 0;
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

  /**
   * @function
   * @description Pad the number with '0' at the beginning.
   * @param number Number to be padded with '0'.
   * @param place Amount of '0' to be padded.
   * @returns Padded number with '0' in string type.
   */
  zeroPadToNumber(number: number, place: number) {
    return String(number).padStart(place, '0');
  }

  /**
   * @function
   * @description Extract the Red, Green & Blue (RGB) value from the hex code value.
   * @name hexCodeToRGB
   * @param hexCodeColor e.g: #000
   * @return Return the RGB value of the hex color code.
   */
  hexCodeToRGB(hexCodeColor: string): number[] {
    let color = hexCodeColor.replace('#', '');

    /**
     * - Check hex color code length (true - shorthand).
     * ~ e.g: #000
     * $ Double the hex color code value.
     */
    if (color.length < 4) {
      color = color + color;
    }

    let rgb: number[] = [
      parseInt(color.substring(1, 2), 16),
      parseInt(color.substring(3, 2), 16),
      parseInt(color.substring(5, 2), 16)
    ];
    
    return rgb;
  }

  /**
   * @function
   * @description Provide color that has sufficient contrast to the accepted color (e.g: background-color).
   * @name setContrast
   * @param hexCodeColor e.g: #000
   * @return Return color black (#000) or white (#fff) depending on the calculated value.
   */
  setContrast(hexCodeColor: string) {
    let rgb: number[] = this.hexCodeToRGB(hexCodeColor);

    // ~ https://www.w3.org/TR/AERT/#color-contrast
    const brightness = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
    return (brightness > 125) ? '#000' : '#fff';
  }
}
