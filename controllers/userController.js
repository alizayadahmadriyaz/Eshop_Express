import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🔑 Generate JWT
const generateToken = (userId,role) => {
    if(role=="admin"){
        return jwt.sign(
        { id:userId },
        process.env.JWT_SECRET,    // ✅ Must match!
        { expiresIn: '7d' }
        );
    }
    // else{

    return jwt.sign(
        { id:userId },
        process.env.JWT_SECRET_USER,    // ✅ Must match!
        { expiresIn: '7d' }
        );
    // }
};

//register
export const register= async (req,res)=>{
    const { name, email, password, role } = req.body;

    // try{
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password, 10);
            const user=await User.create({
                "name":name,
                "email":email,
                "password":hashedPassword,
                "role":role
            })
            const token = generateToken(user._id,user.role);
            console.log(user)
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        }
        // }
        else{
            return res.json("user is already existing");
        }
    // }
    // catch (err){
    //     return res.json(err);
    // }
};


//login


export const login= async (req,res)=>{
    const { name, email, password, role } = req.body;

    // try{
        // const existingUser = await User.findOne({ email });
        // console.log(existingUser)
        // if(existingUser){
            const user=await User.findOne({email});
            // const hashedPassword = await bcrypt.hash(password, 10);
            if(!user){
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            // console.log(user)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
            return res.status(401).json({ message: 'Invalid email or password' });
            
            const token = generateToken(user._id,user.role);

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            });
        // }
        // else{
        //     return res.json("Invalid Email or Password")
        // }
    // }
    // catch (err){
    //     return res.json({status:"bekaaar"});
    // }
};

export const getUser= async (req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.findById(id);
        if(!user){
            return res.json({status:"no such user"});
        }
        return res.json(user);
    }
    catch (error){
        return res.json({status:"error"});
    }

}
export const allUser= async (req,res)=>{
    try{
        const user=await User.find();
        return res.json(user);
    }
    catch (error){
        return res.json({status:"error"});
    }

}

