import { readJSONFile, writeJSONFile } from '../utils/fileUtils.js';
const applicantsFileName = 'data/applicants.json';

export default class ApplicantsModelClass{
    async registerApplicantModel(newApplicant){
        try {
            const applicants = await readJSONFile(applicantsFileName);
    
            applicants.push(newApplicant);
    
            await writeJSONFile(applicantsFileName, applicants);
        } catch (error) {
            console.error('Error durind adding the applicant:', error);
        }
    }
    async getAllJApplicants(){
            try {
        const applicants = await readJSONFile(applicantsFileName);
                return applicants;
            } catch (error) {
                console.error('Error reading applicants in applicant model:', error);
                return [];
            }
}

    async getApplicantsByJobId(id){
        try {
            const applicants = await this.getAllJApplicants();
            return applicants.filter(applicant => applicant.jobId == id);
        } catch (error) {
            console.error('Error during applicants by id in applicant model:', error);
            return [];
        }
    }
}
