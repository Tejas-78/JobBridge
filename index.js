import express from 'express';
import ejsLayout from 'express-ejs-layouts';
import path from "path";
// import controllers
import Home from './src/controllers/home.controller.js';
import notFound from './src/controllers/notFound.controller.js';
import Register from './src/controllers/register.controller.js';
import PostJob from './src/controllers/post-jobs.controller.js';
import JobContollerClass from './src/controllers/job.controller.js';
import ApplicantsControllerClass from './src/controllers/applicants.controller.js';
// import middlewares 
import { registrationAuthMiddleware } from './src/middleware/registration.middeware.js';
import { recruiterAuthenticationMiddleware } from './src/middleware/recruiter-authenticate.middleware.js';
import{validateApplicant} from './src/middleware/job-applyValidation.middleware.js'
import { validateJobForm } from './src/middleware/jobValidation.middleware.js';
import { uploadResumeFile } from './src/middleware/resume-upload.middleware.js';
import { trackApplicants } from './src/middleware/trackApplicants.middleware.js';
import { sendEmailMiddleware } from './src/middleware/sendEmail.middleware.js';
import { setLastVisitCookie } from './src/middleware/last-visit.middleware.js';

import session from 'express-session';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.resolve(),'public')));
// app.use(express.static(path.join(path.resolve(),'data')));

// use cookie
app.use(cookieParser());

//session
app.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
// session end


app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(),'src','views'))
app.use(ejsLayout);


// creating controllers object 
const home = new Home();
const register = new Register();
const jobContollerObj = new JobContollerClass();
const  postJob = new PostJob();
const applicantsControllerObj = new ApplicantsControllerClass();

// to set ejsLayout for 
app.get('/',setLastVisitCookie,home.renderHomePage)

app.get('/register',register.renderRegisterPage)
app.post('/register',registrationAuthMiddleware,register.registerRecruiter)

// to render login
app.get('/login',register.renderLoginPage)
app.post('/login',register.loginRecriuterCheck)
// to render not found page 
app.get('/notFound',notFound)

// job post view
app.get('/jobs', jobContollerObj.renderJobsPage);

app.post('/post-job', validateJobForm,jobContollerObj.postJob);
app.get('/post-job', postJob.renderJobsView);
// job details page view
app.get('/job-details/:id',trackApplicants,jobContollerObj.getJobDetails)

// to delete job
app.get('/jobs/:id/delete', jobContollerObj.deleteJobController);

// to update job
app.get('/jobs/:id/update',jobContollerObj.updateJobsView)
app.post('/jobs/:id/update',jobContollerObj.updateJobController)

//to apply for jobs
app.post('/jobs/:id/apply',uploadResumeFile.single('resume'),applicantsControllerObj.registerApplicants)

// to display applicants 
app.get('/applicants/:id',applicantsControllerObj.getApplicantsByJob)

// for search jobs
app.get('/search', jobContollerObj.searchJobs);
// for logout
app.get('/logout',register.logout)
app.use(express.static('src/views'));

app.listen(4000,()=>{
    console.log('server 4000 is listning');
}
)