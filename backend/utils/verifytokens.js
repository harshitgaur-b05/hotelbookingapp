import jwt from "jsonwebtoken"

export const verifytokens=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
       return res.status(401).send("you are not authenticated");
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
          return  res.status(403).send("token is not valid")
        }
        req.user=user;
        next();
    })
}

export const verifyUser=(req,res,next)=>{
    verifytokens(req,res,()=>{
        
        if(req.user.id===req.params.id||req.user.isAdmin){
            next();
        }
        else{
            return res.status(403).send("not authenticated");
        }
    })
}
export const verifyadmin=(req,res,next)=>{
    verifytokens(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            return res.status(403).send("not authenticated");
        }
    })
}