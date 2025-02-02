"use strict"

/**
 * @description
 *	Allows to run a Serverless Framework application locally, even when the
 *	entry-point of the functions are an image command for Docker deployment.
 *
 *	This plugin currently works in Python and TypeScript applications.
 *
 * @see https://www.serverless.com/framework/docs/guides/plugins/creating-plugins
 */
class DockerOfflinePlugin {
  static #PLUGIN_NAME = "DockerOfflinePlugin"
  static #UNKNOWN_HOOK = "..."

  // Serverless Framework properties.
  #serverless

  // Plugin properties.
  #activeHookName = DockerOfflinePlugin.#UNKNOWN_HOOK
  #imagePerFunction = new Map()

  constructor(serverless, _options) {
    this.#log("Activated.")
    this.#activateHook("initialize", () => this.onInitialize())
    this.#activateHook("after:package:createDeploymentArtifacts", () => this.onAfterPackageCreateDeploymentArtifacts())
    this.#serverless = serverless
  }

  /*
   * Serverless Framework Hooks
   */

  /**
   * @description
   *	Translate every function over Docker image to a plain function
   *	handler. This allows the application to run over plugins that doesn't
   *	know how to handle image entry-points.
   */
  onInitialize() {
    this.#log("Image command to handler transformation begun...")
    this.#imageCommandToHandler(this.#serverless.service.functions)
    this.#log("Transformation is done.")
  }

  /**
   * @description
   *	Translate every modified function entry-point to his original state,
   *	to allow the final deployment to succeed as expected.
   */
  onAfterPackageCreateDeploymentArtifacts() {
    this.#log("Handler to image command transformation begun.")
    this.#handlerToImageCommand(this.#serverless.service.functions)
    this.#log("Transformation is done.")
  }

  /*
   * Plugin Private Methods
   */

  /**
   * @description
   *	Flags the activation of an specific Serverless Framework hook on this
   *	plugin.
   */
  #activateHook(name, handler) {
    this.hooks = {
      ...this.hooks,
      [name]: () => {
        this.#activeHookName = name
        handler()
        this.#activeHookName = DockerOfflinePlugin.#UNKNOWN_HOOK
      }
    }
  }

  /**
   * @description
   *	Change handler entry-point to image command definition in every
   *	function that receives.
   *
   * @example
   *	// A function defined with a handler entry-point:
   *	LambdaFunctionName:
   *	  handler: src/main/typescript/EntryPoint.LambdaFunctionName
   *	  ...
   *
   *	// will be transformed into a function with an image command:
   *	LambdaFunctionName:
   *	  image:
   *	    command:
   *	      - src/main/typescript/EntryPoint.LambdaFunctionName
   *	    name: main
   *	  ...
   */
  #handlerToImageCommand(functions) {
    for (const functionName in functions) {
      const lambda = functions[functionName]
      const lambdaImage = this.#imagePerFunction.get(functionName)
      if (lambdaImage !== undefined) {
        lambda.image = lambdaImage
        delete lambda.handler
        this.#log(`Function ${functionName} was transformed.`)
      } else {
        this.#log(`Ignoring function ${functionName}.`)
      }
    }
  }

  /**
   * @description
   *	Change image command to handler entry-point definition in every
   *	function that receives.
   *
   * @example
   *	// A function defined with an image command:
   *	LambdaFunctionName:
   *	  image:
   *	    command:
   *	      - src/main/typescript/EntryPoint.LambdaFunctionName
   *	    name: main
   *	  ...
   *
   *	// will be transformed into a function with a handler entry-point:
   *	LambdaFunctionName:
   *	  handler: src/main/typescript/EntryPoint.LambdaFunctionName
   *	  ...
   */
  #imageCommandToHandler(functions) {
    for (const functionName in functions) {
      const lambda = functions[functionName]
      if (lambda.image !== undefined) {
        const imageCommand = lambda.image.command[0]
        this.#imagePerFunction.set(functionName, lambda.image)
        delete lambda.image
        lambda.handler = imageCommand
        this.#log(`Function ${functionName} was transformed.`)
      } else {
        this.#log(`Ignoring function ${functionName}.`)
      }
    }
  }

  /**
   * @description
   *	Logs a message in the console, with a timestamp.
   */
  #log(message) {
    console.info(
      `[${new Date().toISOString()}][${DockerOfflinePlugin.#PLUGIN_NAME}][${this.#activeHookName}] ${message}`
    )
  }
}

module.exports = DockerOfflinePlugin
