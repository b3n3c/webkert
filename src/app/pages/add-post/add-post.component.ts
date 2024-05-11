import { Component } from '@angular/core';
import {PostService} from "../../shared/services/post.service";
import {Post} from "../../shared/models/post.model";
import {FormControl} from "@angular/forms";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  title = new FormControl('');
  description = new FormControl('');
  videoUrl = new FormControl('');

  constructor(private router: Router, private postService: PostService) {}

  addPost(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log(user);
    const postData: Post = {
      title: this.title.value ? this.title.value : '',
      description: this.description.value ? this.description.value : '',
      videoUrl: this.videoUrl.value ? this.videoUrl.value : '',
      userUID: user.uid,
      date: new DateFormatPipe().transform(new Date())
    };

    this.postService.addPost(postData)
      .then(() => {
        this.router.navigateByUrl('/main');
      })
      .catch(error => {
        console.error('Error adding post: ', error);
      });
  }
}
