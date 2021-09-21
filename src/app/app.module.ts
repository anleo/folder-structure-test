import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RootComponent} from './components/root/root.component';
import {FolderComponent} from './components/folder/folder.component';
import {FileComponent} from './components/file/file.component';
import {DbService} from './services/db.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ViewFileComponent} from './components/view-file/view-file.component';
import {ViewFileService} from './services/view-file.service';
import {FolderItemService} from './services/folder-item.service';
import {HttpClientModule} from '@angular/common/http';
import {PaymeService} from './services/payme.service';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { ModalComponent } from './components/modal/modal.component';

export const LocalStorage = new InjectionToken<WindowLocalStorage>('window local storage');

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    FolderComponent,
    FileComponent,
    ViewFileComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // PrimeNG
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    DynamicDialogModule,
  ],
  providers: [
    {provide: LocalStorage, useFactory: () => window.localStorage},
    DbService,
    ViewFileService,
    FolderItemService,
    PaymeService,
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
