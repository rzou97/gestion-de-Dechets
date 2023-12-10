var mongo=require("mongoose")
const Schema=mongo.Schema;
const Dechets=new Schema({
    user: String,
    coordonnée: {
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
    typedechets: String,
});

Dechets.index({ coordonnée: "2dsphere" })
module.exports=mongo.model("dechets",Dechets);