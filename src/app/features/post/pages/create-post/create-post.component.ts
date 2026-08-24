import { Component, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  // created firestore reference
  private fireStore = inject(Firestore);

  createPostForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  createPost() {
    if (this.createPostForm.invalid) {
      this.createPostForm.markAllAsTouched();
      return;
    }
    console.log(this.createPostForm.value.title);
    console.log(this.createPostForm.value.content);

    // const postCollectionReference = collection(this.fireStore, 'blog-posts');

    // addDoc(postCollectionReference, {
    //   title: this.createPostForm.value.title,
    //   content: this.createPostForm.value.content,
    //   publishedOn: new Date(),
    //   //slug
    //   //coverurl
    // });

    const postDocumentReference = doc(
      this.fireStore,
      'blog-posts',
      'this-is-a-title-123',
    );

    setDoc(postDocumentReference, {
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      publishedOn: new Date(),
    });

    this.createPostForm.reset();
  }
}
