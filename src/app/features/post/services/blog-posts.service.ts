import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { BlogPostHelper } from 'src/app/helper/blogposts-helper';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedOn?: Date | { toDate: () => Date };
}

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);
  private storage = inject(Storage);

  // Fetch all posts from Firestore
  getAllBlogPosts(): Observable<BlogPost[]> {
    const blogPostsCollection = collection(this.fireStore, 'blog-posts');

    const postsQuery = query(
      blogPostsCollection,
      orderBy('publishedOn', 'desc'),
    );

    return collectionData(postsQuery, {
      idField: 'id',
    }) as Observable<BlogPost[]>;
  }

  // Create a new blog post
  async createBlogPost(
    title: string,
    content: string,
    image: File | null,
  ): Promise<BlogPost> {
    const slug = BlogPostHelper.createSlug(title);

    const postDocumentReference = doc(this.fireStore, 'blog-posts', slug);

    let imageUrl = '';

    // Upload image to Firebase Storage
    if (image) {
      const fileName = `${slug}-${Date.now()}-${image.name}`;

      const storageReference = ref(this.storage, `images/${fileName}`);

      await uploadBytes(storageReference, image);

      imageUrl = await getDownloadURL(storageReference);
    }

    const postData = {
      title,
      content,
      imageUrl,
      publishedOn: new Date(),
    };

    await setDoc(postDocumentReference, postData);

    return {
      id: slug,
      ...postData,
    };
  }
}
