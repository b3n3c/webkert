import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostService} from "../../shared/services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit{
  @Input() postId!: string;
  editPostForm!: FormGroup;
  post!: Post;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editPostForm = this.fb.group({
      title: [''],
      description: [''],
      videoUrl: ['']
    });

    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.loadPost(this.postId);
    });
  }

  loadPost(postId: string): void {
    this.postService.getPost(postId).subscribe(post => {
      this.post = post;
      this.editPostForm.patchValue({
        title: this.post.title,
        description: this.post.description,
        videoUrl: this.post.videoUrl
      });
    });
  }

  updatePost(): void {
    const updatedPost: Post = {
      ...this.post,
      ...this.editPostForm.value
    };

    this.postService.updatePost(this.postId, updatedPost)
      .then(() => {
        console.log('Post updated successfully!');
        this.router.navigate(['/my-posts']);
      })
      .catch(error => {
        console.error('Error updating post: ', error);
      });
  }
}
