import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ViewPostsComponent } from './view-posts.component';
import { BlogPostsService } from '../../services/blog-posts.service';

describe('ViewPostsComponent', () => {
  let component: ViewPostsComponent;
  let fixture: ComponentFixture<ViewPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPostsComponent],
      providers: [
        {
          provide: BlogPostsService,
          useValue: { getBlogPosts: () => of([]) },
        },
      ],
    });
    fixture = TestBed.createComponent(ViewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks a post image as failed so the placeholder can render', () => {
    const post = {
      id: 'post-1',
      title: 'Test post',
      content: 'Test content',
      imageUrl: 'invalid-image-url',
      publishedOn: new Date(),
    };

    component.handleImageError(post);

    expect(component.hasFailedImage(post)).toBeTrue();
  });
});
