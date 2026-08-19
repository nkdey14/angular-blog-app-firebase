import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
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

    this.createPostForm.reset();
  }
}
