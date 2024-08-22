export default function notFound(req,res){
    res.render('notFound',{title:"notFound",msg:null,
        recruiterId:req.session.recruiterId,
                    recruiterName:req.session.recruiterName});
}