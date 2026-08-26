import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BlogPostHelper } from 'src/app/helper/blogposts-helper';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private fireStore = inject(Firestore);
  private storage = inject(Storage);

  async createBlogPost(title: string, content: string, image: File | null) {
    const slug = BlogPostHelper.createSlug(title);

    const postDocumentReference = doc(this.fireStore, 'blog-posts', slug);

    let imageUrl = '';

    // Upload image
    if (image) {
      const fileName = `${slug}-${Date.now()}-${image.name}`;

      const storageRef = ref(this.storage, `images/${fileName}`);

      await uploadBytes(storageRef, image);

      imageUrl = await getDownloadURL(storageRef);
    }

    // Save post in Firestore
    await setDoc(postDocumentReference, {
      title: title,
      content: content,
      imageUrl: imageUrl,
      publishedOn: new Date(),
    });

    return {
      slug,
      title,
      content,
      imageUrl,
    };
  }
}
