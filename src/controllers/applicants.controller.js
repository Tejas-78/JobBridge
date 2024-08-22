import { generateUniqueId } from '../utils/fileUtils.js';
import ApplicantsModelClass from '../models/applicants.model.js';
import JobModelClass from '../models/job.model.js';

const jobModelClassObj = new JobModelClass();
const applicantsModelObj = new ApplicantsModelClass();

export default class ApplicantsControllerClass{
    async registerApplicants(req,res,next){
        const jobId = req.params.id;
        const {name,email,contact} = req.body;
        const resume = 'resume/'+req.file.filename;
        
        const newApplicant = {
            id: generateUniqueId(),
            jobId ,
            name,email,contact,resume
        }
        await applicantsModelObj.registerApplicantModel(newApplicant);

        const jobs = await jobModelClassObj.getAllJobs();
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
            msg:'apply successfully',
            recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName
        });
        next();
    }

    // for render applicants page
    async getApplicantsByJob(req, res) {
        const jobId = req.params.id;
        
        const job = await jobModelClassObj.getJobsById(jobId);
        const applicants = await applicantsModelObj.getApplicantsByJobId(jobId);

        res.render('applicants', {
            job,
            applicants,
            title:'applicants',
            recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName
        });
    }
   
}