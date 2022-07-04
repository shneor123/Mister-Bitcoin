'use strict'

import axios from 'axios'

const STORAGE_KEY = 'bitcoinDb'


export default {
  getRate,
  getMarketPrice,
  getConfirmedTransaction,
  getAvgBlockSize
}

async function getRate(coins) {
  try {
      const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
    throw err
  }
}
const gBitcoinDb = {
  tradeVolume: null,
  avgBlockSize: null,
  marketPrice: null,
}


function getMarketPrice() {
  return _getChartData('marketPrice', 'https://api.blockchain.info/charts/market-price?timespan=6months&format=json&cors=true')
}

function getConfirmedTransaction() {
  return _getChartData('tradeVolume', 'https://api.blockchain.info/charts/trade-volume?timespan=6months&format=json&cors=true')
}

function getAvgBlockSize() {
  return _getChartData('avgBlockSize', 'https://api.blockchain.info/charts/avg-block-size?timespan=6months&format=json&cors=true')
}

async function _getChartData(key, url) {
  if (gBitcoinDb[key]) return gBitcoinDb[key]

  let storageData = JSON.parse(localStorage.getItem(STORAGE_KEY))

  if (!storageData?.[key]) {
      const res = await axios.get(url)
      gBitcoinDb[key] = res.data.values
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gBitcoinDb))
  }
  else {
      gBitcoinDb[key] = storageData[key]
  }

  return gBitcoinDb[key]
}