/**
 *
 * AuthContext.js
 * Neal Yan
 * Jongsu An
 * Feb 21, 2021
 *
 * This is a react native component for globally holding information of user logged in
 *
 */

import React, { useEffect, useState, createContext } from "react";
import { USERSFIRESOTRE } from "../namesOfCollectionOfFirestore";
import { firebase } from "../firebase/config";
import { covertTimeStamp } from "../utils";

//To initialize global information of user logged in
export const AuthContext = createContext({
  initialized: false,
  userLoggedIn: null,
});

export function AuthProvider(props) {
  //To initialize information of user logged
  //This information will be sent to other screens and components
  const [authInfo, setAuthInfo] = useState({
    initialized: false,
    userLoggedIn: null,
  });

  //To listen for auth state changes by using firebase.auth().onAuthStateChanged
  //User's authorization process is below
  //Step 1: validation of user is checked by using firebase.auth()
  //Step 2: If step1 is passed,
  //        (1) the value of the disable property of 'users' collection of firestore is checked.
  //            -> The value of disable property should be false in order to login sucessfully.
  //        (2) the value of the since property of 'users' collection of firestore is checked.
  //            -> Today should be equal or later than 'since' property in order to login sucessfully.
  //If step2 is failed, user will be log out forcelly
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null && user !== undefined) {
        firebase
          .firestore()
          .collection(USERSFIRESOTRE)
          .doc(user.uid)
          .get()
          .then((userFromDB) => {
            user.badgeNumber = userFromDB.data().badgeNumber;
            user.disable = userFromDB.data().disable;
            user.firstName = userFromDB.data().firstName;
            user.lastName = userFromDB.data().lastName;
            user.phone = userFromDB.data().phone;
            user.type = userFromDB.data().type; //paramedic, general-admin, super-admin
            const { momentOfStartToday, momentOfStartSince } = covertTimeStamp({
              now: new Date(),
              since: userFromDB.data().since,
            });

            if (
              user.disable === false &&
              momentOfStartToday >= momentOfStartSince
            ) {
              setAuthInfo({ initialized: true, userLoggedIn: user });
            } else {
              firebase.auth().signOut();
            }
          })
          .catch((error) => {
            firebase.auth().signOut();
          });
      } else {
        setAuthInfo({ initialized: true, userLoggedIn: null });
      }
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  //Information of user logged in is sent to other screens and components
  return (
    <AuthContext.Provider value={authInfo}>
      {props.children}
    </AuthContext.Provider>
  );
}
