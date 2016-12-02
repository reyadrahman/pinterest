import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { routes, AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MasonryModule } from 'angular2-masonry';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthenticationService } from './services/authentication';
import { reducer } from './reducers/index';
import { UserAuthEffects } from './effects/user-auth';
import { PinsComponent } from './components/pins/pins.component';
import { PinItemComponent } from './components/pins/pin-item/pin-item.component';
import { PinEffects } from './effects/pin';
import { PinDataService } from './services/pin-data';
import { PinDetailComponent } from './components/pins/pin-detail/pin-detail.component';
import { ModalComponent } from './components/shared/modal/modal.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyA4tjVj427twh-n3lOAAniS-x9knzdw7vM",
  authDomain: "pinterest-da3ba.firebaseapp.com",
  databaseURL: "https://pinterest-da3ba.firebaseio.com",
  storageBucket: "pinterest-da3ba.appspot.com",
  messagingSenderId: "1047429115771"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PinsComponent,
    PinItemComponent,
    PinDetailComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(UserAuthEffects),
    EffectsModule.run(PinEffects),
    MasonryModule
  ],
  providers: [
    AuthenticationService,
    PinDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }