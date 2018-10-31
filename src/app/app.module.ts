import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResizableDirective } from './resizable.directive';
import { ResizeHandleDirective } from './resize-handler.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResizableDirective,
    ResizeHandleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
