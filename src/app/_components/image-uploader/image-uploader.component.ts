import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html'
})
export class ImageUploaderComponent implements OnInit {
  imageChangedEvent: any = '';
  @Input() imagePath: string;
  @Output() imagePathChange = new EventEmitter<String>();

  constructor() {
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imagePathChange.emit(event.base64);
  }
}
