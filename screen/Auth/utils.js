 import * as yup from "yup";
    
// export const LoginInitialValue ={
//     User_id:'',
//     password:'',
// };
// export const LoginValidationSchema =yup.object().shape({
//     Username:yup.string().required("Username is required"),
//     password:yup.string().required("password is required"),
// })

export const SignupInitialValue ={
     User_id:'',
     password:'',
     password:'',
     number:'',
};
export const SignupValidationSchema =yup.object().shape({
     Username:yup.string().email('Invalid email').required("Username is required"),
     password:yup.string().required("password is required"), 
    number:yup
   .string()
   .min(
    10,
    ({min})=>
        `${'Mobile number must be'} ${min} ${'character'}`,
   )
   .required('Mobile number is required')
    .matches(/^[789]\d{9}$/, 'mobile number should be start from 7,8,9'),
})