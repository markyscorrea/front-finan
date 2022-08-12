import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageRoutingModule } from './first-page-routing.module';
import { FirstPageComponent } from './first-page.component';
import { NbButtonModule, NbPopoverModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbTooltipModule, NbToastrModule, NbAlertModule, NbSpinnerModule } from '@nebular/theme';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ArrowDownComponent } from 'src/app/components/arrow-down/arrow-down.component';
import { ArrowUpComponent } from 'src/app/components/arrow-up/arrow-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonAlertComponent } from 'src/app/components/button-alert/button-alert.component';

@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
    RegisterComponent,
    ArrowDownComponent,
    ArrowUpComponent,
    ButtonAlertComponent
  ],
  imports: [
    CommonModule,
    FirstPageRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NbPopoverModule,
    NbTooltipModule,
    NbToastrModule.forRoot(),
    NbAlertModule,
    NbSpinnerModule
  ],
  exports: [
    ButtonAlertComponent
  ]
})
export class FirstPageModule { }
