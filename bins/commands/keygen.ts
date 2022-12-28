import dotenv from "dotenv"
import prompts from "prompts";
import KeyGen from "../../libs/keygen";
import Logger from "../../libs/logger";

dotenv.config();

(async () => {
  let keygen = "keygen"

  let response = await prompts({
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

  if (answer == "new") {
    let keygen = KeyGen.generate();
    Logger.d(keygen.toString())

    return 0;
  }

  let keygenValue = "keygenValue"
  let answerType = answer == "env" ? "your ENV var name loaded using process.env" : "your private key string in format 66,14,11,...29,69"
  let keygenValueMessage = `Please enter value for ${answerType}`

  response = await prompts({
    type: 'text',
    name: keygenValue,
    message: keygenValueMessage,
  });

  console.log(response)
  let answerKeyGenValue = response[keygenValue].trim()

  if (answer == "env") {
    let privateKey = process.env[answerKeyGenValue] ?? ''


    let keygen = KeyGen.fromPrivateKey(privateKey)
    Logger.d(keygen.toString())
  }
  else {
    let privateKey = answerKeyGenValue;
    let keygen = KeyGen.fromPrivateKey(privateKey)

    Logger.d(keygen.toString())
  }
})();