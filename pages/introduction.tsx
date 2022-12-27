import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useState } from "react";
import Layout from "../components/Layout";
import Introduction from "../models/introduction";

export default function IntroductionPage() {
  const [loading, setLoading] = useState(false)
  const [txid, setTxid] = useState('')


  const runProgram = async () => {
    setTxid('');
    setLoading(true);
    let message = `Run program: ${process.env.devProgramId}`;
    alert(message)

    let programId = new PublicKey(process.env.devProgramId ?? '')
    let publicKey = new PublicKey(process.env.devPublicKey ?? '')

    let data = programData();

    const instructions = new TransactionInstruction({
      keys: [],
      data: data,
      programId: programId
    })
    const transaction = new Transaction();
    transaction.add(instructions);
    let apiUrl = process.env.devServer ?? clusterApiUrl('devnet')

    const connection = new Connection(apiUrl);
    console.log(`apiUrl: ${apiUrl}`)

    const txId = await sendAndConfirmTransaction(connection, transaction, [keypair()]);
    const txIdURI = `
    - solana confirm -v ${txId}
    - https://explorer.solana.com/tx/${txId}?cluster=devnet
    `

    setTxid(txIdURI);
    setLoading(false)
  }

  const programData = (): Buffer => {
    let name = "Joe"
    let message = "Hi there!"
    let intro = new Introduction(name, message)

    return intro.encode()
  }

  const keypair = () => {
    const secret = JSON.parse(process.env.devPrivateKey ?? "") as number[];
    const byteArray = Uint8Array.from(secret)
    return Keypair.fromSecretKey(byteArray);
  }

  return (
    <Layout home={false}>
      <div style={{ marginTop: '30px', maxWidth: '1024px' }}>
        <h2>Introduction Program</h2>
        <ul>
          <li>
            <a onClick={runProgram}> Run {process.env.devProgramId}</a>
            <p>
              {loading ? 'Loading...' : ''}
            </p>

            <p>
              {txid ? <span>{txid}</span> : ''}
            </p>

          </li>
        </ul>
      </div >
    </Layout>
  )
}