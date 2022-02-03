import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
  databaseURL: serviceAccount.databaseURL,
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: firebase_params.databaseURL,
    });
  }

  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
        .then(async decodedToken => {
          req['user'] = {
            name: decodedToken.name,
            email: decodedToken.email,
            user_id: decodedToken.user_id,
            picture: decodedToken.picture,
            iss: decodedToken.iss,
            aud: decodedToken.aud,
          };
          console.log('\nToken: ', req['user']);
          next();
        }).catch(errMessage => {
        AuthMiddleware.accessDenied(req.url, res, errMessage);
      });
    } else {
      next();
    }
  }

  private static accessDenied(url: string, res: Response, errMessage: string) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
      desc: errMessage,
    });
  }
}
