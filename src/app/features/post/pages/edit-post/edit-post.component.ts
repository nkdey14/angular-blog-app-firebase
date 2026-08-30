import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { BlogPostsService } from '../../services/blog-posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  private blogPostsService = inject(BlogPostsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  postId = '';
  currentImageUrl = '';

  isLoading = true;
  isSaving = false;
  errorMessage = '';

  editPostForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!postId) {
      this.router.navigate(['/posts']);
      return;
    }

    this.postId = postId;

    this.blogPostsService
      .getBlogPostById(postId)
      .pipe(take(1))
      .subscribe({
        next: (post) => {
          if (!post) {
            this.errorMessage = 'Post not found.';
            this.isLoading = false;
            return;
          }

          this.editPostForm.patchValue({
            title: post.title,
            content: post.content,
          });

          this.currentImageUrl = post.imageUrl ?? '';
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading post:', error);

          this.errorMessage = 'Unable to load the post.';
          this.isLoading = false;
        },
      });
  }

  async updatePost(): Promise<void> {
    if (this.editPostForm.invalid) {
      this.editPostForm.markAllAsTouched();
      return;
    }

    const { title, content } = this.editPostForm.getRawValue();

    if (!title || !content) {
      return;
    }

    try {
      this.isSaving = true;
      this.errorMessage = '';

      await this.blogPostsService.updateBlogPost(this.postId, title, content);

      await this.router.navigate(['/posts']);
    } catch (error) {
      console.error('Error updating post:', error);

      this.errorMessage = 'Unable to update the post. Please try again.';
    } finally {
      this.isSaving = false;
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/posts']);
  }
}
