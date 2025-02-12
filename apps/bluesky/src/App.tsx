import { Box } from "@chakra-ui/react";
import { FC } from "react";

import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";
import { useAgent } from "@/hooks/useAgent.ts";

const App: FC = () => {
  const { login, logout, isSessionAvailable } = useAgent();

  const onRequestSingIn = async (inputs: SignInInputs) => {
    return login(inputs.identifier, inputs.password)
      .then(() => ({ isSuccess: true }))
      .catch(() => ({ isSuccess: false }));
  };

  const onRequestSingOut = async () => {
    await logout();
  };

  return (
    <>
      <Box as="main" display="flex" justifyContent="center" height="100%">
        {isSessionAvailable ? (
          <PostView onRequestSingOut={onRequestSingOut} />
        ) : (
          <SignInForm onRequestSingIn={onRequestSingIn} />
        )}
      </Box>
    </>
  );
};

export default App;
