/**
 * @description
 *	Lista de códigos de error de toda la aplicación. Se centralizan en este
 *	enumerado para garantizar que no haya colisiones entre los mismos.
 */
export enum ErrorCode {
  UnknownError = "COHOR-0000-0000",
  UnexpectedMediaType = "COHOR-0000-0001",
  NotImplementedError = "COHOR-0000-0002",
  ValidationError = "COHOR-0000-0003",
  ShallNotInstantiateError = "COHOR-0000-0004",
  EndpointCannotBeUndefinedError = "COHOR-0000-0005",
  TimeoutCannotBeNegativeError = "COHOR-0000-0006",
  UnknownEnvironmentKeyError = "COHOR-0000-0007",
  CannotSendEmailError = "COHOR-0000-0008",
  NotValidatedAccountError = "COHOR-0000-0009",
  TooManyRequestError = "COHOR-0000-0010",
  EmailRateLimitError = "COHOR-0000-0011",
  UserValidatedError = "COHOR-0000-0012",
  UserInGroupError = "COHOR-0000-0013"

  // Agregar más códigos de error, nunca eliminar...
}
