const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const userServices=require('../Services/UserService');
const {User}=require('../Modals/UsersModel');
const multer=require('multer');


router.post('/register', (req, res, next) => {
    
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body).then(
        () => {return res.json('success')}
    ).catch(
        err => {return res.json(err)}
    )
})

// router.get('/details',async(req,res) => {
//   try{
//     const orgs= await Needy.find({});
//     return res.json({ status: "ok", details:orgs });
// } catch (e) {
//   return res.json({ status: "error", error: e });
// }
  
// })

router.post('/login', (req, res, next) => {
    const { username, password} = req.body;
    userServices.login({ username, password})
        .then((user) => {
            if(user)
                return res.json(user)
            else 
                return res.sendStatus(500);
        }
    )

    
})

router.get('/get/:id', async (req, res, next) => {
    let data=await User.findById(req.params.id);
    return res.json(data);
})

router.get('/getAll', async (req, res, next) => {
    let data=await User.find({});
    return res.json(data);
})

router.patch('/sendFriendRequest',async(req,res)=>{
    let data=await User.findByIdAndUpdate(req.body.to,req.body.toBeUpdated);
    if(data)
        return res.json("Updated!!");
    else
        return res.status(404);
    
})

router.put('/updateProfile/:id',async(req,res)=>{
    try{
        let data=await User.findByIdAndUpdate(req.params.id,req.body);
    
        return res.json("Updated");
    }catch(e){
        return res.json(e);
    }
    
})

router.patch('/acceptFriendRequest',async(req,res)=>{
    let data=await User.findByIdAndUpdate(req.body.to,req.body.toBeUpdatedTo);
    let data2=await User.findByIdAndUpdate(req.body.by,req.body.toBeUpdatedBy);
    if(data && data2)
        return res.json("Updated!!");
    else
        return res.status(404);
    
})

module.exports = router;