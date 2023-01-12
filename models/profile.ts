import * as borsh from "@project-serum/borsh"
import { Buffer } from "buffer"

class Profile {
  name: string
  votesCount: number

  constructor(name: string, votesCount: number) {
    this.name = name
    this.votesCount = votesCount
  }

  static schema = borsh.struct([
    borsh.str("name"),
    borsh.u32("votesCount")
  ])

  encode(): Buffer {
    return Profile.encode(this)
  }

  decode(buffer?: Buffer): Profile | null {
    return Profile.decode(buffer);
  }

  static encode(record: Profile, bufferSize: number = 1000): Buffer {
    debugger
    let buffer = Buffer.alloc(bufferSize)
    let payloads = { ...record }

    this.schema.encode(payloads, buffer);
    const length = this.schema.getSpan(buffer)

    let result = buffer.slice(0, length)
    return result;
  }

  static decode(buffer?: Buffer): Profile | null {
    if (buffer == null)
      return null

    try {
      let payloads = this.schema.decode(buffer)
      let { name, votesCount } = payloads

      let record = new this(name, votesCount)
      return record
    }

    catch (error) {
      console.log(`error: ${error}`)
      return null
    }

  }

}

export default Profile;