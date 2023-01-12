import { describe } from '@jest/globals';
import Profile from '../../models/profile';

describe("Profile", () => {
  let name = "Mr. Solapp"
  let votesCount = 10
  let describedClass = Profile;

  let subject = new describedClass(name, votesCount)

  describe("contructor", () => {
    it("contruct profile correctly", () => {
      expect(subject.name).toEqual(name)
      expect(subject.votesCount).toEqual(votesCount)
    })
  })

  describe(".encode", () => {
    it("return a buffer", () => {
      let encoded = describedClass.encode(subject)

      expect(encoded).toBeInstanceOf(Buffer)
    })
  })

  describe('.decode', () => {
    it("return profile correctly if buffer is valid", () => {
      let encodedBuffer = describedClass.encode(subject)

      let record = describedClass.decode(encodedBuffer)

      expect(record).toBeInstanceOf(describedClass)
      expect(record?.name).toEqual(name)
      expect(record?.votesCount).toEqual(votesCount)
    })

    it("return null if buffer is null", () => {
      let record = describedClass.decode()
      expect(record).toEqual(null)
    })

    it("return empty Profile if buffer is invalid", () => {
      let buffer = Buffer.alloc(10)

      let record = describedClass.decode(buffer)
      expect(record).toBeInstanceOf(describedClass)

      expect(record?.name).toEqual("")
      expect(record?.votesCount).toEqual(0)
    })
  })
})