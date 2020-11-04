import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    exports: [
        ButtonModule, PanelModule, TableModule, TabViewModule
    ]
})
export class PrimeNgModuleLoaders { }
