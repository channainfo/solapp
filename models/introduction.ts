import * as serum from "@project-serum/borsh";
import { Buffer } from "buffer";

class Introduction {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }


  static schema = serum.struct([
    serum.u8("variant"),
    serum.str("name"),
    serum.str("message")
  ])

  encode(): Buffer {
    return Introduction.encode(this)
  }

  static encode(record: Introduction): Buffer {
    let buffer = Buffer.alloc(1000)
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