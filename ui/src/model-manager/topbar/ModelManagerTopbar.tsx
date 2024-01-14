import { Button } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import ModelsListDrawer from "../models-list-drawer/ModelsListDrawer";

const AddMissingModelsButton = React.lazy(
  () => import("./InstallMissingModelsButton")
);
interface Props {}

const WIDTH = 200;
export default function ModelManagerTopbar({}: Props) {
  const [showMyModels, setShowMyModels] = useState(false);
  return (
    <>
      <Button
        size={"sm"}
        variant={"outline"}
        colorScheme="teal"
        aria-label="My models"
        onClick={() => setShowMyModels(true)}
        px={2}
      >
        Models
      </Button>
      {showMyModels && (
        <ModelsListDrawer onClose={() => setShowMyModels(false)} />
      )}
    </>
  );
}
