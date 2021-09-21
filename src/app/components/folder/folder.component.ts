import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {FolderItemClass} from '../../models/folder-item';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FolderItemEventsEnum} from '../../enums/folder-item-events';
import {FolderItemService} from '../../services/folder-item.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements AfterContentInit, OnDestroy {
  destroy: Subject<boolean> = new Subject();

  @Input() data?: FolderItemClass;
  @Output() save$: EventEmitter<boolean> = new EventEmitter();
  @Output() select$: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('input', {static: false}) input?: ElementRef<HTMLInputElement>;

  isOnEdit = false;

  constructor(private folderItemSrv: FolderItemService) {
  }

  keyupCheck(ev: KeyboardEvent): void {
    if (ev.code === 'Enter' && this.isOnEdit) {
      this.data?.save();
    }
  }

  selectItem(): void {
    this.data?.select();
  }

  ngAfterContentInit(): void {
    this.data?.event$
      .pipe(takeUntil(this.destroy))
      .subscribe((ev: FolderItemEventsEnum) => {
        switch (ev) {
          case FolderItemEventsEnum.AddFile:
          case FolderItemEventsEnum.AddFolder:
            this.save$.next(true);
            break;

          case FolderItemEventsEnum.Save:
            const newValue = this.input?.nativeElement?.value;
            this.isOnEdit = false;
            this.data?.setName(newValue);
            this.save$.next(true);
            break;

          case FolderItemEventsEnum.Edit:
            this.isOnEdit = true;

            setTimeout(() => {
              this.input?.nativeElement.focus();
            });

            break;
        }
      });
  }

  save(): void {
    this.save$.next(true);
  }

  select(): void {
    this.select$.next(true);
  }

  createFile(): void {
    this.data?.addFile(this.folderItemSrv.createFile());
  }

  createFolder(): void {
    this.data?.addFolder(this.folderItemSrv.createFolder());
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
