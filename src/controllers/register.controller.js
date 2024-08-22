
import RecruitersModelsClass from '../models/register.model.js';
import { generateUniqueId } from '../utils/fileUtils.js';
import JobModelClass from '../models/job.model.js';
const jobModelObj =new JobModelClass();
const recruiterModelObj = new RecruitersModelsClass();
export default class Register{
    renderRegisterPage(req,res){
            res.render('register',{title:'home',errorMessages:null,
                recruiterId:req.session.recruiterId,
                    recruiterName:req.session.recruiterName
            })
        }
    registerRecruiter = async (req, res) => {
        const { name, email, password } = req.body;
        const newRecruiter = {
            id: generateUniqueId(),
            name,
            email,
            password,
        };
        await recruiterModelObj.addRecruiter(newRecruiter);
        res.render('login',{title:'login',msg:'Registration Successful',
            recruiterId:null,
            recruiterName:null});
    };
    
    // to display login page
    renderLoginPage(req,res){
        res.render('login',{title:'login',msg:null,
            recruiterId:req.session.recruiterId,
                    recruiterName:req.session.recruiterName
        })
}
loginRecriuterCheck = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const recruiter = await recruiterModelObj.validRecruiterCheck(email, password);
            if (recruiter) {
                req.session.recruiterId = recruiter.id
                req.session.recruiterName = recruiter.name
                const jobs = await jobModelObj.getAllJobs();
                const page = parseInt(req.query.page) || 1;
                const limit = 3; 
        
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
        
                const paginatedJobs = jobs.slice(startIndex, endIndex);
                const totalPages = Math.ceil(jobs.length / limit);
        
                res.render('jobs', {
                    title: 'Available Jobs',
                    jobs: paginatedJobs,
                    currentPage: page,
                    totalPages: totalPages,
                    msg:'Login Successfully',
                    recruiterId:req.session.recruiterId,
                    recruiterName:req.session.recruiterName
                });
            } else {
                res.render('login', { title: 'login', 
                    msg: 'Invalid email or password',
                  });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    //for logout
    logout(req, res){
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Could not log out.');
            } else {
                res.render('login',{title:'login',
                    msg:'you are logout',
                    recruiterId:null,
                    recruiterName:null});
            }
        });
    };
}

//import Recruiters from "../models/register.model.js" 
// const recruiter = new Recruiters();
// export default class Register{
//     renderRegisterPage(req,res){
//         res.render('register',{title:'home',errorMessages:null})
//     }
//     addNewRecruiter(req,res){
//         const {name,email,password}= req.body
//         recruiter.addRecruiter(name,email,password)
//         res.render("login",{title:'login',msg:"registration successfull"})
//     }

//     /// login 
//     renderLoginPage(req,res){
//         res.render('login',{title:'login',msg:null})
//     }
//     // to displat login page

// //to register

// loginRecriuterCheck(req,res){
//     const {email,password}= req.body

//     const validUser = recruiter.validRecruiterCheck(email,password)
//     if(!validUser){
//         res.render('login',{title:'login',msg:'invalid email or password '})
//     }
//    req.session.userEmail = email;
//    res.render('home',{title:'home',userEmail:req.session.userEmail});
    
// }

