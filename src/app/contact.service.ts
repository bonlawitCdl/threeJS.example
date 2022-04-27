import { Injectable } from '@angular/core';
import Web3 from "web3";
import { ethers } from "ethers"; 
declare let window:any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_favoriteNumber",
          "type": "uint256"
        }
      ],
      "name": "addPerson",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "nameToFavoriteNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "people",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "favoriteNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_favoriteNumber",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  async loadWeb3() {
    //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(window.web3.currentProvider);
    const web3js = new Web3(window.web3.currentProvider)
    console.log(web3js);
    const account = web3js.eth.getAccounts((err:any, data:any) => {
      console.log(err,data)
    });
    //console.log(account);
    /*const account = window.web3.eth.getAccounts((err:any, data:any) => {
      console.log(err,data);
    });
    console.log(account);*/
    /*if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account);
        console.log(window.web3sss)
        //console.log(await window.web3.eth.net.getNetworkType())
        console.log(window.ethereum)
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        console.log(2);
    } else {
        window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }*/
  }
  async useStore() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const contract = new ethers.Contract(this.contractAddress, this.abi, singer);
    try {
      await contract.store(21);
    } catch (error) {
      console.log(error);
    }
  }
  async useRetrieve() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const contract = new ethers.Contract(this.contractAddress, this.abi, singer);
    try {
      const data = await contract.retrieve();
      console.log(data);
      const conv = ethers.BigNumber.from(data).toString();
      console.log("aa",conv);
    } catch (error) {
      console.log(error);
    }
  }
}