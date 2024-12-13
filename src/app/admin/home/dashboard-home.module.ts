import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DashboardHomeComponent } from './components/dashboard-home.component';


@NgModule({
    declarations: [
        DashboardHomeComponent
    ],
    imports: [

    ],
    providers: [
        provideHttpClient(withFetch())
    ],

})
export class DashboardHomeModule { }
