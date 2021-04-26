/**
 *
 * Reducer.js
 * Jongsu An
 * Feb 28, 2021
 *
 * It is the collection of reducers of redux
 *
 */

import { combineReducers } from "redux";
import {
  STORE_STATUS_OF_NETWORK,
  STORE_PATIENT_ID,
  STORE_ASSESSSMENTS,
  STORE_DOCUMENTID_REUSLTASSESSMENT,
  STORE_CHOSENSASSESSSMENT,
  STORE_SPINNERVISIBLE,
} from "./Actions";

const initialStateForNetwork = { networkStatus: true };
const reducerForNetwork = (state = initialStateForNetwork, action) => {
  switch (action.type) {
    case STORE_STATUS_OF_NETWORK:
      return { networkStatus: action.payload };
    default:
      return state;
  }
};

const initialStateForPatientId = { patientId: "" };
const reducerForPatientId = (state = initialStateForPatientId, action) => {
  switch (action.type) {
    case STORE_PATIENT_ID:
      return { patientId: action.payload };
    default:
      return state;
  }
};

const initialStateForAssessments = { asssesssments: [] };
const reducerForAssessments = (state = initialStateForAssessments, action) => {
  switch (action.type) {
    case STORE_ASSESSSMENTS:
      return { assessments: action.payload };
    default:
      return state;
  }
};

const initialStateForDcumentIdOfResultAssessment = { documentId: "" };
const reducerForDcumentIdOfResultAssessment = (
  state = initialStateForDcumentIdOfResultAssessment,
  action
) => {
  switch (action.type) {
    case STORE_DOCUMENTID_REUSLTASSESSMENT:
      return { documentId: action.payload };
    default:
      return state;
  }
};

const initialStateForChosenAssessment = { assessment: "" };
const reducerForChosenAssessment = (
  state = initialStateForChosenAssessment,
  action
) => {
  switch (action.type) {
    case STORE_CHOSENSASSESSSMENT:
      return { assessment: action.payload };
    default:
      return state;
  }
};

//To initiate state for activating/deactivaing spinner
const initialStateForIsSpinVisible = false;
//To declare the reducer to activate/deactivate spinner
const reducerSpinnerVisible = (
  state = initialStateForIsSpinVisible,
  action
) => {
  switch (action.type) {
    case STORE_SPINNERVISIBLE:
      return action.payload;
    default:
      return state;
  }
};

//The rootReduce holding all reducers
const rootReducer = combineReducers({
  reducerForNetwork,
  reducerForPatientId,
  reducerForAssessments,
  reducerForDcumentIdOfResultAssessment,
  reducerForChosenAssessment,
  reducerSpinnerVisible,
});

export default rootReducer;
