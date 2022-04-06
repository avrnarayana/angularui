import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectsService } from './modules/shared/projects.service';
import { TranslateService } from './pipes/translate/translate.service';
import { TranslatePipe } from './pipes/translate/translate.pipe';
import { AuthService } from './modules/shared/auth.service';
import { ServerApiInterfaceService } from './modules/shared/server-api-interface.service';
import { LoginStatusProviderService } from './modules/shared/login-status-provider.service';
import { ApiErrorService } from './modules/shared/api-error.service';
import { dataSharingService } from './modules/shared/data-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpellsComponent } from './spells/spells/spells.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SpellsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
	  MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    TranslateService,
    TranslatePipe,
    AuthService,
    ServerApiInterfaceService,
    LoginStatusProviderService,
    ApiErrorService,
    dataSharingService,
    ProjectsService,
    HttpClientModule,
    HttpClient,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
