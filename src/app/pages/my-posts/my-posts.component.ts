import {Component} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {PostService} from "../../shared/services/post.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();
  orderByOption: 'asc' | 'desc' = 'desc';
  user = JSON.parse(localStorage.getItem('user') as string);

  constructor(private sanitizer: DomSanitizer, private postService: PostService, private router: Router) {

    this.loadPosts(this.user.uid);
  }

  async loadPosts(uid: string, orderByDirection: 'asc' | 'desc' = 'desc') {
    try {
      const posts = await this.postService.getPostsByUid(uid, orderByDirection);
      this.postsSubject.next(posts);
    } catch (error) {
      console.error('Error loading posts: ', error);
    }
  }

  onOrderByChange() {
    this.loadPosts(this.user.uid, this.orderByOption);
  }

  editPost(post: Post): void {
    this.router.navigate(['/edit-post', post.post_id]);
  }

  async deletePost(post: Post): Promise<void> {
    console.log(post);
    const user = JSON.parse(localStorage.getItem('user') as string);
    try {
      await this.postService.deletePost(post.post_id!);
      await this.loadPosts(user.uid);
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  }

  getVideoUrl(videoUrl: string): SafeResourceUrl {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
