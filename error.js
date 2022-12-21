exports.errorCreated = (Status, message) => {
  const err = new Error();
  err.status = Status;
  err.message = message;
  return err;
};
