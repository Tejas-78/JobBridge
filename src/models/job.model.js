import { readJSONFile, writeJSONFile, generateUniqueId } from '../utils/fileUtils.js';

const jobsFileName = 'data/jobs.json'; 

export default class JobModelClass {
     async getAllJobs() {
        try {
            const jobs = await readJSONFile(jobsFileName);
            return jobs;
        } catch (error) {
            console.error('Error reading jobs:', error);
            return [];
        }
    }

     async addJob(jobData) {
        try {
            const jobs = await this.getAllJobs();
            const newJob = {
                id: generateUniqueId(), 
                ...jobData,
                postedAt: new Date().toLocaleString()
            };
            jobs.push(newJob);
            await writeJSONFile(jobsFileName, jobs);
            return newJob;
        } catch (error) {
            console.error('Error during adding job:', error);
            throw error;
        }
    }

     async getJobsById(jobId) {
        try {
            const jobs = await this.getAllJobs();
            return jobs.filter(job => job.id == jobId);
        } catch (error) {
            console.error('Error during jobs by id in jobmodel:', error);
            return [];
        }
    }

     async deleteJob(jobId, recruiterId) {
        try {
            const jobs = await this.getAllJobs();
            const filteredJobs = jobs.filter(job => job.id !== jobId || job.recruiterId !== recruiterId);
            await writeJSONFile(jobsFileName, filteredJobs);
            return true;
        } catch (error) {
            console.error('Error during deleting job:', error);
            throw error;
        }
    }

     async updateJob(jobId, recruiterId, updatedData) {
        try {
            const jobs = await this.getAllJobs();
            const jobIndex = jobs.findIndex(job => job.id === jobId && job.recruiterId === recruiterId);
            if (jobIndex !== -1) {
                jobs[jobIndex] = { ...jobs[jobIndex], ...updatedData, postedAt: new Date().toLocaleString() };
                await writeJSONFile(jobsFileName, jobs);
                return true;
            } else {
                throw new Error('Job not found or not authorized');
            }
        } catch (error) {
            console.error('Error during updating job:', error);
            throw error;
        }
    }
    
    
}
