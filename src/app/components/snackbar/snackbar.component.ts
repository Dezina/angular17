import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {

    const panelClass = this.data.status === 'error' ? ['error-snackbar'] : ['success-snackbar'];

    this._snackBar.open(this.data.message, 'Close', {
      panelClass: panelClass,
    });

    setTimeout(() => {
      this.snackBarRef.dismiss();
    }, 5000); // Adjust the delay as needed
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
