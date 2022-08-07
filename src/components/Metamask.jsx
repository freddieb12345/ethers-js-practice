import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";


const Metamask = () => {
    const [userData, setUserData] = useState(() => {
      const savedData = localStorage.getItem("userData")
      const parsedData = JSON.parse(savedData)
      return parsedData || {}
    }); 
    
    useEffect(() =>{
      localStorage.setItem("userData", JSON.stringify(userData))
    } ,[userData])

    window.onbeforeunload = function() {
      localStorage.removeItem("userData");
      return '';
    };

    async function connectToMetamask() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEther = +ethers.utils.formatEther(balance);
      const currentNetwork = await provider.getNetwork()
      const block = await provider.getBlockNumber();
      console.log(window.ethereum)
      setUserData({
        address: accounts[0], 
        balance: balanceInEther.toFixed(2), 
        network: currentNetwork.name === "homestead" ? "ETH" : currentNetwork.name,
        blockNumber: block
      })
    }
    
    function renderMetamask() {
      if (!userData.address) {
          return (
            <button onClick={() => connectToMetamask()}>Connect to Metamask</button>
          )
        }
        else {
          return (
            <div>
              <p>Welcome {userData.address}</p>
              <p>Your {userData.network.toUpperCase()} Balance is: {userData.balance}
              <br />
              Which is equivalent to </p>
              
              <p>The current block number is: {userData.blockNumber}</p>
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

export default Metamask;
