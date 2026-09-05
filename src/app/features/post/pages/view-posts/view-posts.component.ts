import { Component, inject } from '@angular/core';

import { BlogPost, BlogPostsService } from '../../services/blog-posts.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent {
  private blogPostsService = inject(BlogPostsService);

  posts$ = this.blogPostsService.getBlogPosts();

  deletingPostId: string | null = null;

  async deletePost(post: BlogPost): Promise<void> {
    if (!post.id) {
      return;
    }

    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${post.title}"?`,
    );

    if (!shouldDelete) {
      return;
    }

    try {
      this.deletingPostId = post.id;

      await this.blogPostsService.deleteBlogPost(post.id, post.imageUrl);
    } catch (error) {
      console.error('Error deleting blog post:', error);

      window.alert('Unable to delete the post. Please try again.');
    } finally {
      this.deletingPostId = null;
    }
  }

  trackPost(index: number, post: BlogPost): string | number {
    return post.id ?? index;
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
