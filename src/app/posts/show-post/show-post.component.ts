import { Component, OnInit } from '@angular/core';
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

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parmMap: ParamMap) => {
      const postId = parmMap.get('id');
      this.postsService.getPost(postId).subscribe(response => {
        this.post = response.post;
      })
    })
  }

}
