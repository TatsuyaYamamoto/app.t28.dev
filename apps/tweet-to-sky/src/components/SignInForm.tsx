import { InputGroup } from "@/components/ui/input-group";
import { Alert, Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CiLock as LockIcon } from "react-icons/ci";
import { FaAt as IdentifierIcon } from "react-icons/fa6";

export interface SignInInputs {
  identifier: string;
  password: string;
}

interface SignInFormProps {
  onRequestSingIn: (inputs: SignInInputs) => Promise<{ isSuccess: boolean }>;
}

const SignInForm: FC<SignInFormProps> = ({ onRequestSingIn }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInInputs>();

  const isSubmitButtonDisabled = !isValid;

  const onSubmit = handleSubmit(async (data) => {
    const { isSuccess } = await onRequestSingIn(data);
    if (!isSuccess) {
      setError("root", {
        message:
          "ユーザー名またはメールアドレス、またはパスワードが間違っています",
      });
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit} padding={4} width="100%" maxWidth={600}>
      <Box display="flex" flexDirection="column" gap={4}>
        {errors.root && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{errors.root.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <Fieldset.Root size="lg">
          <Fieldset.Legend>サインイン</Fieldset.Legend>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>ホスティングプロバイダー</Field.Label>
              <InputGroup
                startElement={<IdentifierIcon color="gray.300" />}
                width="100%"
              >
                <Input readOnly={true} value="Bluesky Social" />
              </InputGroup>
            </Field.Root>
            <Field.Root invalid={!!errors.identifier}>
              <Field.Label>アカウント</Field.Label>
              <InputGroup
                startElement={<IdentifierIcon color="gray.300" />}
                width="100%"
              >
                <Input
                  placeholder="ユーザー名またはメールアドレス"
                  autoComplete="username"
                  {...register("identifier", { required: true })}
                />
              </InputGroup>
              {errors.identifier && (
                <Field.ErrorText>{errors.identifier.message}</Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root invalid={!!errors.password}>
              <InputGroup
                startElement={<LockIcon color="gray.300" />}
                width="100%"
              >
                <Input
                  placeholder="パスワード"
                  type="password"
                  autoComplete="password"
                  {...register("password", { required: true })}
                />
              </InputGroup>
              {errors.password && (
                <Field.ErrorText>{errors.password.message}</Field.ErrorText>
              )}
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            disabled={isSubmitButtonDisabled}
            loading={isSubmitting}
            variant="ghost"
          >
            {`サインイン`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
