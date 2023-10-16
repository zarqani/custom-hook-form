import { ChangeEvent, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { cloneDeep } from "lodash";

type ValidationSchema = yup.ObjectSchema<Record<string, any>> | null;

type FormFields = Record<string, any>;
interface FormProps {
  initialValues: FormFields;
  validationSchema: ValidationSchema;
}

type FormState = {
  errors: { [key: string]: any };
  isSubmitting: boolean;
  isValid: boolean;
};

type UseFormProps = {
  register: any;
  getValues: any;
  handleSubmit: any;
  reset: any;
  setValue: any;
  formState: FormState;
};

export const useForm = ({
  initialValues,
  validationSchema,
}: FormProps): UseFormProps => {
  const [fieldValues, setFieldValues] = useState<FormFields>(initialValues);
  const [formState, SetFormState] = useState({
    errors: {},
    isSubmitting: false,
    isValid: false,
  });

  const validate = useCallback(
    (values: Record<string, any>) => {
      if (validationSchema) {
        try {
          validationSchema.validateSync(values, { abortEarly: false });
          SetFormState((prev) => ({ ...prev, isValid: true, errors: {} }));
        } catch (err) {
          const errors: Record<string, string> = {};
          if (err instanceof yup.ValidationError)
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

  const register = ({ name }: { name: string }) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFieldValues((prev) => ({ ...prev, [name]: value }));
    };
    return { value: fieldValues[name], onChange };
  };

  const handleSubmit = async (callback: (formFields: FormFields) => void) => {
    SetFormState((prev) => ({ ...prev, isSubmitting: true }));
    validate(fieldValues);
    if (!Object.keys(formState.errors).length)
      await callback(cloneDeep(fieldValues));
    SetFormState((prev) => ({ ...prev, isSubmitting: false }));
  };

  const reset = (params: FormFields) => {
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
  const setValue = (name: string, value: any) =>
    setFieldValues((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (fieldValues) validate(fieldValues);
  }, [fieldValues]);

  return { register, getValues, handleSubmit, reset, setValue, formState };
};
