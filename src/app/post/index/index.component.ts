import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  posts: Post[] = [];

  constructor(public postService: PostService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.postService.getAll().subscribe((data: Post[]) => {
        this.posts = data;
        console.log('posts', this.posts)
      })
    }, 1000)
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  }
}