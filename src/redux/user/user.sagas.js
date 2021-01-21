import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionsTypes from "./user.types";
import { getCurrentUser, googleProvider, auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure, signOutFaliure, signOutSuccess, signUpSuccess, SignUpFailure } from "./user.action";
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshopFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshopFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* getSnapshopFromUserAuth(user, additionalData) {
  const userRef = yield call(createUserProfileDocument, user, additionalData);
  const userSnapshot = yield userRef.get();
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
}

export function* isUserAuthenticcated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshopFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFaliure(error));
  }
}
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshopFromUserAuth(user, additionalData);
}
export function* onGoogleSingInStart() {
  yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onCheckUserSession() {
  yield takeLatest(UserActionsTypes.CHECK_USER_SESSION, isUserAuthenticcated);
}
export function* onSignOutStart() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_START, signOut);
}
export function* onSignUpStart() {
  yield takeLatest(UserActionsTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* userSagas() {
  yield all([call(onGoogleSingInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)]);
}
