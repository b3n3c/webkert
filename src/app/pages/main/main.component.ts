import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../shared/models/post.model";
import {PostService} from "../../shared/services/post.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  posts$: Observable<Post[]>;
  orderByOption: 'asc' | 'desc' = 'desc';

  constructor(private sanitizer: DomSanitizer, private postService: PostService) {
    this.posts$ = this.postService.getPosts();
  }

  onOrderByChange() {
    this.posts$ = this.postService.getPosts(this.orderByOption);
  }


  getVideoUrl(videoUrl: string): SafeResourceUrl {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
