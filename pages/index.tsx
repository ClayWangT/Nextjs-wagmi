import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.m.scss'
import {useAccount, useConnect, useDisconnect} from "wagmi";
import MountControl from "../components/MountControl";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className={styles.homeLayout}>
      <Head>
        <title>Test</title>
        <meta name="description" content="Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MountControl>
        {isConnected ? <>
          Connect to {address}<br/>
          <button onClick={() => disconnect()}>Disconnect</button>
        </> : <>
          {
            connectors.map(connector => <button key={connector.name} onClick={() => connect({connector})}>{connector.name}</button>)
          }
        </>}

        {error && <div style={{color: 'red'}}>{error.message}</div>}
      </MountControl>
    </div>
  )
}

export default Home
