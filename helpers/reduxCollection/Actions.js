/**
 *
 * Action.js
 * Jongsu An
 * Feb 28, 2021
 *
 * It is the collection of actions of redux
 *
 */

const STORE_STATUS_OF_NETWORK = "STORE_STATUS_OF_NEWORK";
const storeIsConnected = (networkStatus) => ({
  type: STORE_STATUS_OF_NETWORK,
  payload: networkStatus,
});

const STORE_PATIENT_ID = "STORE_PATIENT_ID";
const storePatientId = (patientId) => ({
  type: STORE_PATIENT_ID,
  payload: patientId,
});

const STORE_CHOSENSASSESSSMENT = "STORE_CHOSENSASSESSSMENT";
const storeChosenAssessment = (assessment) => ({
  type: STORE_CHOSENSASSESSSMENT,
  payload: assessment,
});

const STORE_ASSESSSMENTS = "STORE_ASSESSSMENTS";
const storeAssessments = (assessments) => ({
  type: STORE_ASSESSSMENTS,
  payload: assessments,
});

const STORE_DOCUMENTID_REUSLTASSESSMENT = "STORE_DOCUMENTID_REUSLTASSESSMENT";
const storeDocumentIdOfResultAssessment = (documentId) => ({
  type: STORE_DOCUMENTID_REUSLTASSESSMENT,
  payload: documentId,
});

//To declare type of action for activating/deactivaing spinner
const STORE_SPINNERVISIBLE = "STORE_SPINNERVISIBLE";

//convert data to the format for the reducer to activate/deactivate spinner
const storeIsSpinnerVisible = (value) => {
  return { type: STORE_SPINNERVISIBLE, payload: value };
};

export {
  STORE_PATIENT_ID,
  storePatientId,
  STORE_ASSESSSMENTS,
  storeAssessments,
  STORE_DOCUMENTID_REUSLTASSESSMENT,
  storeDocumentIdOfResultAssessment,
  STORE_CHOSENSASSESSSMENT,
  storeChosenAssessment,
  STORE_SPINNERVISIBLE,
  storeIsSpinnerVisible,
  STORE_STATUS_OF_NETWORK,
  storeIsConnected,
};
