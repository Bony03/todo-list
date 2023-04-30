import { useEffect, useState } from "react";

export const useInput = (initialValue, validations) => {
  const useValidation = (value, validations) => {
    const [emptyError, setEmptyError] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [oneLowCaseError, setOneLowCaseError] = useState(false);
    const [oneUpperCaseError, setOneUpperCaseError] = useState(false);
    const [oneNumberError, setOneNumberError] = useState(false);
    const [spaceError, setSpaceError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case "minLength":
            value.length < validations[validation]
              ? setMinLengthError(true)
              : setMinLengthError(false);
            break;
          case "emptyError":
            value ? setEmptyError(false) : setEmptyError(true);
            break;
          case "emailError":
            const reg =
              /^[a-zA-Z][0-9a-zA-Z_]{2,24}@[a-zA-Z]{2,12}\.[a-zA-Z]{2,12}/i;
            reg.test(value) ? setEmailError(false) : setEmailError(true);
            break;
          case "oneLowCase":
            value.search(/[a-z]/) === -1
              ? setOneLowCaseError(true)
              : setOneLowCaseError(false);
            break;
          case "oneUpperCase":
            value.search(/[A-Z]/) === -1
              ? setOneUpperCaseError(true)
              : setOneUpperCaseError(false);
            break;
          case "oneNumber":
            value.search(/[0123456789]/) === -1
              ? setOneNumberError(true)
              : setOneNumberError(false);
            break;
          case "noSpaces":
            value.search(/\s/) !== -1
              ? setSpaceError(true)
              : setSpaceError(false);
        }
      }
    }, [value]);
    useEffect(() => {
      if (
        emptyError ||
        minLengthError ||
        emailError ||
        oneNumberError ||
        oneLowCaseError ||
        oneUpperCaseError ||
        spaceError
      ) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }, [
      emptyError,
      minLengthError,
      emailError,
      oneNumberError,
      oneLowCaseError,
      oneUpperCaseError,
      spaceError,
    ]);
    return {
      emptyError,
      minLengthError,
      emailError,
      inputValid,
      oneNumberError,
      oneLowCaseError,
      oneUpperCaseError,
      spaceError,
    };
  };
  const [value, setValue] = useState(initialValue);
  const [isBlur, setBlur] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (e) => {
    setValue(e);
  };
  const onBlur = () => {
    setBlur(true);
  };
  return {
    value,
    onChange,
    onBlur,
    isBlur,
    ...valid,
    setValue,
    setBlur,
  };
};
