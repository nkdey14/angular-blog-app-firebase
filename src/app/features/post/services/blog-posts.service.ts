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
      await uploadBytes(storageRef, image);

      imageUrl = await getDownloadURL(storageRef);
    }

    await setDoc(postDocumentReference, {
      title,
      content,
      imageUrl,
      publishedOn: new Date(),
    });
  }
}
