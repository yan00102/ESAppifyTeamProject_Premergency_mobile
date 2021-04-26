/**
 *
 * utils.js
 * Jongsu An
 * Feb 28, 2021
 *
 * It is the collection of util functions
 *
 */

import { firebase } from "./firebase/config";
import { Dimensions } from "react-native";

const FullNameOfMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ShortNameOfMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//To convert the start of today into UnixTime
const getUnixTimeOfStartOfToday = () => {
  const now = new Date();
  const startOfToday =
    new Date(now.getFullYear(), now.getMonth(), now.getDate()) / 1000;
  // const fullYear = now.getFullYear();
  // const month = now.getMonth();
  // const date = now.getDate();
  // const startOfToday = new Date(fullYear, month, date, 0, 0);
  return startOfToday;
};

//To convert the start of tommorow into UnixTime
const getUnixTimeOfStartOfTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const fullYear = tomorrow.getFullYear();
  const month = tomorrow.getMonth();
  const date = tomorrow.getDate();
  const startOfTomorrow = firebase.firestore.Timestamp.fromDate(
    new Date(fullYear, month, date, 0, 0)
  );
  return startOfTomorrow;
};

//To get the unix timestamp for the end of today
const getUnixTimeOfEndOfToday = () => {
  const now = new Date();
  const endOfDay = new Date(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - 1
  );
  const unixTimeOfEndOfToday = endOfDay.valueOf();
  return unixTimeOfEndOfToday;
};

//To extract the time with the formatting 'HH:MM:DD PM/AM'
const extractHhMmFromDate = (date) => {
  const hours = date.getHours();
  const miniutes = date.getMinutes();
  const miniutesString = `${miniutes}`.padStart(2, "0");
  let extractedTime = "";
  if (hours >= 12) {
    extractedTime = `${hours}:${miniutesString} PM`;
  } else {
    extractedTime = `${hours}:${miniutesString} AM`;
  }
  return extractedTime;
};

//To get AM / PM
const getExactTime = (unixMilliseconds) => {
  const date = new Date(unixMilliseconds);
  const hours = date.getHours();
  if (hours >= 12) {
    return " PM";
  } else {
    return " AM";
  }
};

//To convert the name of month date, year"
//The name of month can be chosen between the short name or the full name
const convertFormatOfNameOfMonthDayYear = (type, date) => {
  const month = date.getMonth();
  if (type === "short") {
    return `${
      ShortNameOfMonth[month]
    } ${date.getDate()}, ${date.getFullYear()}`;
  } else {
    return `${
      FullNameOfMonth[month]
    } ${date.getDate()}, ${date.getFullYear()}}`;
  }
};

//To get the height and weight of the screen
const basicInfo = {
  windowHeight: Dimensions.get("window").height,
  windowWidth: Dimensions.get("window").width,
};

//To convert the date with format 'YYYY-MM-DD' into UnixTimeStamp
function covertTimeStamp({ now, since }) {
  const fullYear = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const momentOfStartToday = new Date(fullYear, month, date, 0, 0).getTime();
  const elementsOfSince = since.split("-");
  const momentOfStartSince = new Date(
    parseInt(elementsOfSince[0], 10),
    parseInt(elementsOfSince[1], 10),
    parseInt(elementsOfSince[2], 10),
    0,
    0
  ).getTime();
  return { momentOfStartToday, momentOfStartSince };
}

export {
  FullNameOfMonth,
  ShortNameOfMonth,
  getUnixTimeOfStartOfToday,
  getUnixTimeOfStartOfTomorrow,
  getUnixTimeOfEndOfToday,
  extractHhMmFromDate,
  getExactTime,
  convertFormatOfNameOfMonthDayYear,
  basicInfo,
  covertTimeStamp,
};
