import { combineReducers } from "redux";
import UserReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const presistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: UserReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});
export default persistReducer(presistConfig, rootReducer);
