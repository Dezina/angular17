import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from '../../store/actions/auth.actions';
import { selectAuthState } from '../../store/state/auth.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  id!: number;
  credentials!: any;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.credentials = {
      email: 'user@test.com',
      password: 'test123'
    }
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {

    if (this.form.value.email === 'user@test.com' && this.form.value.password === 'test123') {
      localStorage.setItem('user', this.form.value.email)
      this.store.dispatch(actions.login({ email: this.form.value.email, password: this.form.value.password }));
      this.router.navigateByUrl('/post/index')
    }
    else {

      this.router.navigate(['/login']);
      this.snackbarService.open("Error: Invalid login credentials", "error")
    }
  }

}
