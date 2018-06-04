import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    auth:AuthProvider
  ) {
    platform.ready().then(() => {


      auth.getCurrentUser()
      .then((user)=>
      {
        if(user)
        {
          this.rootPage = TabsPage;
        }
        else
        {
          this.rootPage = LoginPage;
        }
      })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
