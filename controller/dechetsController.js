var express=require ("express");
var Dechets =require ("../model/dechets");

async function ajout(req, res, next){

    try {
        const { latitude, longitude, typedechets, user } = req.body;

        const dechet = new Dechets({
            coordonnée: {
                type: "Point",
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            typedechets,
            user,
        });

        await dechet.save();
        const io = req.app.get('socketio');
        io.emit('nouvelleDetection', { latitude, longitude });

        res.status(200).send('add done');
    } catch (err) {
        console.log(err);
        res.status(404).send('an error occured');
    }
}
   
    async function show(req, res, next){

        try{
            const data = await Dechets.find();
            res.json(data);
        }
        catch(err) {
            console.log(err);
        }
        }
    
    async function remove (req, res, next){
    
        try{
            await Dechets.findByIdAndDelete(req.params.id,req.body);
            res.send("removed");
              }
            
              catch(err){
              console.log(err);
              };
    
            }
           
            async function update (req, res, next){
    
                try{
                    await Dechets.findByIdAndUpdate(req.params.id,req.body);
                    res.send("updated");
                     }
                
                  catch(err){
                  console.log(err);
                  
                  };
            }
         module.exports= {update,ajout,remove,show} ;