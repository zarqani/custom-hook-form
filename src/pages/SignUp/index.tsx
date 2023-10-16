import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import * as yup from "yup";

export default function SignUp() {
  // Initialize useForm hook with initial values and validation schema
  const {
    formState: { isSubmitting, isValid, errors },
    register,
    handleSubmit,
  } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      fileName: yup.string().max(255).required("field is required."),
      email: yup
        .string()
        .email("not a valid email")
        .max(255)
        .required("field mandatory"),
      // emailConfirmation: yup.string().email().max(255).required("field mandatory"),
      password: yup.string().max(255).required("field is required."),
      // passwordConfirmation: yup.string().max(255).required("field mandatory"),
    }),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    // handleSubmit(async () => {
    //   // await postData();
    // });
  };

  return (
    <form onSubmit={onSubmit}>
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
        error={errors["username"]}
        {...register({ name: "email" })}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        error={errors["username"]}
        {...register({ name: "password" })}
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        label="Sign Up"
      />
    </form>
  );
}
