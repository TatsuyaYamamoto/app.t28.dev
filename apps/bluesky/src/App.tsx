import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";

import PostView from "@/components/PostView/PostView.tsx";
import SignInForm, { type SignInInputs } from "@/components/SignInForm.tsx";

const App: FC = () => {
  const [shouldShowSignIn] = useState(true);

  const onRequestSingIn = async (inputs: SignInInputs) => {
    console.log(inputs);
    return { isSuccess: true };
  };

  return (
    <>
      <Box as="main" display="flex" justifyContent="center" height="100%">
        {shouldShowSignIn ? (
          <SignInForm onRequestSingIn={onRequestSingIn} />
        ) : (
          <PostView />
        )}
      </Box>
    </>
  );
};

export default App;
