import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  post: Post;
  loading = true;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchPost();
  }

  private fetchPost() {
    this.loading = true;
    const postId = this.route.snapshot.params.id;
      this.postsService.getPost(postId).subscribe(response => {
        this.loading = false;
        this.post = response.post;
      },
        (err) => {
          this.loading = false;
          this.post = null;
          let snackBarRef = this._snackBar.open(
            'Unsuccessful fetch',
            'Retry',
            { verticalPosition: 'top' }
          ).onAction().subscribe(() => {
            this.fetchPost();
          })
    })
  }

}
