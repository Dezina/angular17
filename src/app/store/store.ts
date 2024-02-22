import { ActionReducerMap } from '@ngrx/store';
import * as fromImageGallery from './reducers/image-gallery.reducer';
import * as fromImageGalleryEffects from './effects/image-gallery.effects';
import * as fromAuth from './reducers/auth.reducer';
import * as fromAuthEffects from './effects/auth.effects';

export interface AppState {
  imageGallery: fromImageGallery.ImageGalleryState;
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  imageGallery: fromImageGallery.imageGalleryReducer,
  auth: fromAuth.authReducer,
};

export const effects = [
  fromImageGalleryEffects.ImageGalleryEffects,
  fromAuthEffects.AuthEffects
];

export const initialState: AppState = {
  imageGallery: fromImageGallery.initialState,
  auth: fromAuth.initialAuthState
};
