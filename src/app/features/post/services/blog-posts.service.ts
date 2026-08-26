import { inject, Injectable } from '@angular/core';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

import { BlogPostHelper } from 'src/app/helper/blogposts-helper';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);
  private storage = inject(Storage);

  async createBlogPost(title: string, content: string, image: File | null) {
    console.log('STEP 1: createBlogPost called');

    const slug = BlogPostHelper.createSlug(title);

    console.log('STEP 2: slug =', slug);

    const postDocumentReference = doc(this.fireStore, 'blog-posts', slug);

    console.log(
      'STEP 3: Firestore document reference =',
      postDocumentReference.path,
    );

    let imageUrl = '';

    // -------------------------
    // IMAGE UPLOAD
    // -------------------------

    if (image) {
      const fileName = `${slug}-${Date.now()}-${image.name}`;

      console.log('STEP 4: uploading image =', fileName);

      const storageRef = ref(this.storage, `images/${fileName}`);

      await uploadBytes(storageRef, image);

      console.log('STEP 5: image uploaded successfully');

      imageUrl = await getDownloadURL(storageRef);

      console.log('STEP 6: image URL =', imageUrl);
    } else {
      console.log('STEP 4: no image selected');
    }

    // -------------------------
    // FIRESTORE
    // -------------------------

    const postData = {
      title: title,

      content: content,

      imageUrl: imageUrl,

      publishedOn: new Date(),
    };

    console.log('STEP 7: data being saved to Firestore =', postData);

    await setDoc(postDocumentReference, postData);

    console.log('STEP 8: Firestore save SUCCESS');

    return {
      id: slug,
      ...postData,
    };
  }
}
