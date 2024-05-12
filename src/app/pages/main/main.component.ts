import {Component, inject} from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
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
  sortedPosts$: Observable<Post[]>;
  orderByOption: string = 'desc';
  firestore: Firestore = inject(Firestore);

  constructor(private sanitizer: DomSanitizer, private postService: PostService) {
    this.posts$ = this.postService.getPosts();
    this.sortedPosts$ = this.posts$;
  }

  onOrderByChange() {
    switch (this.orderByOption) {
      case 'desc':
        this.sortedPosts$ = this.posts$.pipe(
          map(posts => posts.sort((a, b) => {
            const aDate = a.date.split('-').map(Number);
            const bDate = b.date.split('-').map(Number);
            return new Date(bDate[0], bDate[1] - 1, bDate[2]).getTime() - new Date(aDate[0], aDate[1] - 1, aDate[2]).getTime();
          }))
        );
        break;
      case 'asc':
        this.sortedPosts$ = this.posts$.pipe(
          map(posts => posts.sort((a, b) => {
            const aDate = a.date.split('-').map(Number);
            const bDate = b.date.split('-').map(Number);
            return new Date(aDate[0], aDate[1] - 1, aDate[2]).getTime() - new Date(bDate[0], bDate[1] - 1, bDate[2]).getTime();
          }))
        );
        break;
    }
  }


  getVideoUrl(videoUrl: string): SafeResourceUrl {
    const videoId = videoUrl.split('v=')[1];
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
