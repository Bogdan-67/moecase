import React from 'react';
import classnames from 'classnames';
import { Form, Field, withFormik, FormikProps } from 'formik';
import styles from './LoginForm.module.scss';
import LoginSchema from '../../../models/validation/LoginSchema';
import { loginAccount } from '@/redux/slices/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

interface FormValues {
  login: string;
  password: string;
}

let setSubmittingHigher;

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { values, touched, errors, isSubmitting } = props;

  return (
    <Form className={styles.auth}>
      <h2 className={styles.auth__title}>Авторизация</h2>
      <div className={styles.auth__inputs}>
        <div className={classnames(styles.auth__forinput)}>
          <Field className={styles.auth__input} name='login' type='text' placeholder='Логин' />
          {errors.login && touched.login && <div>{errors.login}</div>}
        </div>
        <div className={classnames(styles.auth__forinput)}>
          <Field
            className={styles.auth__input}
            name='password'
            type='password'
            placeholder='Пароль'
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
      </div>
      <button
        type='submit'
        className={classnames(
          styles.auth__button,
          {
            [styles.auth__button_disabled]:
              !values.login || !values.password || errors.login || errors.password,
          },
          {
            [styles.auth__button_loading]: isSubmitting,
          },
        )}
        disabled={isSubmitting}>
        {!isSubmitting ? 'Войти' : <LoadingSpinner size={24} />}
      </button>
    </Form>
  );
};

interface LoginProps {
  initialLogin?: string;
  loginAccount: (values: FormValues) => void;
}

const EnhancedLoginForm = withFormik<LoginProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      login: props.initialLogin || '',
      password: '',
    };
  },

  validationSchema: LoginSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    await props.loginAccount(values);
    setSubmitting(false);
  },
  displayName: 'LoginForm',
})(InnerForm);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginAccount,
    },
    dispatch,
  );

const LoginForm = connect(null, mapDispatchToProps)(EnhancedLoginForm);

export default LoginForm;
