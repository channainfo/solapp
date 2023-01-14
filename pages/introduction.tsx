import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useState } from "react";
import Layout from "../components/Layout";
import KeyGen from "../libs/keygen";
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

    const instructions = new TransactionInstruction({
      keys: [],
      data: programData(),
      programId: programId
    })
    const transaction = new Transaction();
    transaction.add(instructions);
    let apiUrl = process.env.devServer ?? clusterApiUrl('devnet')

    const connection = new Connection(apiUrl);
    console.log(`apiUrl: ${apiUrl}`)

    let keypair = keygen().keypair;
    const txId = await sendAndConfirmTransaction(connection, transaction, [keypair]);
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

  const keygen = (): KeyGen => {
    let keygen = KeyGen.fromPrivateKey(process.env.devPrivateKey ?? "")
    return keygen
  }

  const breadcrumbData = [
    new Map<string, any>([["label", "Home"], ["url", "/"], ["alt", "Home"]]),
    new Map<string, any>([["label", "Introduction"], ["url", "/introduction"], ["alt", "Introduction"]]),
  ]
  return (
    <Layout home={false} breadcrumbs={breadcrumbData}>
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