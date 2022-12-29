import dotenv from "dotenv"
import prompts from "prompts";
import KeyGen from "../../libs/keygen";
import Logger from "../../libs/logger";
import KeyGenPrompt from "../../prompts/keygen";

dotenv.config();

KeyGenPrompt.call().then((keygen) => {
  Logger.d(keygen.toString());
})