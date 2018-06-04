import { TabsPage } from './../../pages/tabs/tabs';
import { NavController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'anonymous-login',
  templateUrl: 'anonymous-login.html'
})
export class AnonymousLoginComponent {

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController )
  {

  }

  async login()
  {
      const loader = this.loadingCtrl.create(
      {
        content: 'Please wait while you\'re signed in anonymously.'
      });

      loader.present();

      await this.auth.anonymousLogin();

        loader.dismiss();
        await this.navCtrl.setRoot(TabsPage);
  }

}
