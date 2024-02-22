import { createAction, props } from '@ngrx/store';

export const displayPhotos = createAction('[Image Gallery] Display Photos');
export const displayPhotosSuccess = createAction('[Image Gallery] Display Photos Success', props<{photos: any[]}>());
export const likePhoto = createAction('[Image Gallery] Like Photo', props<{ photoId: string }>());
export const dislikePhoto = createAction('[Image Gallery] Dislike Photo', props<{ photoId: string }>());
