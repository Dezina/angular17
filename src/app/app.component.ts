import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IndexComponent } from "./post/index/index.component";
import { LoginComponent } from './components/login/login.component';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from '../app/store/actions/auth.actions';
import { selectAuthState } from '../app/store/state/auth.state';
import { AuthState } from './store/reducers/auth.reducer';

export interface Routes {
  id: number;
  route: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    GoogleMapsModule,
    IndexComponent,
    LoginComponent,
    RouterModule,]
})
export class AppComponent {
  title = 'my-angular-app';
  user: any;
  authData: AuthState | undefined;
  // private routes
  privateRoutes: Routes[] = [
    { id: 1, route: '/post/index', title: 'Post crud' },
    { id: 2, route: '/examples/learn', title: 'Learn angular 17' },
    { id: 3, route: '/examples/manage', title: 'Manage' },
    { id: 4, route: '/reactive-form', title: 'Reactive form' },
    { id: 5, route: '/examples/material-data', title: 'Angular material' },
    { id: 6, route: '/image-gallery', title: 'Image gallery' },
    { id: 7, route: '/animations', title: 'Animations' },
  ];
  // public routes
  publicRoutes: Routes[] = [
    { id: 1, route: '/login', title: 'Login' },
  ];

  // Subscribe to the auth$ observable
  private authSubscription: Subscription = new Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')

    // Subscribe to the auth$ observable
    this.authSubscription = this.store.pipe(
      select(selectAuthState),
    ).subscribe((authState) => {
      this.authData = authState;
    });
  }

  display: any;

  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 6;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.display = event.latLng.toJSON();
  }

  onLogout() {
    localStorage.removeItem('user')
    this.store.dispatch(actions.logout());
    this.router.navigateByUrl('/login')
  }
}
