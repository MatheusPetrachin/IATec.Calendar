import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './login/AuthService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuardService } from './authguardservice';
import { EventsComponent } from './events/events.component';
import { ApiConfigServiceService } from './ApiConfigServiceService';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateEventsComponent } from './events/create/create.events.component';
import { UpdateEventsComponent } from './events/update/update.events.component';
import { ToastService } from './toast.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProgressBarService } from './progressbar.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EventsComponent,
    CreateEventsComponent,
    UpdateEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ApiConfigServiceService,
    HttpClient,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000
      } as MatSnackBarConfig,
    },
    ToastService,
    ProgressBarService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
