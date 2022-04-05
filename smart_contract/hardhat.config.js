require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks:{
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/ViufxctcOZsMhXtWBddioqwhWABRsHzW',
      accounts: ['48d7a2ed3ef5464062a4911a4f6e2dc93a22bea77a16042e2121a381d6bbc7a4']
    }
  }
}
