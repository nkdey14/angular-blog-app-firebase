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

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  trackPost(index: number, post: BlogPost): string | number {
    return post.id || index;
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
