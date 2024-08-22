
export default class Home{

    renderHomePage(req,res){
        res.render('home',{title:'home',recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName})
    }
    
    
}