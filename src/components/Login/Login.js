import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./login.css"


const Login = () => {
    const redirect = useHistory();

    return (
        <div className="loginSection">
<p className="text-left">Log In</p>
          {!window.localStorage.getItem("alkemyToken") ? (
            <Formik
            className="formikLogin"
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                await axios
                  .post("http://challenge-react.alkemy.org/", {
                    email: values.email,
                    password: values.password,
                  })
                  .then((response) => {
                    window.localStorage.setItem(
                      "alkemyToken",
                      response.data.token
                    );
                  })
                  .then(() => redirect.push("/"))
              }} >
              {({ isSubmitting }) => (
                <Form className="text-center">
                  <div className="form-group mb-4">
                  <label className="form-label" for="name">Email:</label>
                  <Field className="form-control rounded-0" type="email" name="email" />
                  </div>
                  <ErrorMessage name="email" component="div" />
                  <div className="form-group mb-4">
                  <label className="form-label" for="password">Password:</label>
                  <Field
                    className="form-control rounded-0"
                    type="password"
                    name="password" />
                  </div>
                  <ErrorMessage name="password" component="div" />
                  <button className="btn btn-dark rounded-0 mt-3 mb-3" type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="text-center">
              <h5>You're already singed in</h5>
              <Link to="/">
                <button className="btn btn-secondary rounded-0 m-2">Return home</button>
              </Link>
            </div>
          )}
        </div>

    );
  };
  
  export default Login;
  