import { useAgent } from "@/components/AgentProvider.tsx";
import { InputGroup } from "@/components/ui/input-group";
import {
  Alert,
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CiLock as LockIcon } from "react-icons/ci";
import { FaAt as IdentifierIcon } from "react-icons/fa6";

export interface SignInInputs {
  identifier: string;
  password: string;
}

const SignInForm: FC = () => {
  const { agent } = useAgent();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInInputs>();

  const isSubmitButtonDisabled = !isValid;

  const onSubmit = handleSubmit(async (data) => {
    await agent.login(data).catch(() => {
      setError("root", {
        message:
          "ユーザー名またはメールアドレス、またはパスワードが間違っています",
      });
    });
  });

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      padding={4}
      width="100%"
      maxWidth={600}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Heading as="h2">サインイン</Heading>
      <Field.Root>
        <Field.Label>ホスティングプロバイダー</Field.Label>
        <InputGroup
          startElement={<IdentifierIcon color="gray.300" />}
          width="100%"
        >
          <Input readOnly={true} value="Bluesky Social" />
        </InputGroup>
      </Field.Root>
      <Fieldset.Root>
        <Fieldset.Legend>アカウント</Fieldset.Legend>
        <Fieldset.Content>
          <Field.Root invalid={!!errors.identifier}>
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

      {errors.root && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{errors.root.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          disabled={isSubmitButtonDisabled}
          loading={isSubmitting}
        >
          {`サインイン`}
        </Button>
      </Box>
    </Box>
  );
};

export default SignInForm;
