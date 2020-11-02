import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import './App.css'

class App extends Component {

  // Connecting MetaMask

  /*
  React has these life cycle callbacks.
  When the components are getting rendered, before it gets put on the page,
  we can call the callback function and in this code, it'll call loadWeb3()
  */

  // this is a life cycle function inside of React
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // this function fetches all of the data from the blockchain
  async loadBlockchainData() {
    const web3 = window.web3    // we have attached Web3 to the window at loadWeb3()

    const accounts = await web3.eth.getAccounts()
    console.log(accounts, "AAA")

    this.setState({ account: accounts[0] })

    // detect the network inside of the app with Web3
    const networkId = await web3.eth.net.getId()
    console.log(networkId)  // 5777 is the network id for Ganache. see abis/

    // hydrate the state = fill in all of the state variables

    // load the Mock DAI Token from the abi file
    const daiTokenData = DaiToken.networks[networkId]
    if (daiTokenData) {

      // create a JavaScript version of the smart contract with Web3
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      console.log({ balance: daiTokenBalance })

    } else {
      window.alert('DaiToken contract has not been deployed to detected network')
    }

    // load the Dapp Token from the abi file
    const dappTokenData = DappToken.networks[networkId]
    if (dappTokenData) {

      // create a JavaScript version of the smart contract with Web3
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
      this.setState({ dappToken })
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance: dappTokenBalance.toString() })
      console.log({ balance: dappTokenBalance })

    } else {
      window.alert('DappToken contract has not been deployed to detected network')
    }

    // load the Token Farm from the abi file
    const tokenFarmData = TokenFarm.networks[networkId]
    if (tokenFarmData) {

      // create a JavaScript version of the smart contract with Web3
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
      console.log({ balance: stakingBalance })

    } else {
      window.alert('TokenFarm contract has not been deployed to detected network')
    }

    this.setState({ loading: false })
  }

  // this function connects the app to the blockchain. this is a common pattern
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)               // attach Web3 to the window
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)   // attach Web3 to the window
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // End of Connecting MetaMask

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',

      // smart contracts
      daiToken: {},
      dappToken: {},
      tokenFarm: {},

      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <h1>Hello, World!</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
