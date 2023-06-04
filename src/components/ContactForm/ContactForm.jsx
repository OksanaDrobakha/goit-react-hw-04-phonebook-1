import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ' -]+$/,
      'Name may contain only letters, apostrophe, dash, spaces, and Ukrainian characters'
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Phone number is invalid')
    .required('Phone number is required'),
});

const initialValues = {
  name: '',
  number: '',
};
export const ContactForm = ({ addContact }) => {
  const onSubmit = (values, { resetForm }) => {
    addContact({ ...values });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={css.Form}>
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </label>
        <label>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
