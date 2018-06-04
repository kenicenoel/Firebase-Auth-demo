import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import firebase from 'firebase/app';

import 'rxjs/add/observable/of';
import { switchMap, take } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable()
export class AuthProvider
{

  user: Observable<any>;

  constructor(
  private afAuth: AngularFireAuth,
  private afs: AngularFirestore,
  private platform: Platform)
  {
    this.user = this.afAuth.authState.pipe(
      switchMap(user =>
        {
        console.log(user);
        if(user)
        {
          return this.afs.doc<any>(`users/$user.uid}`).valueChanges();
        }
        else
        {
          return Observable.of(null);
        }

      })
    );
  }

  //Current user as a promise. Useful for one-off operations
  getCurrentUser():Promise<any>
  {
    return this.user.pipe(take(1)).toPromise();
  }

  // Save custom user data in Firestore
  private updateUserData(user:any)
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data =
    {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'buddy',
      photoUrl: user.photoUrl || 'https://api.adorable.io/avatars/73/abott@adorable.png'
    };

    return userRef.set(data, { merge: true });
  }


  //// Anonymous login ////
  async anonymousLogin():Promise<void>
  {
    const user = await this.afAuth.auth.signInAnonymously();
    await this.updateUserData(user);
  }

}
