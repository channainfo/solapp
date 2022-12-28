import { describe } from "@jest/globals";
import { equal } from "assert";
import KeyGen from "../../libs/keygen";

describe("KeyGen", () => {
  let describedClass = KeyGen;
  let privateKey = "3,84,118,198,209,190,8,203,93,25,172,120,18,171,173,160,118,125,95,23,155,211,183,39,14,195,27,39,64,131,252,28,252,20,167,204,70,64,20,83,198,110,32,213,51,135,245,10,117,55,51,199,159,191,86,233,98,243,60,38,66,191,169,130"
  let publicKey = "Hy21Sfi2oxusgN1KXsMYEbiHFz77M1NUiadDQNGgRjZB"

  describe("constructor", () => {

    it("set keypair", () => {
      let keypair = describedClass.create().keypair;

      let subject = new describedClass(keypair);
      expect(subject.keypair).toEqual(keypair)
    })
  })

  describe(".create", () => {
    it("create a keygen randomly", () => {
      let subject = describedClass.create()
      expect(subject).toBeInstanceOf(describedClass)
    })
  })

  describe(".fromPrivateKey", () => {
    it("create a KeyGen object from the private key string", () => {
      let subject = describedClass.fromPrivateKey(privateKey)

      expect(subject).toBeInstanceOf(describedClass);
      expect(subject.privateKey()).toEqual(privateKey)
      expect(subject.publicKey()).toEqual(publicKey)
    })
  })

  describe("#publicKey", () => {
    it("return a publicKey string", () => {
      let subject = describedClass.fromPrivateKey(privateKey)
      expect(subject.publicKey()).toEqual(publicKey)

    })
  })

  describe("#privateKey", () => {
    it("return a privateKey string", () => {
      let subject = describedClass.fromPrivateKey(privateKey)
      expect(subject.privateKey()).toEqual(privateKey)

    })
  })

  describe("#toString", () => {
    it("return string with private key and public key value", () => {
      let subject = describedClass.fromPrivateKey(privateKey)
      let result = subject.toString()

      expect(result).toContain(privateKey)
      expect(result).toContain("Private key:")
      expect(result).toContain(publicKey)
      expect(result).toContain("Public key:")
    })
  })
})