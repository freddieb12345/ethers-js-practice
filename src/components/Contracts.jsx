import React, { useState } from 'react';
import { ethers } from "ethers";

const Contracts = () => {
    const [contractData, setContractData] = useState(() => {
        const savedData = localStorage.getItem("contractData")
        const parsedData = JSON.parse(savedData)
        return parsedData || {}
      }); 

    const maticAddress = "0x0000000000000000000000000000000000001010"
    const ERC20_ABI = [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function totalSupply() view returns (uint256)",
      "function balanceOf(address) view returns (uint)",
    ]

    async function contractInfo(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(maticAddress, ERC20_ABI, provider)
        const name = await contract.name()
        const symbol = await contract.symbol()
        const totalSupply = await contract.totalSupply()
        const parsedTotalSupply = (JSON.parse(totalSupply)).toPrecision(28)
        const accounts = await provider.send("eth_requestAccounts", []);
        const myBalance = await contract.balanceOf(window.ethereum.selectedAddress)
        const myFormattedBalance = +ethers.utils.formatEther(myBalance)
        setContractData({
            name: name,
            symbol: symbol,
            totalSupply: parsedTotalSupply,
            balance: myFormattedBalance
        })
    }


    return (
        <div>
            <button onClick={contractInfo}> click me</button>
            <p>You are using {contractData.name}, which has the symbol {contractData.symbol} with a total supply of {contractData.totalSupply} <br />
            Your {contractData.symbol} balance is {contractData.balance.toFixed(4)}</p>
        </div>
    );
}

export default Contracts;
