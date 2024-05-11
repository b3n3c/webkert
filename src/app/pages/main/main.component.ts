import {Component, inject} from '@angular/core';
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Post} from "../../shared/models/post.model";
import {Router} from "@angular/router";
import {PostService} from "../../shared/services/post.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  posts$: Observable<Post[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private sanitizer: DomSanitizer, private postService: PostService, private router: Router) {
    this.posts$ = this.postService.getPosts();
  }

  editPost(post: Post): void {
    console.log(post);
    this.router.navigate(['/edit-post', post.post_id]);
  }

  getVideoUrl(videoUrl: string): SafeResourceUrl {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
