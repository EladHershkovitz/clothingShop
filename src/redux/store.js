import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootreducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
export const store = createStore(rootreducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);
export const persisrot = persistStore(store);
export default { store, persisrot };
