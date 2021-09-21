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
import {FolderItemEventsEnum} from '../../enums/folder-item-events';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ViewFileService} from '../../services/view-file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements AfterContentInit, OnDestroy {
  destroy: Subject<boolean> = new Subject();

  @Input() data?: FolderItemClass;
  @Output() save$: EventEmitter<boolean> = new EventEmitter();
  @Output() select$: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('input', {static: false}) input?: ElementRef<HTMLInputElement>;

  isOnEdit = false;

  constructor(private viewFileSrv: ViewFileService) {

  }

  keyupCheck(ev: KeyboardEvent): void {
    if (ev.code === 'Enter' && this.isOnEdit) {
      this.data?.save();
    }
  }

  viewFile(data: FolderItemClass): void {
    this.viewFileSrv.view(data);
  }

  selectItem(): void {
    this.data?.select();
    this.select$.emit(true);
  }

  ngAfterContentInit(): void {
    this.data?.event$
      .pipe(takeUntil(this.destroy))
      .subscribe((ev: FolderItemEventsEnum) => {
        switch (ev) {
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

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
