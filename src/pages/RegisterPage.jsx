import React, { useContext } from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { Error, Input, List } from 'components/Form/Form.styled';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'redux/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/authSlice';
import {
  ButtonWrapper,
  H2,
  Wrapper,
} from '../components/RegisterPage/RegisterPage.styled';
import { WrapperWithFruits } from 'components/RegisterPage/RegisterPage.styled';
import { Loader } from 'components/Loader/Loader';
import Snowfall from 'react-snowfall';
import { ThemeContext } from 'components/Context/Context';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, 'Name must be more than or equal to 4 letters')
    .max(50, 'Name must be less than or equal to 50 letters')
    .required('Name is required field'),
  email: yup.string().email().required('Email is required field'),
  password: yup
    .string()
    .min(6, 'Password must be more than or equal to 6 letters')
    .max(16, 'Pame must be more than or equal to 16 letters')
    .required('Password is required field'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { isChristmas } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [registerUser, { status }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const user = await registerUser(values).unwrap();
    dispatch(setCredentials(user));
    navigate('/diary');
    resetForm();
  };
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <WrapperWithFruits>
      {isChristmas && <Snowfall />}
      {status === 'pending' && <Loader />}
      <Wrapper>
        <H2>Register</H2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Form>
            <List style={{ display: 'grid', gridTemplateColumns: 'revert' }}>
              <li>
                <label>
                  <Input type="name" name="name" placeholder="Name *" />
                  <ErrorMessage name="name" component={Error} />
                </label>
              </li>

              <li>
                <label>
                  <Input type="email" name="email" placeholder="Email *" />
                  <ErrorMessage name="age" component={Error} />
                </label>
              </li>

              <li>
                <label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password *"
                  />
                  <ErrorMessage name="password" component={Error} />
                </label>
              </li>
            </List>
            <ButtonWrapper>
              <Button type="submit" full={true} style={{ width: '200px' }}>
                Register
              </Button>
              <div onClick={handleClick}>
                <Button type="button" full={false}>
                  Log In
                </Button>
              </div>
            </ButtonWrapper>
          </Form>
        </Formik>
      </Wrapper>
    </WrapperWithFruits>
  );
};

export default RegisterPage;
