import * as yup from 'yup';

export const addUser = {
    initialValues: {
        firstName: '',
        lastName: '',
        email: ''
    },
    fields: [
        {
            type: 'text',
            name: 'firstName',
            id: 'firstName',
            placeholder: 'Enter First Name',
            label: 'First Name',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'lastName',
            id: 'lastName',
            placeholder: 'Enter Last Name',
            label: 'Last Name',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'email',
            id: 'email',
            placeholder: 'Enter Email ID',
            label: 'Email ID',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'password',
            name: 'password',
            id: 'password',
            placeholder: 'Enter password',
            label: 'Password',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'confirmPassword',
            id: 'confirmPassword',
            placeholder: 'Enter confirm password',
            label: 'Confirm Password',
            helperText: '',
            isRequired: true,
        },
    ],
    schema: yup.object().shape({
        firstName: yup.string().required('First name is required.'),
        lastName: yup.string().required('Last name is required.'),
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string()
            .required('Password is required.')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
            .matches(/\d/, 'Password must contain at least one number.')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.')
            .min(11, 'Password must be at least 11 characters.'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match.')
            .required('Confirm Password is required.'),
    })
}

export const updateUser = {
    initialValues: {
        firstName: '',
        lastName: '',
        email: ''
    },
    fields: [
        {
            type: 'text',
            name: 'firstName',
            id: 'firstName',
            placeholder: 'Enter First Name',
            label: 'First Name',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'lastName',
            id: 'lastName',
            placeholder: 'Enter Last Name',
            label: 'Last Name',
            helperText: '',
            isRequired: true,
        },
        {
            type: 'text',
            name: 'email',
            id: 'email',
            placeholder: 'Enter Email ID',
            label: 'Email ID',
            helperText: '',
            isRequired: true,
        }
    ],
    schema: yup.object().shape({
        firstName: yup.string().required('First name is required.'),
        lastName: yup.string().required('Last name is required.'),
        email: yup.string().email('Invalid email.').required('Email is required.'),
    })
}

export const deleteUser = {
    initialValues: {
        confirmDelete: '',
    },
    fields: [
        {
            type: 'text',
            name: 'confirmDelete',
            id: 'confirmDelete',
            placeholder: '',
            label: 'This action cannot be undone.',
            helperText: 'Please type <span class="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" >delete</span> to confirm.',
            isRequired: false,
        },
    ],
    schema: yup.object()
}