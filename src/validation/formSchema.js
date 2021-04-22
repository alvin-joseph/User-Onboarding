import * as yup from 'yup'

export default yup.object().shape({
    name: yup
    .string()
    .required('Name is required'),
    email: yup
    .string()
    .email()
    .required('Email is required'),
    role: yup
    .string()
    .oneOf(['Front-End Developer', 'Back-End Developer', 'Full-stack engineer'], 'Role is required'),
    password: yup
    .string()
    .required('Password is required')
    .min(8),
    //we are done with checkboxes
    terms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms of service!'),
})