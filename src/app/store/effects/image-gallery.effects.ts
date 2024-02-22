import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as actions from '../actions/image-gallery.actions';
import { ImageGalleryService } from '../../services/image-gallery.service';

@Injectable()
export class ImageGalleryEffects {

  displayPhotos$ = createEffect(() => {
    return this.actions$.pipe(ofType(actions.displayPhotos), 
    mergeMap(() => {
    
        return this.imageGalleryService.getPhotos().pipe(
          map((photos) => {
            return actions.displayPhotosSuccess({photos});
          })  // Use correct payload structure
        );
    })
    );
  });

  // Additional effects for like and dislike actions
  likeDislikePhoto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.likePhoto, actions.dislikePhoto),
      mergeMap((action) => {
        // You can call your service or perform any logic here
        // For now, just return an action to refresh the photos
        return [actions.displayPhotos()];
      })
    );
  });

  constructor(
    private actions$: Actions, 
    private imageGalleryService: ImageGalleryService
  ) {}
}
