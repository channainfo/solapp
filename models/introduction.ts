import * as borsh from "@project-serum/borsh";
import { Buffer } from "buffer";

class Introduction {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }

  static schema = borsh.struct([
    borsh.u8("variant"),
    borsh.str("name"),
    borsh.str("message")
  ])

  encode(): Buffer {
    return Introduction.encode(this)
  }

  static encode(record: Introduction, bufferSize: number = 1000): Buffer {
    let buffer = Buffer.alloc(bufferSize)
    let payloads = { ...record, variant: 0 }

    this.schema.encode(payloads, buffer);
    const length = this.schema.getSpan(buffer)

    let result = buffer.slice(0, length)

    return result;
  }

  static decode(buffer?: Buffer): Introduction | null {
    if (buffer == null)
      return null

    try {
      const payloads = this.schema.decode(buffer);
      const { name, message } = payloads;
      let record = new Introduction(name, message)
      return record
    }
    catch (error) {
      console.log(`Error decoding: ${error}`)
      return null
    }
  }


}

export default Introduction;