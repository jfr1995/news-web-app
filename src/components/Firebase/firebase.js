import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
/*
  create configuation so that we can use firebase.
  These properties can be found in firebase console. 

*/

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    // initialize firebase by calling initialize method from app object
    app.initializeApp(config);
    // reference to firebase auth instance
    this.auth = app.auth();
    // reference to firebase db
    this.db = app.database();
    // reference to google provider
    this.googleProvider = new app.auth.GoogleAuthProvider();
    // reference to facebook provider
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    // reference to twitter provider
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    // reference to email provider
    this.emailAuthProvider = app.auth.EmailAuthProvider;
  }
  // The following methods will serve as authentication api

  // create a user with an email and a password
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };
  // sign in user with an email and password
  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };
  // sign the user out
  doSignOut = () => {
    return this.auth.signOut();
  };
  // reset user password
  doResetPassword = email => this.auth.sendPasswordResetEmail(email);
  // update user password
  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  };

  // user api
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // merge auth and user db api
  // this method removes logic complexity from authorization and authentication HOC's
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser) {
              this.doSignOut();
            }
            if (!dbUser.roles) {
              dbUser.roles = [];
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  // social login api
  doSignInWithGoogle = () => {
    return this.auth.signInWithPopup(this.googleProvider);
  };
  doSignInWithFacebook = () => {
    return this.auth.signInWithPopup(this.facebookProvider);
  };
  doSignInWithTwitter = () => {
    return this.auth.signInWithPopup(this.twitterProvider);
  };
  doSendEmailVerification = () => {
    return this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });
  };
}

// export firebase class so that any interested modules can use it
export default Firebase;
