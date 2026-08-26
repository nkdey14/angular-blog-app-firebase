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

      alert('Failed to publish the post.');
    } finally {
      this.isSubmitting = false;
    }
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
