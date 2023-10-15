import { Component } from '@angular/core';
import { AppStateService } from 'src/app/service/app-state.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor( public appStateService: AppStateService) {}
}
