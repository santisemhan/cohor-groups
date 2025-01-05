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

// Auth
export const Login = Dispatcher.of(LoginFunction)
export const Register = Dispatcher.of(RegisterFunction)

export const Example = Dispatcher.of(ExampleFunction)
