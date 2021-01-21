import { createSelector } from "reselect";
const selectShop = state => state.shop;

export const SelectCollections = createSelector([selectShop], shop => shop.collections);
export const SelectCollection = collectionUrlParam => createSelector([SelectCollections], collection => (collection ? collection[collectionUrlParam] : null));
export const selectCollectionForPreview = createSelector([SelectCollections], collection => (collection ? Object.keys(collection).map(key => collection[key]) : []));
export const selectIsCollectionFetching = createSelector([selectShop], shop => shop.isFetching);
export const isCollectoinLoaded = createSelector([selectShop], shop => !!shop.collections);
