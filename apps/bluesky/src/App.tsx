import PostView from "@/components/PostView/PostView.tsx";
import { Box } from "@chakra-ui/react";
import { FC } from "react";

const App: FC = () => {
  return (
    <>
      <Box as="main" display="flex" justifyContent="center" height="100%">
        <PostView />
      </Box>
    </>
  );
};

export default App;
