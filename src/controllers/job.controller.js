import { readJSONFile, writeJSONFile, generateUniqueId } from '../utils/fileUtils.js';
import JobModelClass from '../models/job.model.js'
import session from 'express-session';

const jobModelObj = new JobModelClass();
export default class JobContollerClass{

  renderJobsPage = async (req, res) => {
    try {
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
            msg:null,
            recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName
        });
    } catch (error) {
        res.status(500).send('Error loading jobs');
    }
};
 async postJob(req, res) {
  const { jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    totalOpenings,
    skillsRequired,
    applicationEndDate } = req.body;
  const recruiterId = req.session.recruiterId; 

  try {
      const newJob = await jobModelObj.addJob({
          recruiterId,
          jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    totalOpenings,
    skillsRequired,
    applicationEndDate 
      });

      res.render('jobs',{
        recruiterId:req.session.recruiterId,
        recruiterName:req.session.recruiterName
      }); 
  } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).send('Internal Server Error');
  }
}

// for render job detail page
getJobDetails = async (req, res) => {
  const jobId = req.params.id;
  const jobs = await jobModelObj.getAllJobs();
  const job = jobs.find(j => j.id == jobId);

  if (job) {
      res.render('job-details', { totalApplicants: res.locals.totalApplicants,
        title:'job-details',
        job ,
        errorMessages:null,
        recruiterId:req.session.recruiterId,
        recruiterName:req.session.recruiterName});
  } else {
      res.status(404).send('Job not found');
  }
};

// for delete job
async deleteJobController(req,res){
  const jobId = req.params.id;
  const recruiterId = req.session.recruiterId;
  const success = await jobModelObj.deleteJob(jobId,recruiterId)
  try{
  if(success){
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
        msg:'Job Deleted Successfully',
        recruiterId:req.session.recruiterId,
        recruiterName:req.session.recruiterName
    });
  }}
  catch(error){
    console.error('Error during deleting job in controller:', error);
  }
}

// for render update job page
async updateJobsView(req,res){
  const id = req.params.id; 
  const jobFound = await jobModelObj.getJobsById(id);
  if(jobFound){
      return res.render('job-update',{jobs:jobFound,title:'update-job' ,
        recruiterId:req.session.recruiterId,
        recruiterName:req.session.recruiterName})
  }
  // return the error
  else{
      res.status(401).send('job not found')
  }
  }
// for updating a job
async updateJobController(req,res){
  try{
    const jobId = req.params.id;
    const recruiterId = req.session.recruiterId;
    const { jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      totalOpenings,
      skillsRequired,
      applicationEndDate } = req.body;

      const success = await jobModelObj.updateJob(jobId,recruiterId,{ jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        totalOpenings,
        skillsRequired,
        applicationEndDate })
        if(success){
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
              msg:'Job Updated Successfully',
              recruiterId:req.session.recruiterId,
              recruiterName:req.session.recruiterName
          });
        }
  }
  catch(error){
    console.error('Error during updating job in controller:', error);
  }
}

async searchJobs(req, res){
  try {
    const { searchJob } = req.query;
    const seachedJobs = await jobModelObj.getAllJobs(); 

    const filteredJobs = seachedJobs.filter(job => {
      const searchIn = `${job.jobDesignation} ${job.jobCategory} ${job.companyName} ${job.jobLocation}`.toLowerCase();
      const seachedJob = searchJob.toLowerCase()
      return searchIn.includes(seachedJob);
    });
    if(filteredJobs){

          const jobs = await jobModelObj.getAllJobs();
          const page = parseInt(req.query.page) || 1;
          const limit = 3; 
      
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
      
          const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
          const totalPages = Math.ceil(jobs.length / limit);
          
          res.render('jobs', {
            title: 'Available Jobs',
            jobs: paginatedJobs,
            currentPage: page,
            totalPages: totalPages,
            msg:'Search Results',
            recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName
          });
        
        }
        else{
          res.render('notFound',{
            title:'notFound',
            msg:'Sorry Not Found any job you are searching',
            recruiterId:req.session.recruiterId,
            recruiterName:req.session.recruiterName
          });
        }
  } catch (err) {
    console.error(err);
  }
}

}