import dotenv from "dotenv"
import KeyGen from "../../libs/keygen";
import Logger from "../../libs/logger";
import KeyGenPrompt from "../../prompts/keygen";
import Daitol from "dai_tol"

dotenv.config();

KeyGenPrompt.callAsync().then((response) => {
  let keygen: KeyGen = response.get("keygen");
  Logger.d(keygen.toString())
})

