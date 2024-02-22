import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as actions from '../../store/actions/image-gallery.actions';
import { ImageGalleryService } from '../../services/image-gallery.service';
import { selectImageGallery } from '../../store/state/image-gallery.state';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [MatIconModule, NgxImageZoomModule, MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {

  originalPhotos: any[] = [];  // Keep a copy of the original photos
  photos: any[] = []; // Initialize with an empty array or the default value
  likedPhotos: string[] = [];
  dislikedPhotos: string[] = [];

  private photosSubscription: Subscription = new Subscription;
  private likedPhotosSubscription: Subscription = new Subscription;
  private dislikedPhotosSubscription: Subscription = new Subscription;

  constructor(private store: Store, private imageGalleryService: ImageGalleryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(actions.displayPhotos());

    // Subscribe to the photos$ observable
    this.photosSubscription = this.store.pipe(
      select(selectImageGallery),
      select((state) => state.photos)
    ).subscribe((photos) => {
      this.photos = photos;
      this.originalPhotos = photos;
    });

    // Subscribe to the likedPhotos$ observable
    this.likedPhotosSubscription = this.store.pipe(
      select(selectImageGallery),
      select((state) => state.likedPhotos)
    ).subscribe((item) => {
      this.likedPhotos = item;
    });

    this.dislikedPhotosSubscription = this.store.pipe(
      select(selectImageGallery),
      select((state) => state.dislikedPhotos)
    ).subscribe((item) => {
      this.dislikedPhotos = item;
    });

  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.photosSubscription.unsubscribe();
    this.likedPhotosSubscription.unsubscribe();
    this.dislikedPhotosSubscription.unsubscribe();
  }

  likePhoto(photoId: string): void {
    this.store.dispatch(actions.likePhoto({ photoId }));
  }

  dislikePhoto(photoId: string): void {
    this.store.dispatch(actions.dislikePhoto({ photoId }));
  }
  onShareClick(photoId: any): void {
    console.log('Share clicked!');
  }
  isPhotoLiked(photoId: string): boolean {
    return this.likedPhotos.includes(photoId);
  }

  // Zoom image
  openDialog(photo: any) {
    this.dialog.open(DialogDataComponent, {
      data: {
        imageUrl: photo.urls.raw,
      },
    });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (filterValue === '') {
      this.photos = this.originalPhotos;  // Reset to the original unfiltered photos
    } else {
      this.photos = this.originalPhotos.filter(photo => photo.alt_description.toLowerCase().includes(filterValue));
    }
  }

}
