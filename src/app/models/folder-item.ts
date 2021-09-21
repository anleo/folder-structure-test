import {FolderItem} from '../interfaces/folder.item';
import {Subject} from 'rxjs';
import {FolderItemEventsEnum} from '../enums/folder-item-events';
import {FolderItemIconsEnum} from '../enums/folder-item-icons';

export class FolderItemClass implements FolderItem {
  isRoot: boolean;
  name: string | number;
  children: Array<FolderItemClass> = [];
  data?: string;
  parent: string | number;
  icon: string;
  price?: number;
  isSelected: boolean = false;

  event$: Subject<FolderItemEventsEnum> = new Subject();

  constructor(data: FolderItem, parent?: string | number) {
    this.parent = parent ? `${parent}.${data.name}` : data.name;
    this.isRoot = data?.isRoot || false;
    this.name = data?.name;
    this.price = data?.price || 0;
    this.icon = data?.data ? FolderItemIconsEnum.File : FolderItemIconsEnum.Folder;

    if (data?.data) {
      this.data = data?.data;
    }

    this.initChildren(data?.children || []);
  }

  select(): void {
    this.isSelected = !this.isSelected;
  }

  setName(name?: string | number): void {
    this.name = name || '';
  }

  edit(): void {
    this.event$.next(FolderItemEventsEnum.Edit);
  }

  save(): void {
    this.event$.next(FolderItemEventsEnum.Save);
  }

  addFile(data: FolderItemClass): void {
    this.children.push(data);
    this.event$.next(FolderItemEventsEnum.AddFile);
  }

  addFolder(data: FolderItemClass): void {
    this.children.push(data);
    this.event$.next(FolderItemEventsEnum.AddFile);
  }

  getObject(): FolderItem {
    return {
      name: this.name,
      children: this.getChildrenObject(this.children),
      isRoot: this.isRoot,
      data: this.data,
      icon: this.icon,
      isSelected: this.isSelected,
      price: this.price,
    };
  }

  getChildrenObject(children: FolderItemClass[]): FolderItem[] {
    return (children || []).map((child: FolderItemClass) => {
      return {
        ...child.getObject(),
        children: this.getChildrenObject(child?.children || []),
      };
    });
  }

  getSelected(children: FolderItemClass[], res:FolderItemClass[] = [], isRoot?: boolean): FolderItemClass[] {
    if (!children?.length && !isRoot) {
      return [...res];
    }

    if (isRoot) {
      return [
        ...res,
        ...this.getSelected(this.children)
      ];
    }

    (children || []).forEach((child: FolderItemClass) => {
      child?.children?.length && this.getSelected(child?.children, res);
      child.isSelected && res.push(child);
    });

    return res;
  }

  removeSelected(): void {
    if (!this.isRoot) {
      return;
    }

    this.removeSelectedChildren(this.children);
    this.save();
  }

  private initChildren(children: FolderItem[]): void {
    this.children = children.map((child: FolderItem) => new FolderItemClass(child, child?.name));
  }

  private removeSelectedChildren(children: FolderItemClass[]): void {
    const idxToDelete: number[] = [];

    (children || []).forEach((child: FolderItemClass) => {
      if (child.isSelected) {
        const idx: number = children.indexOf(child);
        idx >= 0 && idxToDelete.push(idx);
      } else {
        if (child?.children?.length) {
          this.removeSelectedChildren(child.children);
        }
      }
    });

    idxToDelete
      .sort((a, b) => b - a)
      .forEach((num) => children.splice(num, 1));
  }
}
