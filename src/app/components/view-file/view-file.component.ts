import {Component, Input} from '@angular/core';
import {FolderItemClass} from '../../models/folder-item';
import {ViewFileService} from '../../services/view-file.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent {
  @Input() file?: FolderItemClass;

  constructor(private viewFileSrv: ViewFileService) {
  }

  close(): void {
    this.viewFileSrv.close();
  }
}
