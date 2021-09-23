import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {FolderItemClass} from '../../models/folder-item';
import {takeUntil} from 'rxjs/operators';
import {FolderItemEventsEnum} from '../../enums/folder-item-events';
import {Subject} from 'rxjs';
import {FolderItemService} from '../../services/folder-item.service';
import {PaymeService} from '../../services/payme.service';
import {DialogService} from 'primeng/dynamicdialog';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-root-el',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, AfterContentInit, OnDestroy {
  destroy: Subject<boolean> = new Subject();
  data?: FolderItemClass;

  price = 0;

  constructor(
    private dialog: DialogService,
    private db: DbService,
    private paySrv: PaymeService,
    private folderItemSrv: FolderItemService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  buy(): void {
    const data = this.data;
    this.paySrv
      .getIframeUrl(data)
      .subscribe((res: any) => {
        if (res.sale_url) {
          this.dialog.open(ModalComponent, {
            header: 'Payment',
            width: '70%',
            height: '70%',
            data: {
              saleUrl: res.sale_url,
            }
          });
        }
      });
  }

  createFile(): void {
    this.data?.addFile(this.folderItemSrv.createFile());
  }

  createFolder(): void {
    this.data?.addFolder(this.folderItemSrv.createFolder());
  }

  getData(): void {
    this.data = this.db.getFolderStructure();
  }

  save(ev?: any): void {
    this.db.setFolderStructure(this.data);
  }

  select(ev?: any): void {
    this.countPrice();
  }

  remove(): void {
    this.data?.removeSelected();
    this.countPrice();
  }

  countPrice(): void {
    this.price = (this.data?.getSelected(this.data?.children, [], true) || [])
      .reduce((acc, cur: FolderItemClass) => acc + (cur?.price || 0), 0);
  }

  ngAfterContentInit(): void {
    this.data?.event$
      .pipe(takeUntil(this.destroy))
      .subscribe((ev: FolderItemEventsEnum) => {
        switch (ev) {
          case FolderItemEventsEnum.AddFile:
          case FolderItemEventsEnum.AddFolder:
          case FolderItemEventsEnum.Save:
            this.save();
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
