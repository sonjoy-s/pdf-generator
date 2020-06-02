// all angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// all components
import { QuillModule } from 'ngx-quill';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppComponent } from './_components/app.component';
import {ImageUploaderComponent} from './_components/image-uploader/image-uploader.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ImageCropperModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
