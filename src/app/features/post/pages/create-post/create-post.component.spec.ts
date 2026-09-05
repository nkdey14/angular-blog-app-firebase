import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CreatePostComponent } from './create-post.component';
import { BlogPostsService } from '../../services/blog-posts.service';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: BlogPostsService,
          useValue: { createBlogPost: () => of(undefined) },
        },
      ],
    });
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a specific message when image storage quota is exceeded', async () => {
    const createBlogPost = jasmine.createSpy().and.rejectWith({
      code: 'storage/quota-exceeded',
    });
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      declarations: [CreatePostComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: BlogPostsService,
          useValue: { createBlogPost },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    component.createPostForm.setValue({
      title: 'Test title',
      content: 'This is enough content for the test post.',
    });

    await component.createPost();

    expect(component.errorMessage).toContain('Image storage is full.');
  });
});
