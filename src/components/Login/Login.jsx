import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import { AuthContext } from "../store/auth-context";
import Input from "../UI/Input/Input";

import classes from "./Login.module.css";

// Email Reducer
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const emailInitial = { value: "", isValid: null };

// Password Reducer
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value > 6 };
  }

  return { value: "", isValid: false };
};

const passswordInitial = { value: "", isValid: null };

const Login = (props) => {
  // const [isValid, setIsValid] = useState({ email: null, password: null });
  const [formIsValid, setFormIsValid] = useState(false);
  // const [details, setDetails] = useState({
  //   email: "",
  //   password: "",
  // });

  const [emailState, dispatchEmail] = useReducer(emailReducer, emailInitial);

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    passswordInitial
  );

  const authctx = useContext(AuthContext);

  const emailHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const validateEmail = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePassword = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validy");
      // setFormIsValid(emailState.isValid && passwordState.isValid);
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  // const changeHandler = (setDetails, newKey) => {
  //   setDetails((preState) => {
  //     return {
  //       ...preState,
  //       ...newKey,
  //     };
  //   });
  // };

  // const validate = (setState, conditions) => {
  //   setState((preState) => ({
  //     ...preState,
  //     ...conditions,
  //   }));
  // };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailHandler}
          onBlur={validateEmail}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordHandler}
          onBlur={validatePassword}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
