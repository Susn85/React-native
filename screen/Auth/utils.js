import * as yup from "yup";

export const LoginInitialValue = {
    Username: '',
    password: '',
};

export const LoginValidationSchema = yup.object().shape({
    Username: yup.string().required("Username is required"), 
    password: yup.string().required("Password is required"),
});


export const SignupInitialValue = {
    Username: '',
    password: '',
    confirmPassword: '',
    number: '',
};

export const SignupValidationSchema = yup.object().shape({
    Username: yup.string().email('Invalid email').required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match') 
        .required('Confirm Password is required'),
    number: yup
        .string()
        .min(10, ({ min }) => `${'Mobile number must be'} ${min} ${'characters'}`)
        .required('Mobile number is required')
        .matches(/^[789]\d{9}$/, 'Mobile number should start from 7, 8, or 9'),
});