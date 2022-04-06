import React, { useEffect, useState, createContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

export const TransactionsContext = createContext()

const { ethereum } = window

const getEthereumContract = () =>{
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const transactionContract = new ethers.Contract(contractAddress,contractABI,signer)

      return transactionContract
}

export const TransactionsProvider = ({children}) =>{
      const [formData, setFormData ] = useState({addressTo: '', amount: '', keyword: '', message: ''})
      const [currentAccount, setConnectedAccount] = useState('')
      const [isLoading, setisLoading] = useState(false)
      const [transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'))
      const [transactions, setTransactions] = useState([]);

      const handleChange = (e, name) =>{
            setFormData((prevState) => ({...prevState, [name]: e.target.value}))
            console.log(formData)
      }

      const checkWalletConnection = async () =>{
            try {
                  if(!ethereum) return "Please install MetaMask"

                  const accounts = await ethereum.request({ method: "eth_accounts" })
                  if(accounts.length){
                  setCurrentAccount(accounts[0])
                  
                  // getAll transactions
                  }else{
                        console.log('No accounts found')
                  }
            } catch (error) {
                  console.log(error)
            }
      }

      const connectWallet = async () =>{
            try {
                  if(!ethereum) return "Please install MetaMask"
                  const accounts = await ethereum.request({ method: "eth_requestAccounts" })
                  setConnectedAccount(accounts[0])
            } catch (error) {
                  console.log(error)

                  throw new Error('no ethereum object.')
            }
      }

      const sendTransaction = async () =>{
            try {
                  if(!ethereum) return "Please install MetaMask"

                  const { addressTo, amount, keyword, message } = formData
                  const transactionContract = getEthereumContract()
                  const parsedAmount = ethers.utils.parseEther(amount)

                  // get the data from the form ...
                  await ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [{
                              from: currentAccount,
                              to: addressTo,
                              gas: '0x5208', // 21000 Gwei
                              value: parsedAmount._hex,
                        }]
                  })
                 const  transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message )
                 setisLoading(true)
                 console.log(`Loading - ${transactionHash.hash}`)
                 await transactionHash.wait()
                 setisLoading(false)
                 console.log(`Success - ${transactionHash.hash}`)
                 const transactionCount = await transactionContract.getTransactionCount()

                 setTransactionCount(transactionCount.toNumber())
            } catch (error) {
                  console.log(error)

                  throw new Error('no ethereum object.')
            }

      }


      useEffect(()=>{
            checkWalletConnection()
      }, [])
      return (
      <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            { children }
      </TransactionsContext.Provider>
      )
}