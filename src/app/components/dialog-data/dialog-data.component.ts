import { Component, Inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

// Define the DialogData interface
interface DialogData {
  imageUrl: string;
}

@Component({
  selector: 'app-dialog-data',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatGridListModule],
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
