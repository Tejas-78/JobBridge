
export const recruiterAuthenticationMiddleware = (req,res,next)=>{
    if(req.session.recruiterId){
        next();
    }
    else{
        res.redirect('/login',{title:'login',msg:'Login here '})
    }
}