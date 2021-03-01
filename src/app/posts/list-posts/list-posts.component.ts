import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts: Post[];
  allPostsCount = 0;
  pageSize = 10;
  displayedPosts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.allPostsCount = posts.length;
      // TODO: change to use dynamic pagination from the server
      this.displayedPosts = posts.slice(0, this.pageSize);
    });
  }

  onPageChange(pageData: PageEvent) {
    // TODO: change to use dynamic pagination from the server
    let startSlice = pageData.pageIndex * this.pageSize;
    this.displayedPosts = this.posts.slice(startSlice, startSlice + this.pageSize);
    this.pageSize = pageData.pageSize;
  }

}
