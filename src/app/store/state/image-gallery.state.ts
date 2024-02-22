import { ImageGalleryState } from '../reducers/image-gallery.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectImageGalleryState = createFeatureSelector<ImageGalleryState>('imageGallery');

export const selectImageGallery = createSelector(
  selectImageGalleryState,
  (state: ImageGalleryState) => state
);
