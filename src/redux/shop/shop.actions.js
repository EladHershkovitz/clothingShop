import shopActionTypes from "./shop.types";
import { firestore, converCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
export const fetchCollectionStart = collectionMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
  payload: collectionMap
});
export const fetchCollectionSuccess = collectionMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap
});
export const fetchCollectionFailure = errorMessage => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  errorMessage: errorMessage
});
