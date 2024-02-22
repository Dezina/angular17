import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { ThemePalette } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-learn-angular',
  standalone: true,
  imports: [MatTabsModule, MatGridListModule, MatChipsModule],
  templateUrl: './learn-angular.component.html',
  styleUrl: './learn-angular.component.css'
})
export class LearnAngularComponent {

  suggestions: ChipColor[] = [
    { name: 'Angular Material', color: 'primary' },
    { name: 'RxJS', color: 'accent' },
    { name: 'Forms and Validation', color: 'warn' },
    { name: 'Services and Dependency Injection', color: undefined },
    { name: 'Angular Routing', color: 'primary' },
    { name: 'NgRx (State Management)', color: 'accent' },
    { name: 'Angular Animations', color: 'warn' }
  ];


}
