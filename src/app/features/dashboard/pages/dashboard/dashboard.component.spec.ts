import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { DashboardStatisticsComponent } from './components/dashboard-statistics/dashboard-statistics.component';
import { BlogPostsService } from 'src/app/features/post/services/blog-posts.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, DashboardStatisticsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: BlogPostsService,
          useValue: {
            getBlogPosts: () => of([]),
            deleteBlogPost: () => Promise.resolve(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('converts a Firestore timestamp to a date', () => {
    const timestamp = {
      seconds: 1787545537,
      nanoseconds: 388000000,
    };

    expect(component.getPublishedDate(timestamp as never)).toEqual(
      new Date(1787545537388),
    );
  });
});
