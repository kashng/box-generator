import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxFactoryComponent } from './box-factory/box-factory.component';
import { GlobalServiceService } from './global-service.service';

@NgModule({
  declarations: [
    AppComponent,
    BoxFactoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BoxFactoryComponent, GlobalServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
