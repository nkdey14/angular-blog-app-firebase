import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);

  constructor() {}

  createBlogPost(title: string, content: string) {
    const postDocumentReference = doc(
      this.fireStore,
      'blog-posts',
      'this-is-a-title-123',
    );

    //Step 3
    setDoc(postDocumentReference, {
      title: title,
      content: content,
      publishedOn: new Date(),
    });
  }
}
