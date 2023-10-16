import { FormEvent } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import * as yup from "yup";

export default function SignUp() {
  const {
    formState: { isSubmitting, isValid, errors },
    register,
    handleSubmit,
  } = useForm({
    initialValues: {
      fullName: "test",
      email: "test@gmail.com",
      password: "test",
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().max(255).required("field is required."),
      email: yup
        .string()
        .email("not a valid email")
        .max(255)
        .required("field is required."),
      password: yup.string().max(255).required("field is required."),
    }),
  });

  const onSubmit = async (values: Record<string, any>) => {
    console.log({ values });
    // await postData(values);
  };

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmit(onSubmit);
      }}
    >
      <h3>Sign Up</h3>
      <Input
        type="text"
        name="fullName"
        placeholder="Full Name"
        error={errors["fullName"]}
        {...register({ name: "fullName" })}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        error={errors["email"]}
        {...register({ name: "email" })}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        error={errors["password"]}
        {...register({ name: "password" })}
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        loading={!!isSubmitting}
        label="Sign Up"
      />
    </form>
  );
}
