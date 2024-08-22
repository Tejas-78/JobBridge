import { readJSONFile, writeJSONFile } from '../utils/fileUtils.js';

const recruiterFileName = 'data/recruiters.json';

export default class RecruitersModelsClass{

 addRecruiter = async (newRecruiter) => {
    try {
        const recruiters = await readJSONFile(recruiterFileName);

        recruiters.push(newRecruiter);

        await writeJSONFile(recruiterFileName, recruiters);
    } catch (error) {
        console.error('Error adding recruiter:', error);
    }
};

 findRecruiterById = async (recruiterId) => {
        const recruiters = await readJSONFile(recruiterFileName);
    return recruiters.find(r => r.id == recruiterId);
};

 updateRecruiterJobs = async (recruiterId, jobId) => {
        const recruiters = await readJSONFile(recruiterFileName);
    const recruiter = recruiters.find(r => r.id === recruiterId);
    if (recruiter) {
        recruiter.jobIds.push(jobId);
        await writeJSONFile(recruiterFileName, recruiters);
    }
};
// tocheck user is valid or not
    
 validRecruiterCheck = async (email, password) => {
    const recruiters = await readJSONFile(recruiterFileName);
    const validRecruiter = recruiters.find(recruiter => recruiter.email === email && recruiter.password === password);
    return validRecruiter;
};
}
