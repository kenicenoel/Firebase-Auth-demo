import { NgModule } from '@angular/core';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [AnonymousLoginComponent],
	imports: [
    IonicModule.forRoot(AnonymousLoginComponent)
  ],
	exports: [AnonymousLoginComponent]
})
export class ComponentsModule {}
