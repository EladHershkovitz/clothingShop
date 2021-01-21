import { takeLatest, call, put } from "redux-saga/effects";
import shopActionTypes from "./shop.types";
import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionSuccess, fetchCollectionFailure } from "./shop.actions";
export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(converCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error));
  }
}
export function* fetchCollectionStart() {
  yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync);
}
