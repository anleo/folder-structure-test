import {Component, ElementRef} from '@angular/core';
import {ViewFileService} from './services/view-file.service';
import {Subject} from 'rxjs/internal/Subject';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  selectedFile$: Subject<any> = this.viewFileSrv.selectedFile$;

  constructor(private viewFileSrv: ViewFileService, private el: ElementRef<HTMLElement>) {
    this.selectedFile$
      .pipe(startWith())
      .subscribe((file) => {
        if (file) {
          this.el.nativeElement.classList.add('view-file');
        } else {
          this.el.nativeElement.classList.remove('view-file');
        }
      });
  }
}
