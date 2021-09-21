import {Injectable} from '@angular/core';
import {FolderItemClass} from '../models/folder-item';
import {FolderItemIconsEnum} from '../enums/folder-item-icons';
import {generateSlug} from 'random-word-slugs';

@Injectable({
  providedIn: 'root'
})
export class FolderItemService {

  constructor() {
  }

  createFile(): FolderItemClass {
    return new FolderItemClass({
      name: `file-${Date.now()}`,
      data: generateSlug(
        Math.round((Math.random() * 30)) * Math.round((Math.random() * 20)),
        {format: 'title'}
      ),
      isRoot: false,
      icon: FolderItemIconsEnum.File,
      price: Math.round((Math.random() * 30)) * Math.round((Math.random() * 50))
    });
  }

  createFolder(): FolderItemClass {
    return new FolderItemClass({
      name: `folder-${Date.now()}`,
      isRoot: false,
      children: [],
      icon: FolderItemIconsEnum.Folder,
    });
  }
}
