import React, { useState } from "react";
import Input from "./input";
import Joi from "joi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
  });

  const validate = () => {
    const _errors = {};

    // validation schema
    const validation = schema.validate(
      { username, email },
      { abortEarly: false }
    );

    // validation
    if (validation.error) {
      for (let v of validation.error.details) {
        _errors[v["path"]] = v.message;
      }
      setErrors({ ..._errors });
      console.log(errors);
    } else setErrors({}); // clear previous error object
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent load to reload
    validate();
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <h1>Login {username}</h1>
      <form>
        <Input
          title="username"
          onChangeText={handleUsername}
          errors={errors.username}
        />
        <Input title="email" onChangeText={handleEmail} errors={errors.email} />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
