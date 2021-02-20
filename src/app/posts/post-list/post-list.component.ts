import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
 // @Input() posts : Post[] =[];
  posts : Post[] = [];
  isLoading = false;
  private postSub : Subscription;

  constructor(private postService : PostsService) {

  }

  ngOnInit() {
    //this.posts = this.postService.getPosts();
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener()
    .subscribe((posts : Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  /*posts = [
    {title : 'First Post', content : 'This is the first post\'s content'},
    {title : 'Second Post', content : 'This is the second post\'s content'},
    {title : 'Third Post', content : 'This is the third post\'s content'},
  ];*/

  onDelete(postId : string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
