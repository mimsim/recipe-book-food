import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoaldingComponent } from './loalding/loalding.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from '../logging.service';



@NgModule({
  declarations: [
    DropdownDirective,
    LoaldingComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    DropdownDirective,
    LoaldingComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  entryComponents: [AlertComponent],
  providers: [LoggingService]
})
export class SharedModule { }
