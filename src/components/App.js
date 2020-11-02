import React, { Component } from 'react'
import Web3 from 'web3'
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

  async loadBlockchainData() {
    const web3 = window.web3    // we have attached Web3 to the window at loadWeb3()

    const accounts = await web3.eth.getAccounts()
    console.log(accounts, "AAA")

    this.setState({ account: accounts[0] })
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
      account: '0x0'
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
