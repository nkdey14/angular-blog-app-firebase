import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
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

    const postCollectionReference = collection(this.fireStore, 'blog-posts');

    addDoc(postCollectionReference, {
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      publishedOn: new Date(),
      //slug
      //coverurl
    });

    this.createPostForm.reset();
  }
}
