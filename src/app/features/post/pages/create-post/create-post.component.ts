import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BlogPostsService } from '../../services/blog-posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  private postService = inject(BlogPostsService);

  selectedImage: File | null = null;

  isSubmitting = false;
  errorMessage = '';

  createPostForm = new FormGroup({
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

  async createPost() {
    // Validate form
    if (this.createPostForm.invalid) {
      this.createPostForm.markAllAsTouched();

      return;
    }

    const { title, content } = this.createPostForm.getRawValue();

    if (!title || !content) {
      return;
    }

    try {
      this.isSubmitting = true;
      this.errorMessage = '';

      console.log('Creating post...');

      const createdPost = await this.postService.createBlogPost(
        title,
        content,
        this.selectedImage,
      );

      console.log('Created post:', createdPost);

      // Reset form after successful submission
      this.createPostForm.reset();

      // Clear image
      this.selectedImage = null;

      alert('Post published successfully!');
    } catch (error) {
      console.error('Error creating blog post:', error);

      this.errorMessage = this.getCreatePostErrorMessage(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private getCreatePostErrorMessage(error: unknown): string {
    const errorCode =
      typeof error === 'object' && error !== null && 'code' in error
        ? error.code
        : '';

    if (errorCode === 'storage/quota-exceeded') {
      return 'Image storage is full. Remove the selected image or increase your Firebase Storage quota, then try again.';
    }

    return 'Failed to publish the post. Please try again.';
  }

  selectImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      console.log('Selected image:', this.selectedImage);
    } else {
      this.selectedImage = null;
    }
  }

  cancelPost() {
    this.createPostForm.reset();

    this.selectedImage = null;
  }
}
