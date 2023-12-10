var express=require ("express");
const Collecte =require ("../model/collectes");

async function ajout(req, res, next){

    try{
        const collecte=new Collecte ({
            coord: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]},
        })
        await collecte.save();
        res.status(200).send('add done');
    }
    catch(err) {
        console.log(err);
        res.status(404).send('an error occured');
    }
    }
   
    async function show(req, res, next){

        try{
            const data = await Collecte.find();
            res.json(data);
        }
        catch(err) {
            console.log(err);
        }
        }
    
    async function remove (req, res, next){
    
        try{
            await Collecte.findByIdAndDelete(req.params.id,req.body);
            res.send("removed");
              }
            
              catch(err){
              console.log(err);
              };
    
            }
           
            async function update (req, res, next){
    
                try{
                    await Collecte.findByIdAndUpdate(req.params.id,req.body);
                    res.send("updated");
                     }
                
                  catch(err){
                  console.log(err);
                  
                  };
            }
         module.exports= {update,ajout,remove,show} ;