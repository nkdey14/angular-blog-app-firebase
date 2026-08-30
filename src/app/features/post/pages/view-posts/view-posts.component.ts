import { Component, inject } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { BlogPost, BlogPostsService } from '../../services/blog-posts.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css'],
})
export class ViewPostsComponent {
  private blogPostsService = inject(BlogPostsService);

  isLoading = true;
  errorMessage = '';

  posts$: Observable<BlogPost[]> = this.blogPostsService.getAllBlogPosts().pipe(
    tap(() => {
      this.isLoading = false;
    }),
    catchError((error) => {
      console.error('Error fetching blog posts:', error);

      this.isLoading = false;
      this.errorMessage = 'Unable to load posts. Please try again later.';

      return of([]);
    }),
  );

  getPublishedDate(
    publishedOn: Date | { toDate: () => Date } | undefined,
  ): Date | null {
    if (!publishedOn) {
      return null;
    }

    if (publishedOn instanceof Date) {
      return publishedOn;
    }

    return publishedOn.toDate();
  }

  trackPost(index: number, post: BlogPost): string | number {
    return post.id ?? index;
  }
}
