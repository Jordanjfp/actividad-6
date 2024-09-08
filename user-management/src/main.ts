import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './app/services/user.service'; 
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    UserService,  
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));





