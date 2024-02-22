import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Tile {
  id: number;
  cols: number;
  rows: number;
  color: string;
  cardTitle: string;
  cardSubtitle: string;
  imageUrl: string;
}

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatIconModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  tiles: Tile[] = [
    { id: 1, cols: 2, rows: 1, color: 'lightblue', cardTitle: 'Dog', cardSubtitle: 'Small', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { id: 2, cols: 1, rows: 2, color: 'lightgreen', cardTitle: 'Kitten', cardSubtitle: 'Cute', imageUrl: 'https://placekitten.com/300/200' },
    { id: 3, cols: 1, rows: 1, color: 'lightpink', cardTitle: 'Puppy', cardSubtitle: 'Adorable', imageUrl: 'https://wallpapers.com/images/featured/adorable-puppy-pictures-hjuvzpx69vvvlmtl.jpg' },
    { id: 4, cols: 2, rows: 1, color: '#DDBDF1', cardTitle: 'Sunset', cardSubtitle: 'Beautiful', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94sfC9VFe5ecvy6j_WAE_EN3-9vq7QaXFPA&usqp=CAU' },
  ];

  onLikeClick(tile: any) {
    console.log('Like clicked!');
  }

  onShareClick(tile: any) {
    console.log('Share clicked!');
  }

  shareOnFacebook(tile: any) {
    const url = encodeURIComponent(tile.shareUrl || window.location.href);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    this.openShareWindow(facebookShareUrl);
  }

  shareOnTwitter(tile: any) {
    const url = encodeURIComponent(tile.shareUrl || window.location.href);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
    this.openShareWindow(twitterShareUrl);
  }

  private openShareWindow(url: string) {
    window.open(url, '_blank', 'width=600,height=400');
  }
}
