import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts: Post[];
  loading = true;
  allPostsCount = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private postsService: PostsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.loading = true;
    this.postsService.getPosts(this.pageSize, this.currentPage + 1).subscribe(postsData => {
      this.posts = postsData.posts;
      this.allPostsCount = postsData.postCount;
      this.loading = false;
    },
      err => {
        this.posts = [];
        this._snackBar.open(
          'Unsuccessful fetch',
          'Retry',
          { verticalPosition: 'top' }
        ).onAction().subscribe(() => {
          this.fetchPosts();
        });
        this.loading = false;
    });
  }

  onPageChange(pageData: PageEvent) {
    // TODO: change to use dynamic pagination from the server
    this.currentPage = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.fetchPosts();
  }

}
