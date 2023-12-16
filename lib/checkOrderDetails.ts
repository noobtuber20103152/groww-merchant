import { indian_states } from "./state";

function isEmailCorrect(email: string) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPinCode(pinCode: any) {
  let pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pinCode);
}
function isValidState(state: any) {
  let indianState = indian_states;
  return indianState.indexOf(state) != -1;
}
function isValidStreetAddress(street: any) {
  return street.length > 0;
}
export default function checkDetails(details: any) {
  return (
    isEmailCorrect(details.email) &&
    isValidPinCode(details.pinCode) &&
    isValidState(details.state) &&
    isValidStreetAddress(details.streetAddress)
  );
}
