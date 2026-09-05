import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { BlogPostHelper } from 'src/app/helper/blogposts-helper';
import { BlogPost } from '../model/blogposts.model';

export { BlogPost } from '../model/blogposts.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);

  //Step 1 : for Image Upload
  private storage = inject(Storage);

  constructor() {}

  //Step 2: add image:File
  async createBlogPost(title: string, content: string, image: File | null) {
    const slug = BlogPostHelper.createSlug(title);
    const postDocumentReference = doc(this.fireStore, 'blog-posts', slug);
    //Step 3
    let imageUrl = '';

    //Step 4: Upload image if selected
    if (image) {
      const storageRef = ref(
        this.storage,
        `images/${slug}-${Date.now()}-${image.name}`,
      );

      //Step 5: get image url after upload
      await uploadBytes(storageRef, image, {
        contentType: image.type,
      });

      imageUrl = await getDownloadURL(storageRef);
    }

    await setDoc(postDocumentReference, {
      title,
      content,
      imageUrl,
      publishedOn: new Date(),
    });
  }

  getBlogPosts(): Observable<BlogPost[]> {
    const postsRef = collection(this.fireStore, 'blog-posts');

    return collectionData(postsRef, {
      idField: 'id',
    }) as Observable<BlogPost[]>;
  }

  getBlogPostById(id: string): Observable<BlogPost | undefined> {
    const postReference = doc(this.fireStore, 'blog-posts', id);

    return docData(postReference, { idField: 'id' }) as Observable<
      BlogPost | undefined
    >;
  }

  async updateBlogPost(
    id: string,
    title: string,
    content: string,
  ): Promise<void> {
    const postReference = doc(this.fireStore, 'blog-posts', id);

    await updateDoc(postReference, { title, content });
  }

  async deleteBlogPost(id: string, imageUrl: string): Promise<void> {
    const postReference = doc(this.fireStore, 'blog-posts', id);

    await deleteDoc(postReference);

    if (imageUrl) {
      await deleteObject(ref(this.storage, imageUrl));
    }
  }
}
