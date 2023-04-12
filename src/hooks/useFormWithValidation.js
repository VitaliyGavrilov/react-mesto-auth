import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (evt) => {
    const input = evt.target;
    const {name, value} = input;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid)
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormValidation;
