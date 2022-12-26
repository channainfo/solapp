import { describe, expect, it } from "@jest/globals";
import Introduction from "../../models/introduction";

describe('Introduction', () => {
  let name = "Joe"
  let message = "Hello"
  let subject = new Introduction(name, message)
  let describedClass = Introduction;

  describe('contructor', () => {
    it('set attributes correctly', () => {
      expect(subject.name).toEqual(name)
      expect(subject.message).toEqual(message)

    })
  })

  describe('#encode', () => {
    it("encode the object and return a buffer", () => {
      let result = subject.encode();
      expect(result).not.toBeFalsy()
    })
  })

  describe(".encode", () => {

    it("encode the subject and return a buffer", () => {
      let buffer = describedClass.encode(subject);
      expect(buffer).not.toBe(null)
    })
  })

  describe(".decode", () => {

    it("decode the subject and return record if the buffer is valid", () => {
      let buffer = describedClass.encode(subject);
      let object = describedClass.decode(buffer)!;

      expect(object.name).toEqual(name)
      expect(object.message).toEqual(message)
    })

    it("return empty record if buffer is empty", () => {
      let buffer = Buffer.alloc(100)
      let object = describedClass.decode(buffer)!;
      expect(object.name).toEqual("")
      expect(object.message).toEqual("")
    })

    it("return null if the buffer in null", () => {
      let buffer = undefined
      let object = describedClass.decode(buffer);
      expect(object).toBeNull()
    })
  })
})