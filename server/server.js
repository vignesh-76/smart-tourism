const express=require('express')
const mongoose=require('mongoose')
const multer=require('multer')
const cros=require('cors');
const { json } = require('stream/consumers');
const { error } = require('console');
const dotenv=require('dotenv')
dotenv.config();

const twilio = require("twilio");
const bodyParser = require("body-parser");

const app=express();
app.use(cros());
app.use(express.json())
const otpStore = {};

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = "VA30a1775613451227e65fa27d752f4f9b";

const client = twilio(accountSid, authToken);


mongoose.connect(process.env.MongoDb_Api).then(()=>{console.log("Database is connected")}).catch((err)=>{console.log(err)})

const personaldetailsschema=new mongoose.Schema({
    name:String,
    phonenumber:Number,
    parentmobilenumber:Number,
    aadharcard:Number,
    pancard:Number,
},{_id:true})

const acceptschema=new mongoose.Schema({
    touristid:String,
        agentid:String,
        bookingid:String,
         notifications: [
    {
      touristName: String,
      message: String,
      latitude: Number,
      longitude: Number,
      phonenumber:Number,
      touristid:String,
      date: { type: Date, default: Date.now }
    }
  ]
})
const tourist=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    state:String,
    city:String,
    address:String,
    zip:String,
    phonenumber:Number,
    personaldetails:[personaldetailsschema],
    acceptbytourist:[acceptschema]

})


const agentsguide=new mongoose.Schema({
    state:String,
    city:String,
    fromplace:String,
    toplace:String,
    priceincludefood:Number,
    priceexcludefood:Number,
    agentamount:Number,
    
},{_id:true})


const agent=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    username:String,
    city:String,
    state:String,
    address:String,
    aadharcard:String,
    pancard:String,
    phonenumber:Number,
    available:Boolean,
    touristagent:[agentsguide],
   
  booking:[{
    name:String,
    email:String,
    phonenumber:Number,
    from:String,
    to:String,
    amount:String,
    touristid:String
  }],
  acceptbytourist:[acceptschema]
})



const touristdepartment=new mongoose.Schema({
    username:String,
    password:String,
    statefilterbyagent:String
},{_id:true})




const touristmodel=new mongoose.model('tourist',tourist)
const agentmodel=new mongoose.model('agent',agent)
const tdmodel=new mongoose.model('touristdepartment',touristdepartment)

app.post('/newtourist',async(req,res)=>{
   const {name,email,password,phonenumber,address,city,state,zip}=req.body;
    try{
        const list=await touristmodel({name,email,password,phonenumber,address,city,state,zip})
        await list.save();
        res.status(200).json(list)
    }catch(err){
        console.log(err)
    }
})

app.put('/newtourist/:id',async(req,res)=>{
      const id =req.params.id;
      const {name,email,password,phonenumber,address,city,state,zip}=req.body;
    try{
       const tourist=await touristmodel.findById(id);
       tourist.name=name,
       tourist.email=email,
       tourist.password=password,
       tourist.phonenumber=phonenumber,
       tourist.address=address,
       tourist.city=city,
       tourist.state=state,
       tourist.zip=zip

       await tourist.save()
       res.status(201).json(tourist);

    }catch(err){
        console.log(err)
    }
})

app.get('/gettourist',async(req,res)=>{
    
    try{
        const list= await touristmodel.find()
        res.status(200).json(list)
    }catch(err){
        console.log(err);
    }
})

app.delete('/deletetourist/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    try{
        const list=await touristmodel.findByIdAndDelete(id);
        res.status(200).json(list)
    }catch(err){
        console.log(err)
    }
})   

app.post('/newtourist/:id/personaldetails',async(req,res)=>{
    const id=req.params.id;
 
    const {name,phonenumber,parentmobilenumber,aadharcard,pancard}=req.body;

    try{
        const list=await touristmodel.findById(id);
        if(!list){
            res.status(404).json({message:'User not found'});
        }
        list.personaldetails.push({name,phonenumber,parentmobilenumber,aadharcard,pancard})
        list.save()
        res.status(200).json(list)

    }catch(err){
        console.log(err) 
    }
})

app.put('/newtourist/:id/personaldetails/:id1',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    const {name,phonenumber,parentmobilenumber,aadharcard,pancard}=req.body;

    try{
        const list=await touristmodel.findById(id);
        if(!list){
            res.status(404).json({message:'User not found'});
        }
        const update=await list.personaldetails.id(id1)
        if(!update){
            res.status(404).json({message:'User not found'});
        }
        update.name=name,
        update.phonenumber=phonenumber,
        update.parentmobilenumber=parentmobilenumber,
        update.aadharcard=aadharcard,
        update.pancard=pancard
        await list.save();
        res.status(200).json({message:'update sucessfully.'})
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error.'})
    }
})

app.get('/newtourist/:id/personaldetails',async(req,res)=>{
    const id=req.params.id;
    const list=await touristmodel.findById(id);
    try{
        if(!list){
            res.status(404).json({message:'user not found'})
        }
        res.status(201).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

app.get('/agent',async(req,res)=>{
    try{
        const list=await agentmodel.find();
        res.status(200).json(list);
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})
app.post('/newagent',async(req,res)=>{

    const {name,email,password,username,city,state,address,aadharcard,pancard,phonenumber}=req.body;


    try{
       const list=await agentmodel({name,email,password,username,city,state,address,aadharcard,pancard,phonenumber})
       await list.save();
       res.status(200).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

app.put('/editagent/:id',async(req,res)=>{
    const id=req.params.id;
    const {name,email,password,username,city,state,address,pancard,aadharcard,phonenumber}=req.body;
    const list=await agentmodel.findById(id);
    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
        list.name=name,
        list.email=email,
        list.password=password,
        list.username=username,
        list.city=city,
        list.state=state,
        list.address=address,
        list.pancard=pancard,
        list.aadharcard=aadharcard,
        list.phonenumber=phonenumber
        await list.save()
        res.status(201).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.delete('/deleteagent/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await agentmodel.findByIdAndDelete(id);
        res.status(200).json({message:"Agent deleted sucessfully."})
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.post('/agent/:id/agentdetail',async(req,res)=>{
    const id=req.params.id;
    const list=await agentmodel.findById(id);

    try{
        if(!list){
            res.status(404).json({message:"Agent not found"})
        }
        list.touristagent.push(req.body)
        await list.save()
        res.status(200).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error."})
    }
})

app.put('/agent/:id/editagent/:id1',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    const {state,city,fromplace,toplace,priceincludefood,priceexcludefood,agentamount}=req.body;
    const list=await agentmodel.findById(id);
    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
        const update=await list.agentsguide.findById(id1);
        update.state=state,
        update.city=city,
        update.fromplace=fromplace,
        update.toplace=toplace,
        update.priceincludefood=priceincludefood,
        update.priceexcludefood=priceexcludefood,
        update.agentamount=agentamount
        await update.save();
        res.status(201).json(update);
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.delete('/agent/:id/deleteagent/:id1',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    try{
        const list=await agentmodel.findById(id);
        if(!list){
            res.status(404).json({message:'Agent not found'})
        }

        const originallength=list.touristagent.length;
        list.touristagent=list.touristagent.filter(x=>x._id.toString()!==id1);
        if(list.touristagent.length===originallength){
            return res.status(404).json({message:'Agent Guid not found.'})
        }
        await list.save()
        res.status(200).json({message:"Agent Guid deleted sucessfully."})
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

app.post('/touristdepartment',async(req,res)=>{
    try{
        const list=await tdmodel(req.body);
        await list.save();
        res.status(201).json(list);
    }catch(err){
       console.error(err)
       res.status(500).json({message:'Internal server error.'})
    }
})

app.put('/edittouristdepartment/:id',async(req,res)=>{
    const id=req.params.id;
    const list=await tdmodel.findById(id);
    const {username,password,statefilterbyagent}=req.body;
    try{
        if(!list){
            res.status(404).json({message:'TD not found'})
        }
        list.username=username,
        list.password=password,
        list.statefilterbyagent=statefilterbyagent
        await list.save()
        res.status(201).json({message:"Updated sucessfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error."})
    }
})

app.delete('/deletetouristdepartment/:id',async(req,res)=>{
    const id=req.params.id;
    try{
    const list=await tdmodel.deleteById(id)
    await list.save();
    res.status(201).json({message:"TD deleted sucessfully."})
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})


app.get('/fetchbystate/:state', async (req, res) => {
  const state = req.params.state;
  try {
    // Fetch all documents that have at least one agent with matching state
    const list = await agentmodel.find({ "touristagent.state": state });

    // Filter the touristagent array for each document
    const filteredList = list.map(doc => {
      return {
        _id: doc._id,
        name: doc.name,
        email: doc.email,
        available:doc.available,
        // Keep only touristagents with matching state
        touristagent: doc.touristagent.filter(agent => agent.state === state)
      };
    });

    res.json(filteredList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/fetchbyfromandto/:from/:to', async (req, res) => {
  const { from, to } = req.params;

  try {
    const list = await agentmodel.aggregate([
      // Match users having at least one touristagent with the from-to
      { 
        $match: { 
          touristagent: { 
            $elemMatch: { fromplace: from, toplace: to } 
          } 
        } 
      },
      // Project only the fields we want and filter touristagent array
      { 
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phonenumber: 1,
          touristagent: {
            $filter: {
              input: "$touristagent",
              as: "agent",
              cond: { 
                $and: [
                  { $eq: ["$$agent.fromplace", from] },
                  { $eq: ["$$agent.toplace", to] }
                ]
              }
            }
          }
        }
      }
    ]);

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get("/touristagent/states", async (req, res) => {
  try {
   
    const states = await agentmodel.aggregate([
      { $unwind: "$touristagent" },     
      { $group: { _id: "$touristagent.state" } },
      { $project: { state: "$_id", _id: 0 } }   
    ]);

    res.json(states.map(s => s.state));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/agentbooking/:id',async(req,res)=>{
    const id=req.params.id;
    const list=await agentmodel.findById(id);
    const {name,email,phonenumber,from,to,amount,touristid}=req.body;
  
    
    try{
       list.booking.push({name,email,phonenumber,from,to,amount,touristid})
       await list.save()
       res.status(200).json(list)

    }catch(err){ 
        console.error(err)
    } 
})

app.put('/available/:id',async(req,res)=>{
    const id=req.params.id;
    const {available}=req.body;
    const list=await agentmodel.findById(id);
    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
        list.available=available;
        await list.save()
        res.status(201).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.post('/availabletoturist/:id/:id1',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    const {touristid,agentid,bookingid}=req.body;
    const list=await touristmodel.findById(id);
    const list1=await agentmodel.findById(id1);
    
    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
         const alreadyExists = list.acceptbytourist.some(
      (entry) =>
       
        entry.bookingid === bookingid
    );
      const alreadyExists1 = list1.acceptbytourist.some(
      (entry) =>
     
        entry.bookingid === bookingid
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "This booking already exists." });
    }
       if (alreadyExists1) {
      return res.status(400).json({ message: "This booking already exists." });
    }

    // ✅ push new record
    list.acceptbytourist.push({ touristid, agentid, bookingid });
    list1.acceptbytourist.push({ touristid, agentid, bookingid });
    await list.save();
    await list1.save();

    res.status(201).json({
      message: "Booking accepted successfully",
      data: list,
      data:list1,
    });
      
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.delete('/availabletoturist/:id/:id1/:id2',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    const id2=req.params.id2;
  
    const list=await touristmodel.findById(id);
    const list1=await agentmodel.findById(id2);

    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
        list.acceptbytourist=list.acceptbytourist.filter((x)=>x.bookingid.toString()
        !==id1);
         list1.acceptbytourist=list1.acceptbytourist.filter((x)=>x.bookingid.toString()
        !==id1);
        await list.save()
        await list1.save()
        res.status(201).json(list,list1)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})

app.delete('/delete/:id/:id1',async(req,res)=>{
    const id=req.params.id;
    const id1=req.params.id1;
    const list=await agentmodel.findById(id);
    try{
        if(!list){
            res.status(404).json({message:"Agent not found."})
        }
        list.booking=list.booking.filter((x)=>x._id!=id1)
        await list.save()
        res.status(201).json(list)
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error.'})
    }
})


app.put('/panic/:id', async (req, res) => {
    console.log(req.params.id)
  try {
    const { latitude, longitude,touristid,touristname,phonenumber,message } = req.body;
    const tourist = await agentmodel.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

 const accept = tourist.acceptbytourist.find(x => x.touristid === touristid);
    if (!accept) return res.status(404).json({ message: 'acceptbytourist entry not found' });

    if (!accept.notifications) accept.notifications = [];

const existing = accept.notifications.find(n => n.touristid === touristid);

  if (existing) {
    // update existing notification
    existing.latitude = latitude;
    existing.longitude = longitude;
    existing.message = message;
    existing.phonenumber = phonenumber;
    existing.touristName = touristname;
    existing.date = new Date();
  } else {
    // insert new notification
    accept.notifications.push({
      touristName: touristname,
      message: message,
      latitude,
      longitude,
      phonenumber,
      touristid,
      date: new Date()
    });
  }

    await tourist.save();
    res.json({ message: 'Panic alert stored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/panic1/:id', async (req, res) => {
    console.log(req.params.id)
  try {
    const { latitude, longitude,touristid,touristname,phonenumber,message } = req.body;
    const tourist = await agentmodel.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

 const accept = tourist.acceptbytourist.find(x => x.touristid === touristid);
    if (!accept) return res.status(404).json({ message: 'acceptbytourist entry not found' });

    if (!accept.notifications) accept.notifications = [];
 const existing = accept.notifications.find(n => n.touristid === touristid);

  if (existing) {
    // update existing notification
    existing.latitude = latitude;
    existing.longitude = longitude;
    existing.message = message || "Normal";
    existing.phonenumber = phonenumber;
    existing.touristName = touristname;
    existing.date = new Date();
  } else {
    // insert new notification
    accept.notifications.push({
      touristName: touristname,
      message: "Normal",
      latitude,
      longitude,
      phonenumber,
      touristid,
      date: new Date()
    });
  }
    await tourist.save();
    res.json({ message: 'Panic alert stored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.put('/panic2/:id', async (req, res) => {
    console.log(req.params.id)
  try {
    const { latitude, longitude,touristid,touristname,phonenumber,message } = req.body;
    const tourist = await agentmodel.findById(req.params.id);
    if (!tourist) return res.status(404).json({ message: 'Tourist not found' });

 const accept = tourist.acceptbytourist.find(x => x.touristid === touristid);
    if (!accept) return res.status(404).json({ message: 'acceptbytourist entry not found' });

    if (!accept.notifications) accept.notifications = [];
 const existing = accept.notifications.find(n => n.touristid === touristid);

  if (existing) {
    // update existing notification
    existing.latitude = latitude;
    existing.longitude = longitude;
    existing.message = "Emergency alert";
    existing.phonenumber = phonenumber;
    existing.touristName = touristname;
    existing.date = new Date();
  } else {
    // insert new notification
    accept.notifications.push({
      touristName: touristname,
      message: "Emergency alert",
      latitude,
      longitude,
      phonenumber,
      touristid,
      date: new Date()
    });
  }
    await tourist.save();
    res.json({ message: 'Panic alert stored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/alerts', async (req, res) => {
  try {
    const tourists = await agentmodel.find({});
    let allAlerts = [];
    tourists.forEach(tourist => {
      tourist.acceptbytourist.forEach(accept => {
        allAlerts = allAlerts.concat(accept.notifications);
      });
    });
    res.json(allAlerts.sort((a,b) => new Date(b.date) - new Date(a.date))); // latest first
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/tdaccount',async(req,res)=>{
  const {username,password,statefilterbyagent}=req.body;
  try{
    const list=await tdmodel({username,password,statefilterbyagent})
      await list.save();
      res.status(200).json(list)
    
  }catch(err){
    console.error(err);
    res.status(500).json({error:err.message})
  }
})

app.get('/gettd',async(req,res)=>{
  try{
    const list=await tdmodel.find();
    res.status(200).json(list)
  }catch(err){
    console.error(err);
    res.status(500).json({error:err.message})
  }
})

// Send OTP
// Send OTP
app.post("/send-otp", async (req, res) => {
  let { phonenumber } = req.body;
  if (!phonenumber) return res.status(400).json({ error: "Phone number required" });

  // Ensure E.164 format
  if (!phonenumber.startsWith("+")) phonenumber = "+91" + phonenumber;

  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phonenumber, channel: "sms" });

    console.log("OTP sent:", verification.sid);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/send-otp1", async (req, res) => {
  let { phonenumber } = req.body;
  if (!phonenumber) return res.status(400).json({ error: "Phone number required" });

  // Make sure phonenumber is a string and has country code
 console.log(phonenumber)

  try {
    const verification = await client.verify
      .services(verifyServiceSid)
      .verifications.create({ to: phonenumber, channel: "sms" });

    console.log("OTP sent:", verification.sid);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});


// Verify OTP
app.post("/verify-otp", async (req, res) => {
  let { phonenumber, otp } = req.body;
  if (!phonenumber || !otp) return res.status(400).json({ error: "Phone number and OTP required" });

  if (!phonenumber.startsWith("+")) phonenumber = "+91" + phonenumber;

  try {
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phonenumber, code: otp });

    if (verificationCheck.status === "approved") {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
});


app.get('/api',(req,res)=>{
    console.log("connected")
    res.json({ message: "API is working!" });
})

app.post('/createuser',(req,res)=>{
    const list=req.body;

}) 

const port=4545;
app.listen(port,()=>console.log("server is response at" + port))