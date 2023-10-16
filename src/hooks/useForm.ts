import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { cloneDeep } from "lodash";

type ValidationSchema = yup.ObjectSchema<Record<string, any>> | null;

interface UseFormProps {
  initialValues: Record<string, any>;
  validationSchema: ValidationSchema;
}
type FormField = {
  name: string;
  value: any;
  // validate?: yup.SchemaOf<any>;
};

type FormFields = FormField[];

type FormState = {
  [key: string]: any;
};

type FormErrors = {
  [key: string]: string;
};

type FormSubmissionResult = {
  isValid: boolean;
  errors: FormErrors;
};

type FormProps = {
  initialValues: FormState;
  // validationSchema: yup.SchemaOf<FormState>;
};

export const useForm = ({ initialValues, validationSchema }: FormProps) => {
  const [fieldValues, setFieldValues] = useState<FormFields>(initialValues);
  const [formState, SetFormState] = useState({
    errors: {},
    isSubmitting: false,
    isValid: false,
  });

  //   const validateFields = (name) => {
  //     const errors = validationSchema.validateSync(fieldValues);
  //     if (errors) SetFormState((prev) => ({ ...prev, isValid: false, errors }));
  //   };

  const validateField = (name: string, value: any) => {
    try {
      validationSchema.fields[name].validateSync(value);
      //   setFormErrors((prevErrors) => _.omit(prevErrors, name));
    } catch (error) {
      //   setFormErrors((prevErrors) => ({
      //     ...prevErrors,
      //     [name]: error.message,
      //   }));
    }
  };
  const validate = useCallback(
    (values: Record<string, any>) => {
      if (validationSchema) {
        try {
          validationSchema.validateSync(values, { abortEarly: false });
          SetFormState((prev) => ({ ...prev, isValid: true, errors: {} }));
        } catch (err) {
          const errors: Record<string, string> = {};
          err.inner.forEach((error: any) => {
            errors[error.path] = error.message;
          });
          if (errors)
            SetFormState((prev) => ({ ...prev, isValid: false, errors }));
        }
      }
    },
    [validationSchema]
  );

  const register = ({ name }) => {
    const onChange = (event: Event) => {
      const { name, value } = event.target;
      setFieldValues((prev) => ({ ...prev, [name]: value }));
    };
    return { value: fieldValues[name], onChange };
  };

  const handleSubmit = async (callback) => {
    //   SetFormState((prev) => ({ ...prev, isSubmitting: true }));
    // validate(fieldValues);
    // if (!Object.keys(formState.errors).length)
    // await callback(cloneDeep(fieldValues));
    // SetFormState((prev) => ({ ...prev, isSubmitting: false }));
  };

  const reset = (params) => {
    if (params) setFieldValues((prev) => ({ ...prev, ...params }));
    else
      setFieldValues((prev) => ({
        ...Object.keys(prev || {}).reduce(
          (fields, key) => ({ ...fields, [key]: null }),
          {}
        ),
      }));
  };

  const getValues = () => fieldValues;
  const setValue = (name, value) =>
    setFieldValues((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (fieldValues) validate(fieldValues);
  }, [fieldValues]);

  return { register, getValues, handleSubmit, reset, setValue, formState };
};
