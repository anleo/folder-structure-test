import { Injectable } from '@angular/core';
import {FolderItemClass} from '../models/folder-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewFileService {
  selectedFile$: Subject<FolderItemClass | null> = new Subject<FolderItemClass | null>();

  constructor() { }

  view(data: FolderItemClass) {
    this.selectedFile$.next(data);
  }

  close() {
    this.selectedFile$.next(null);
  }
}
