import * as firebase from 'firebase';
import { keys } from './config/keys';

const config = {
    apiKey: keys.firebase.apiKey,
    authDomain: keys.firebase.authDomain,
    databaseURL: keys.firebase.databaseURL,
    projectId: keys.firebase.projectId,
    storageBucket: keys.firebase.storageBucket,
    messagingSenderId: keys.firebase.messagingSenderId
};
export const firebaseApp = firebase.initializeApp(config);

export const database = firebase.database();
