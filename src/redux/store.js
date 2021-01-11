import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootreducer from "./root-reducer";

const middleware = [logger];
export const store = createStore(rootreducer, applyMiddleware(...middleware));
export const persisrot = persistStore(store);
export default { store, persisrot };
