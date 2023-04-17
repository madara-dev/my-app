import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()
// To get equity details for specific symbol
nseIndia.getEquityDetails('IRCTC').then(details  => {
console.log(details.priceInfo.lastPrice)
})
 
// To get equity historical data for specific symbol

