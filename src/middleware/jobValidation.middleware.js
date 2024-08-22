import { body, validationResult } from 'express-validator';

export const validateJobForm = [
    body('jobCategory')
        .notEmpty().withMessage('Job category is required')
        .isIn(['Software Development', 'Design', 'Marketing', 'Sales', 'Human Resources'])
        .withMessage('Invalid job category selected'),

    body('jobDesignation')
        .notEmpty().withMessage('Job designation is required')
        .isIn(['Junior Developer', 'Senior Developer', 'Project Manager', 'Product Manager', 'UX/UI Designer'])
        .withMessage('Invalid job designation selected'),

    body('jobLocation')
        .notEmpty().withMessage('Job location is required')
        .isString().withMessage('Job location must be a string'),

    body('companyName')
        .notEmpty().withMessage('Company name is required')
        .isString().withMessage('Company name must be a string'),

    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isNumeric().withMessage('Salary must be a numeric value'),

    body('totalOpenings')
        .notEmpty().withMessage('Total number of openings is required')
        .isInt({ min: 1 }).withMessage('Total openings must be at least 1'),

    body('skillsRequired')
        .notEmpty().withMessage('At least one skill is required')
        .isArray().withMessage('Skills should be an array'),

    body('applicationEndDate')
        .notEmpty().withMessage('End of application date is required')
        .isISO8601().withMessage('Invalid date format for application end date'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('post-job', { 
                errorMessages: errors.array(),
                title:'post-job',
                oldData: req.body 
            });
        }
        next();
    }
];
