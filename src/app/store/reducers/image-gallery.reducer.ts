import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/image-gallery.actions';

export interface ImageGalleryState {
  photos: any[];
  likedPhotos: string[];
  dislikedPhotos: string[];
}

export const initialState: ImageGalleryState = {
  photos: [],
  likedPhotos: [],
  dislikedPhotos: [],
};

export const imageGalleryReducer = createReducer(
  initialState,
  on(actions.displayPhotos, (state) => ({ ...state })),
  on(actions.displayPhotosSuccess, (state, action) => ({
    ...state,
    photos: action.photos.map(photo => ({
      ...photo,
      liked: state.likedPhotos.includes(photo.id) && !state.dislikedPhotos.includes(photo.id),
    })),
  })),
  on(actions.likePhoto, (state, { photoId }) => {
    if (!state.likedPhotos.includes(photoId)) {
      const updatedPhotos = state.photos.map(photo =>
        photo.id === photoId ? { ...photo, liked: true } : photo
      );

      return {
        ...state,
        likedPhotos: [...state.likedPhotos, photoId],
        dislikedPhotos: state.dislikedPhotos.filter(id => id !== photoId),
        photos: updatedPhotos,
      };
    }
    return state;
  }),
  on(actions.dislikePhoto, (state, { photoId }) => {
    const updatedPhotos = state.photos.map(photo =>
      photo.id === photoId ? { ...photo, liked: false } : photo
    );

    return {
      ...state,
      likedPhotos: state.likedPhotos.filter(id => id !== photoId),
      dislikedPhotos: [...state.dislikedPhotos, photoId],
      photos: updatedPhotos,
    };
  })
);
