import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgZoneDemoComponent } from './ng-zone-demo.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, NgZoneDemoComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}