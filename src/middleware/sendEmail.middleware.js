import { sendApplicationEmail } from "../utils/fileUtils.js";
import JobModelClass from "../models/job.model.js";
 const jobModel = new JobModelClass();
export async function sendEmailMiddleware(req, res, next) {
  const { email } = req.body;
  const jobId = req.params.id;
  const job = await jobModel.getJobsById(jobId);
  const jobTitle = job[0].jobDesignation;

  try {
    await sendApplicationEmail(email, jobTitle);
    console.log(`Confirmation email sent to ${email} for job ${jobTitle}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
  next();
}
