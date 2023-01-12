
export default class Serializable {

  static schema = serum.struct([
    serum.u8("variant"),
    serum.str("name"),
    serum.str("message")
  ])

  static encode(record: any, size: number = 1000) {
    let buffer = Buffer.alloc(size)

    let payloads = { ...record }
  }

}