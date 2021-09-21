import {Inject, Injectable} from '@angular/core';
import {LocalStorage} from '../app.module';
import {FolderItemClass} from '../models/folder-item';
import {FolderItem} from '../interfaces/folder.item';
import {FolderItemIconsEnum} from '../enums/folder-item-icons';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private STRUCTURE_KEY = 'folder-structure';

  constructor(@Inject(LocalStorage) private store: Storage) {
    this.init();
  }

  init(): void {
    const data: string | null = this.store.getItem(this.STRUCTURE_KEY);

    if (!data) {
      const rootItem = this.createRootItem();
      this.store.setItem(this.STRUCTURE_KEY, JSON.stringify(rootItem));
    }
  }

  getFolderStructure(): FolderItemClass {
    const data: string | null = this.store.getItem(this.STRUCTURE_KEY);
    const res: FolderItem = data && JSON.parse(data);
    return new FolderItemClass(res);
  }

  private createRootItem(): FolderItem {
    return {
      name: 'Root',
      isRoot: true,
      children: [],
      icon: FolderItemIconsEnum.Folder
    };
  }

  setFolderStructure(data?: FolderItemClass): void {
    if (!data) {
      // throw an error | do nothing ?
      return;
    }

    this.store.setItem(this.STRUCTURE_KEY, JSON.stringify(data?.getObject()));
  }
}
