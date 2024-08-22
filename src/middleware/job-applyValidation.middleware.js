
import { body, validationResult } from 'express-validator';
import JobModelClass from '../models/job.model.js';
const jobModelObj = new JobModelClass();
export const validateApplicant = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  body('email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('contact')
    .trim()
    .notEmpty()
    .withMessage('Contact number is required')
    .matches(/^\d+$/)
    .withMessage('Contact number must be numeric')
    .isLength({ min: 10, max: 15 })
    .withMessage('Contact number must be between 10 and 15 digits long'),

  body('resume')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Resume is required');
      }
      const fileExtension = req.file.mimetype.split('/')[1];
      if (fileExtension !== 'pdf') {
        throw new Error('Only PDF files are allowed');
      }
      return true;
    }),

  async (req, res, next) => {
    const job = await jobModelObj.getJobsById(req.params.id)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('job-details', {
        job:job[0], 
        errorMessages:errors.array(),
        recruiterId:req.session.recruiterId ,
        totalApplicants :res.locals.totalApplicants,
        title:'job-details',
      });
    }
    next();
  },
];
