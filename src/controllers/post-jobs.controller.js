export default class PostJob{
    renderJobsView(req,res){
        if(req.session.recruiterId){
            res.render('post-job', { title: 'Post a Job',errorMessages:null,
                recruiterId:req.session.recruiterId,
                    recruiterName:req.session.recruiterName
             });
        }
        else{
            res.render('notFound',{title :"404", msg:' only recruiter is allowed to access this page, login as recruiter to continue.'})
        }

    }
}