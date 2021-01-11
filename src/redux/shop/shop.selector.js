import { createSelector } from "reselect";
import memoize from "lodash.memoize";
const selectShop = state => state.shop;

export const SelectCollections = createSelector([selectShop], shop => shop.collections);
export const SelectCollection = memoize(collectionUrlParam => createSelector([SelectCollections], collection => collection[collectionUrlParam]));
export const selectCollectionForPreview = memoize(createSelector([SelectCollections], collection => Object.keys(collection).map(key => collection[key])));
