import * as Web3 from "@solana/web3.js";

export default class KeyGen {
  keypair: Web3.Keypair;

  constructor(keypair: Web3.Keypair) {
    this.keypair = keypair;
  }

  public privateKey(): string {
    return this.keypair.secretKey.toString()
  }

  public publicKey(): string {
    return this.keypair.publicKey.toString();
  }

  public static create(): KeyGen {
    let keypair = Web3.Keypair.generate();

    return new KeyGen(keypair);
  }

  public static fromPrivateKey(privateKey: string): KeyGen {
    let secret = privateKey.split(",").map((item) => parseInt(item));
    let secretKey = Uint8Array.from(secret)
    let keypair = Web3.Keypair.fromSecretKey(secretKey)

    return new KeyGen(keypair);
  }


}

