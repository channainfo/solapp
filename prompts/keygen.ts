import dotenv from "dotenv"
import prompts from "prompts";
import KeyGen from "../libs/keygen";
import Logger from "../libs/logger";

dotenv.config();

export default class KeyGenPrompt {
  public static async call(): Promise<KeyGen> {
    let answerOption = await KeyGenPrompt.askOptions()

    if (answerOption == "new")
      return KeyGenPrompt.generateKeyGen()

    let answerValue = await KeyGenPrompt.askValue(answerOption)
    let keygen = KeyGenPrompt.loadKeyGen(answerOption, answerValue)

    while (keygen == null) {
      answerValue = await KeyGenPrompt.askValue(answerOption)
      keygen = KeyGenPrompt.loadKeyGen(answerOption, answerValue)
    }

    return keygen;

  }

  public static async askOptions(): Promise<string> {
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
    return answer
  }

  public static async askValue(answerOption: string): Promise<string> {
    let keygenValue = "keygenValue"
    let answerType = answerOption == "env" ? "your ENV var name loaded using process.env" : "your private key string in format 66,14,11,...29,69"
    let keygenValueMessage = `Please enter value for ${answerType}`

    const response = await prompts({
      type: 'text',
      name: keygenValue,
      message: keygenValueMessage,
    });

    let answerKeyGenValue = response[keygenValue].trim()
    return answerKeyGenValue;
  }

  public static generateKeyGen(): KeyGen {
    let keygen = KeyGen.generate()
    return keygen
  }

  public static loadKeyGen(anwserOption: string, answerValue: string): KeyGen | null {
    try {
      if (anwserOption == "env") {
        let privateKey = process.env[answerValue] ?? ""

        if (privateKey == "") {
          let errorMessage = `[${answerValue}] is not a valid value. Make sure that process.env.${answerValue} contains a valid value`
          Logger.d(errorMessage);
          return null;
        }

        let keygen = KeyGen.fromPrivateKey(privateKey)
        return keygen
      }
      else {
        let privateKey = answerValue;
        if (privateKey == "") {
          let errorMessage = `[${answerValue}] is not a value for private key. Make sure the value is correctly formatted`
          Logger.d(errorMessage);
          return null;
        }

        let keygen = KeyGen.fromPrivateKey(privateKey)
        return keygen
      }
    }
    catch (_ex) {
      Logger.d(_ex)
      return null
    }
  }
}