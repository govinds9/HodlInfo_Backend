import dotenv from "dotenv"
import express, { json } from "express"
import connectDB from "./db/index.js"
import axios from "axios"
import { Crypto } from "./model/crypto.model.js"
import cors from "cors"
dotenv.config({
  path:"./.env"
})
const app = express()
app.use(cors())
await connectDB()

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
   
     
     if(response){
    await Crypto.deleteMany({}); 
    let cnt =0;
       for(let x in response){
       
        if(cnt===5){
          let y = 0;
          const data = response[x];
          for(let key in data){
            const { name, volume, sell, buy, last, base_unit,high } = data[key];
            const newCrypto = new Crypto({name,volume,sell,buy,last,base_unit,high})
            await newCrypto.save();
            y++;
            if(y===10)break
          }
          break
        }
       
        cnt++;
      
        
       }
      }

  } catch (error) {
    console.error('Error fetching and saving data:', error.message);
  }
};

// Fetch and save data every minute
setInterval(fetchData, 60000);




app.get("/",async (req, res)=>{
  const data = await Crypto.find()
  res.status(200).json({
    status:200,
    message:"Data Fetched Successfully",
    data
  })
})


app.listen(8000,()=>{
    console.log("server is running on port:  8000" )
})