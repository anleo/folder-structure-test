import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    public config: DynamicDialogConfig,
    private renderer: Renderer2,
    private el: ElementRef<Component>,
  ) {
  }

  ngOnInit(): void {
    this.createIframe();
  }

  createIframe(): void {
    const frame = this.renderer.createElement('iframe');
    this.renderer.setProperty(frame, 'src', this.config?.data?.saleUrl);
    this.renderer.setProperty(frame, 'width', '100%');
    this.renderer.setProperty(frame, 'height', '100%');
    this.renderer.setStyle(frame, 'border', 'none');
    this.renderer.appendChild(
      this.el.nativeElement,
      frame
    );
  }
}
