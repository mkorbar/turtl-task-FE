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
  currentPage = 0;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.postsService.getPosts(this.pageSize, this.currentPage + 1).subscribe(postsData => {
      this.posts = postsData.posts;
      this.allPostsCount = postsData.postCount;
    });
  }

  onPageChange(pageData: PageEvent) {
    // TODO: change to use dynamic pagination from the server
    this.currentPage = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.fetchPosts();
  }

}
