import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";



const Login = () => {
    const redirect = useHistory();
    return (
      <div >
        <div >
          <h1>Log in</h1>
          {!window.localStorage.getItem("alkemyToken") ? (
            <Formik
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
              }}
            >
              {({ isSubmitting }) => (
                <Form >
                  <h3>Email:</h3>
                  <Field  type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <h3>Password:</h3>
                  <Field
                    
                    type="password"
                    name="password"
                  />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <div>
              <h5>you are already singed in</h5>
              <Link to="/">
                <button variant="primary">Return home</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Login;
  