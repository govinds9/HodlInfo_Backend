import mongoose,{Schema} from "mongoose"

const cryptoSchema = new Schema({
    name:{
        type:String
    },
    base_unit:{
        type:String
    },
    sell:{
        type:String
    },
    buy:{
        type:String
    },
    last:{
        type:String
    },
    volume:{
        type:String
    },
    high:{
        type:String
    }

},{
    timestamps:true
})

export const Crypto = mongoose.model("Crypto",cryptoSchema)