import { Component } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  colorSize: number = 4;

  setBGColor(event: any) {
    let colorContainer = event.target.parentElement.parentElement as HTMLDivElement;
    let colorHexCode: string = '';
    if (event.target.value) {
      colorHexCode = event.target.value.replace('#', '');
    } else {
      colorHexCode = 'fff';
    }
    colorContainer.style.backgroundColor = `#${colorHexCode}`;
  }
}
