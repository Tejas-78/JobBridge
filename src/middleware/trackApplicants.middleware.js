import ApplicantsModelClass from '../models/applicants.model.js';

const applicantsModelObj = new ApplicantsModelClass();

export async function trackApplicants(req, res, next) {
    const jobId = req.params.id; 
    
    try {
        const applicants = await applicantsModelObj.getAllJApplicants(); 
        const applicantOfJobId = applicants.filter(applicant => applicant.jobId == jobId); 
        
        const count = applicantOfJobId.length; 
        
        res.locals.totalApplicants = count;

        next(); 
    } catch (error) {
        console.error('Error tracking applicants:', error);
        res.locals.totalApplicants = 0; 
        next(); 
    }
}
