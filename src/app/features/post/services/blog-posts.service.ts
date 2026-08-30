import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

import { BlogPostHelper } from 'src/app/helper/blogposts-helper';

// Blog post structure
export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedOn?: Date | { toDate: () => Date };
  updatedOn?: Date | { toDate: () => Date };
}

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);
  private storage = inject(Storage);

  // =================================================
  // GET ALL POSTS
  // =================================================

  getBlogPosts(): Observable<BlogPost[]> {
    const blogPostsCollection = collection(this.fireStore, 'blog-posts');

    const postsQuery = query(
      blogPostsCollection,
      orderBy('publishedOn', 'desc'),
    );

    return collectionData(postsQuery, {
      idField: 'id',
    }) as Observable<BlogPost[]>;
  }

  // =================================================
  // GET A SINGLE POST
  // =================================================

  getBlogPostById(postId: string): Observable<BlogPost | undefined> {
    const postDocumentReference = doc(this.fireStore, 'blog-posts', postId);

    return docData(postDocumentReference, {
      idField: 'id',
    }) as Observable<BlogPost | undefined>;
  }

  // =================================================
  // CREATE POST
  // =================================================

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

      const imageStorageReference = ref(this.storage, `images/${fileName}`);

      await uploadBytes(imageStorageReference, image);

      imageUrl = await getDownloadURL(imageStorageReference);
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

  // =================================================
  // UPDATE POST
  // =================================================

  async updateBlogPost(
    postId: string,
    title: string,
    content: string,
  ): Promise<void> {
    const postDocumentReference = doc(this.fireStore, 'blog-posts', postId);

    await updateDoc(postDocumentReference, {
      title,
      content,
      updatedOn: new Date(),
    });
  }

  // =================================================
  // DELETE POST
  // =================================================

  async deleteBlogPost(postId: string, imageUrl?: string): Promise<void> {
    const postDocumentReference = doc(this.fireStore, 'blog-posts', postId);

    // Delete the post from Firestore
    await deleteDoc(postDocumentReference);

    // Delete the associated image from Firebase Storage
    if (imageUrl) {
      try {
        const imageStorageReference = ref(this.storage, imageUrl);

        await deleteObject(imageStorageReference);
      } catch (error) {
        /*
         * The Firestore post has already been deleted.
         * Avoid failing the entire operation if the image is
         * already missing or Storage deletion is unavailable.
         */
        console.warn('Post deleted, but unable to delete its image:', error);
      }
    }
  }
}
