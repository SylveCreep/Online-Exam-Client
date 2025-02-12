import "./login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { SignInSchema } from "../../constants/validation";
import axios from "axios";

function handleSubmit(values) {
  const body = {
    email: values.email,
    password: values.password,
  };

  axios
    .post(`http://localhost:8310/keycloak-service/login`, body)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setTimeout(() => {
        alert("Login success");
      }, 400);
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function Login() {
  return (
    <>
      <div className="login-layout">
        <div className="login-background_left"></div>
        <div className="login-background_right"></div>
        <div className="login-panel">
          <div className="login-panel_left">
            <img alt="imagestudy" src={ImageStudy} />
          </div>
          <div className="login-panel_right">
            <p className="login-heading">Login</p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInSchema}
              onSubmit={(values, { setSubmitting }) => handleSubmit(values)}
            >
              {({
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form className="login-form">
                  <div className="input-section">
                    <Field
                      className="login-input"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    {errors.email && touched.email ? (
                      FormikError(errors, "email")
                    ) : (
                      <div />
                    )}
                  </div>
                  {/* <ErrorMessage name="email" component="div" /> */}
                  <div className="input-section">
                    <Field
                      className="login-input"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      FormikError(errors, "password")
                    ) : (
                      <div />
                    )}
                  </div>
                  <Link className="login-forgot_pass" to="">
                    Forgot password?
                  </Link>
                  <label className="login-remmber_me">
                    <Field type="checkbox" name="checked" value="remember" />
                    Remember me
                  </label>
                  {/* <ErrorMessage name="password" component="div" /> */}
                  <button
                    className="login-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <p className="login-content">
                    Don't have account?{" "}
                    <Link className="login-forgot_pass" to="/signup">
                      Sign up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
