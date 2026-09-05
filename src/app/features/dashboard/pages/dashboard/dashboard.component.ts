import { Component, inject } from '@angular/core';
import { BlogPost } from 'src/app/features/post/model/blogposts.model';
import { BlogPostsService } from 'src/app/features/post/services/blog-posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private blogPostService = inject(BlogPostsService);

  posts: BlogPost[] = [];
  failedImagePostIds = new Set<string>();
  deletingPostId: string | null = null;

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  trackPost(index: number, post: BlogPost): string | number {
    return post.id || index;
  }

  getPublishedDate(publishedOn: BlogPost['publishedOn']): Date | null {
    if (!publishedOn) {
      return null;
    }

    if (publishedOn instanceof Date) {
      return publishedOn;
    }

    const timestamp = publishedOn as unknown as {
      toDate?: () => Date;
      seconds?: number;
      nanoseconds?: number;
    };

    if (timestamp.toDate) {
      return timestamp.toDate();
    }

    if (typeof timestamp.seconds === 'number') {
      return new Date(
        timestamp.seconds * 1000 + (timestamp.nanoseconds ?? 0) / 1_000_000,
      );
    }

    return null;
  }

  hasFailedImage(post: BlogPost): boolean {
    return post.id ? this.failedImagePostIds.has(post.id) : false;
  }

  handleImageError(post: BlogPost): void {
    if (post.id) {
      this.failedImagePostIds.add(post.id);
    }
  }

  async deletePost(post: BlogPost): Promise<void> {
    if (!post.id || this.deletingPostId) {
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
      await this.blogPostService.deleteBlogPost(post.id, post.imageUrl);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      window.alert('Unable to delete the post. Please try again.');
    } finally {
      this.deletingPostId = null;
    }
  }
}
