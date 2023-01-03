import Daitol from 'dai_tol';
import { describe, jest } from "@jest/globals";
import KeyGenPrompt from "../../prompts/keygen";
import KeyGen from '../../libs/keygen';

describe("KeyGenPrompt", () => {
  let subject = new KeyGenPrompt()

  describe("#callAsync", () => {

    it("Genate a new keygen if the new option is selected", async () => {
      let spy = jest.spyOn(subject, 'askOptions').mockImplementation(async () => {
        await subject.execResult.set("answer", "new")
      })

      await subject.callAsync()
      let keygen: KeyGen = subject.execResult.get("keygen")

      expect(subject.execResult).toBeInstanceOf(Daitol.ExecResult)
      expect(keygen).toBeInstanceOf(KeyGen)
      expect(keygen.publicKey()).toBeTruthy()
      expect(keygen.privateKey()).toBeTruthy()

      spy.mockRestore();
    })
  })
})