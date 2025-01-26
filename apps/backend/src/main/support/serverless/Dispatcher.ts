import "reflect-metadata"

import { Context } from "aws-lambda"
import Container from "typedi"

import { ServerlessFunction } from "./ServerlessFuncion"
import { Constructor } from "../language/Constructor"
import { ServerlessFunctionDispatcher } from "./type/ServerlessFunctionDispatcher"
import { ShallNotInstantiateError } from "../../errors/ShallNotInstantiateError"
import { LoginFunction } from "../../functions/auth/LoginFunction"
import { RegisterFunction } from "../../functions/auth/RegisterFunction"
import { ExampleFunction } from "../../functions/ExampleFunction"
import { RoleAuthorizerFunction } from "../../authorization/RoleAuthorizerFunction"
import { ValidateAccountFunction } from "../../functions/auth/ValidateAccountFunction"
import { UpdateUserFunction } from "../../functions/user/UpdateUserFunction"
import { ValidationAccountSuccessfullyFunction } from "../../functions/auth/ValidationAccountSuccessfullyFunction"
import { ResendEmailFunction } from "../../functions/auth/ResendEmailFunction"
import { GoogleAuthorizerFunction } from "../../authorization/GoogleAuthorizerFuncion"
import { GetLoggedUserFunction } from "../../functions/auth/GetLoggedUser"
import { CreateGroupFunction } from "../../functions/group/CreateGroupFunction"
import { JoinGroupFunction } from "../../functions/group/JoinGroupFunction"
import { GetProfileImagePresignedParamsFunction } from "../../functions/user/GetProfileImagePresignedParamsFunction"

/**
 * @description
 *	Dispatcher principal de la aplicación. Se encarga de enrutar los
 *	diferentes eventos entre los handlers instalados.
 */
export class Dispatcher {
  private constructor() {
    throw new ShallNotInstantiateError()
  }

  /**
   * @description
   *	Construye el dispatcher de la función requerida mediante el inyector
   *	principal, lo que permite inyectar las dependencias requeridas
   *	automáticamente, en el constructor de la misma.
   */
  public static of<E = unknown, R = void>(
    serverlessFunction: Constructor<ServerlessFunction<E, R>>
  ): ServerlessFunctionDispatcher<E, R> {
    return async (event: E, context: Context) => await Container.get(serverlessFunction).runAsync(event, context)
  }
}

// Authorizer
export const RoleAuthorizer = Dispatcher.of(RoleAuthorizerFunction)
export const GoogleAuthorizer = Dispatcher.of(GoogleAuthorizerFunction)

// Auth
export const GetLoggedUser = Dispatcher.of(GetLoggedUserFunction)
export const Login = Dispatcher.of(LoginFunction)
export const Register = Dispatcher.of(RegisterFunction)
export const ValidateAccount = Dispatcher.of(ValidateAccountFunction)
export const ResendEmail = Dispatcher.of(ResendEmailFunction)
export const ValidationAccountSuccessfully = Dispatcher.of(ValidationAccountSuccessfullyFunction)

// User
export const UpdateUser = Dispatcher.of(UpdateUserFunction)
export const GetProfileImagePresignedParams = Dispatcher.of(GetProfileImagePresignedParamsFunction)

// Group
export const CreateGroup = Dispatcher.of(CreateGroupFunction)
export const JoinGroup = Dispatcher.of(JoinGroupFunction)

export const Example = Dispatcher.of(ExampleFunction)
