import { body, validationResult } from "express-validator";

export const registrationAuthMiddleware = async (req, res, next) => {
    const rules = [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email')
            .isEmail().withMessage('Please enter a valid email address'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[0-9]/).withMessage('Password must contain at least one number')
            .matches(/[\W]/).withMessage('Password must contain at least one special character')
    ];

    await Promise.all(rules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('register', {
            title: 'Register',
            errorMessages: errors.array()
        });
    }
    
    next();
};
///
