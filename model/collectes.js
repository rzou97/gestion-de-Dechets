var mongo=require("mongoose")
const Schema=mongo.Schema;
const Collecte=new Schema({
bateau : String,
coord: {
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
},
quantité: Number,
status:String,
});
module.exports=mongo.model("collecte",Collecte);