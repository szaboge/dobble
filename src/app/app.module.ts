import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ImageChooserComponent} from './image-chooser/image-chooser.component';
import {ImageComponent} from './image-chooser/image/image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSliderModule} from '@angular/material';
import {ConfiguratorComponent} from './configurator/configurator.component';
import {FormsModule} from '@angular/forms';
import { GeneratorComponent } from './generator/generator.component';
import {MccColorPickerModule} from 'material-community-components';

@NgModule({
  declarations: [
    AppComponent,
    ImageChooserComponent,
    ImageComponent,
    ConfiguratorComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MccColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
