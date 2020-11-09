import {NgModule} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  exports: [
    ButtonModule, PanelModule, TableModule, TabViewModule, InputTextModule, ToastModule, RippleModule
  ]
})
export class PrimeNgModuleLoaders {
}
