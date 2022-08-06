import React, { useState } from 'react';
import { ethers } from "ethers";

const Metamask = () => {
    const [address, setAddress] = useState();
    const [balance, setBalance] = useState();

    async function connectToMetamask() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEther = ethers.utils.formatEther(balance);
        setAddress(accounts[0])
        setBalance(balanceInEther)
    }

    function renderMetamask() {
        if (!address) {
            return (
              <button onClick={() => connectToMetamask()}>Connect to Metamask</button>
            )
          } else {
            return (
              <div>
                <p>Welcome {address}</p>
                <p>Your ETH Balance is: {balance}</p>
              </div>
            );
          }
    }

    return (
        <div>
            {renderMetamask()}
        </div>
    );
}

// export default Metamask;


// class Metamask extends React.Component {
//     constructor() {
//         super()

//         this.state = {
//             yourAddress:"",
//             balance:""
//         };
//     }

//     async connectToMetamask() {
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const accounts = await provider.send("eth_requestAccounts", []);
//         const balance = await provider.getBalance(accounts[0])
//         const balanceInEther = ethers.utils.formatEther(balance)
//         this.setState({ yourAddress: accounts[0], balance: balanceInEther })
//         console.log(this.state)
//     }

//     renderMetamask() {
//         if(!this.state.yourAddress) {
//             return(
//                 <div>
//                     <button onClick={() => this.connectToMetamask()}>Connect to metamask</button>
//                 </div>
//             )
//         } else {
//             <div>
//                 <p>Welcome {this.state}</p>
//                 <p>Your ETH balance is: {this.state.balance}</p>
//             </div>
//         }
//     }

//     render() {
//         return(
//             <div>
//                 {this.renderMetamask()}
//             </div>
//         )
//     }
// }

export default Metamask;
