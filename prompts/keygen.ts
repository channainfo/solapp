import dotenv from "dotenv"
import prompts from "prompts";
import KeyGen from "../libs/keygen";
import Logger from "../libs/logger";
import Daitol from "dai_tol";

dotenv.config();

class KeyGenPrompt extends Daitol.Executor {

  public async callAsync() {
    await this.askOptions()

    if (this.execResult.get("answer") == "new") {
      this.generateKeyGen()
      return;
    }

    await this.askValue()

    this.loadKeyGen()

    while (this.execResult.get("keygen") == null) {
      await this.askValue()
      this.loadKeyGen()
    }
  }

  public async askOptions() {
    let keygen = "keygen"

    const response = await prompts({
      type: 'select',
      name: keygen,
      message: 'Please choose the way to generate private/public key',
      choices: [
        { title: '1: Generate a fresh new private key', value: 'new' },
        { title: '2: Using env name, e.g: process.env.privateKey -> privateKey', value: 'env' },
        { title: '3: Using private key as string', value: 'string' }
      ],
    });

    let answer = response[keygen]
    this.execResult.set("answer", answer);
  }

  public async askValue() {
    let keygenValue = "keygenValue"
    let answerOption = this.execResult.get("answer")

    let answerType = answerOption == "env" ? "your ENV var name loaded using process.env" : "your private key string in format 66,14,11,...29,69"
    let keygenValueMessage = `Please enter value for ${answerType}`

    const response = await prompts({
      type: 'text',
      name: keygenValue,
      message: keygenValueMessage,
    });

    let answerKeyGenValue = response[keygenValue].trim()
    this.execResult.set("answerValue", answerKeyGenValue)
  }

  public generateKeyGen() {
    let keygen = KeyGen.generate()
    this.execResult.set("keygen", keygen)
  }

  public loadKeyGen() {
    let anwserOption = this.execResult.get("answer")
    let answerValue = this.execResult.get("answerValue")

    try {
      if (anwserOption == "env") {
        let privateKey = process.env[answerValue] ?? ""

        if (privateKey == "") {
          let errorMessage = `[${answerValue}] is not a valid value. Make sure that process.env.${answerValue} contains a valid value`
          this.execResult.set("keygen", null)
          this.execResult.fail(errorMessage);
        }

        let keygen = KeyGen.fromPrivateKey(privateKey)
        this.execResult.set("keygen", keygen)
      }
      else {
        let privateKey = answerValue;
        if (privateKey == "") {
          let errorMessage = `[${answerValue}] is not a value for private key. Make sure the value is correctly formatted`
          this.execResult.set("keygen", null)
          this.execResult.fail(errorMessage)
        }

        let keygen = KeyGen.fromPrivateKey(privateKey)
        this.execResult.set("keygen", keygen)
      }
    }
    catch (_ex) {
      Logger.d(_ex)
      return null
    }
  }
}

export default KeyGenPrompt;