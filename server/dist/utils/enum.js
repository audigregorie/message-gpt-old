export var statusMessage;
(function (statusMessage) {
    statusMessage["SUCCESS"] = "SUCCESS";
    statusMessage["ERROR"] = "ERROR";
    statusMessage["USER_ALREADY_REGISTERED"] = "User is already registered";
    statusMessage["USER_NOT_REGISTERED"] = "User is not registered";
    statusMessage["INCORRECT_PASSWORD"] = "Incorrect Password";
    statusMessage["TOKEN_NOT_FOUND"] = "Token not found";
    statusMessage["PERMISSIONS_DID_NOT_MATCH"] = "Permissions did not match";
    statusMessage["CHAT_COMPLETION_REQUEST_MESSAGE"] = "Chat complete request message error";
})(statusMessage || (statusMessage = {}));
//# sourceMappingURL=enum.js.map