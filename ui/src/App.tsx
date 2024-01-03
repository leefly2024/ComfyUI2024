import { useCallback, useEffect, useRef, useState } from "react";
// @ts-ignore
import { app } from "/scripts/app.js";
// @ts-ignore
import { api } from "/scripts/api.js";

import { ComfyExtension, ComfyObjectInfo } from "./types/comfy";
import {
  HStack,
  Box,
  Button,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import {
  IconFolder,
  IconPlus,
  IconTriangleInvertedFilled,
  IconGripVertical,
  IconDeviceFloppy,
  IconPhoto,
} from "@tabler/icons-react";
import RecentFilesDrawer from "./RecentFilesDrawer/RecentFilesDrawer";
import Draggable from "./components/Draggable";
import {
  createFlow,
  getWorkflow,
  loadDBs,
  updateFlow,
  workspace,
  userSettingsTable,
  PanelPosition,
  changelogsTable,
  mediaTable,
} from "./WorkspaceDB";
import { defaultGraph } from "./defaultGraph";
import { WorkspaceContext } from "./WorkspaceContext";
import EditFlowName from "./components/EditFlowName";
import DropdownTitle from "./components/DropdownTitle";
import {
  getFileUrl,
  matchSaveWorkflowShortcut,
  validateOrSaveAllJsonFileMyWorkflows,
} from "./utils";
import GalleryModal from "./gallery/GalleryModal";

type Route = "root" | "customNodes" | "recentFlows" | "gallery";

export default function App() {
  const nodeDefs = useRef<Record<string, ComfyObjectInfo>>({});
  const [curFlowName, setCurFlowName] = useState<string | null>(null);
  const [route, setRoute] = useState<Route>("root");
  const [loadingDB, setLoadingDB] = useState(true);
  const [flowID, setFlowID] = useState<string | null>(null);
  const curFlowID = useRef<string | null>(null);
  const [positionStyle, setPositionStyle] = useState<PanelPosition>();
  const [isDirty, setIsDirty] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const saveCurWorkflow = useCallback(() => {
    if (curFlowID.current) {
      const graphJson = JSON.stringify(app.graph.serialize());
      updateFlow(curFlowID.current, {
        lastSavedJson: graphJson,
      });

      changelogsTable?.create({
        workflowID: curFlowID.current,
        json: graphJson,
      });
    }
  }, []);
  const discardUnsavedChanges = () => {
    let userInput = confirm(
      "Are you sure you want to discard unsaved changes? This will revert current workflow to your last saved version. You will lose all changes made since your last save."
    );

    if (userInput) {
      // User clicked OK
      if (curFlowID.current) {
        const flow = getWorkflow(curFlowID.current);
        if (flow && flow.lastSavedJson) {
          app.loadGraphData(JSON.parse(flow.lastSavedJson));
        }
      }
    }
  };

  const setCurFlowID = (id: string) => {
    curFlowID.current = id;
    setFlowID(id);
  };

  const graphAppSetup = async () => {
    const ext: ComfyExtension = {
      // Unique name for the extension
      name: "WorkspaceManager",
      async setup(app) {
        // Any setup to run after the app is created
      },
      async addCustomNodeDefs(defs) {
        nodeDefs.current = defs;
      },
    };
    app.registerExtension(ext);
    try {
      await loadDBs();
      updatePanelPosition(userSettingsTable?.getSetting("topBarStyle"), false);
    } catch (error) {
      console.error("error loading db", error);
    }
    setLoadingDB(false);
    const latest = localStorage.getItem("curFlowID");
    const latestWf = latest != null ? getWorkflow(latest) : null;
    if (latestWf) {
      setCurFlowID(latestWf.id);
      setCurFlowName(latestWf.name);
    } else {
      const graphJson = localStorage.getItem("workflow");
      const flow = createFlow({ json: graphJson ?? "" });
      setCurFlowID(flow.id);
      setCurFlowName(flow.name ?? "");
    }
    validateOrSaveAllJsonFileMyWorkflows();
  };
  useEffect(() => {
    graphAppSetup();
    setInterval(() => {
      if (curFlowID.current != null) {
        const graphJson = JSON.stringify(app.graph.serialize());
        localStorage.setItem("curFlowID", curFlowID.current);
        graphJson != null &&
          updateFlow(curFlowID.current, {
            json: graphJson,
          });

        const curWorkflow = curFlowID.current
          ? getWorkflow(curFlowID.current)
          : undefined;
        if (curWorkflow == null || graphJson === curWorkflow?.lastSavedJson) {
          setIsDirty(false);
        } else {
          setIsDirty(true);
        }
      }
    }, 1000);
  }, []);
  const loadWorkflowID = (id: string) => {
    if (workspace == null) {
      alert("Error: Workspace not loaded!");
      return;
    }
    setCurFlowID(id);
    const flow = workspace[id];
    if (flow == null) {
      alert("Error: Workflow not found! id: " + id);
      return;
    }
    app.loadGraphData(JSON.parse(flow.json));
    setCurFlowName(flow.name);
    setRoute("root");
  };
  const loadNewWorkflow = (input?: { json?: string; name?: string }) => {
    let jsonStr = input?.json ?? JSON.stringify(defaultGraph);
    const flow = createFlow({ json: jsonStr, name: input?.name });
    loadWorkflowID(flow.id);
    setRoute("root");
  };

  const loadFilePath = async (
    relativePath: string,
    overwriteCurrent: boolean = false
  ) => {
    const fileName = relativePath.split("/").pop() ?? relativePath;
    if (!overwriteCurrent) {
      loadNewWorkflow({ name: fileName });
    } else {
      saveCurWorkflow();
    }
    const res = await fetch(getFileUrl(relativePath));
    const blob = await res.blob();
    const fileObj = new File([blob], fileName, {
      type: res.headers.get("Content-Type") || "",
    });
    await app.handleFile(fileObj);
    setRoute("root");
  };

  const onDuplicateWorkflow = (workflowID: string, newFlowName?: string) => {
    if (workspace == null) {
      return;
    }
    const workflow = workspace[workflowID];
    if (workflow == null) {
      return;
    }
    const flow = createFlow({
      json: workflow.json,
      name: newFlowName || workflow.name,
      parentFolderID: workflow.parentFolderID,
      tags: workflow.tags,
    });
    loadWorkflowID(flow.id);
  };

  const updatePanelPosition = useCallback(
    (position?: PanelPosition, needUpdateDB: boolean = false) => {
      const { top: curTop = 0, left: curLeft = 0 } = positionStyle || {};
      let { top = 0, left = 0 } = position ?? {};
      top += curTop;
      left += curLeft;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const panelElement = document.getElementById("workspaceManagerPanel");
      const offsetWidth = panelElement?.offsetWidth || 392;

      if (top + 36 > clientHeight) top = clientHeight - 36;
      if (left + offsetWidth >= clientWidth) left = clientWidth - offsetWidth;

      setPositionStyle({ top: Math.max(0, top), left: Math.max(0, left) });

      needUpdateDB &&
        userSettingsTable?.upsert({
          topBarStyle: { top, left },
        });
    },
    [positionStyle]
  );

  const shortcutListener = (event: KeyboardEvent) => {
    if (matchSaveWorkflowShortcut(event)) {
      saveCurWorkflow();
    }
  };
  const onExecutedCreateMedia = useCallback((image: any) => {
    if (curFlowID.current == null) return;
    let path = image.filename;
    if (image.subfolder != null && image.subfolder !== "") {
      path = image.subfolder + "/" + path;
    }
    mediaTable?.create({
      workflowID: curFlowID.current,
      localPath: path,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", shortcutListener);
    api.addEventListener("executed", (e: any) => {
      e.detail?.output?.images?.forEach(onExecutedCreateMedia);
      e.detail?.output?.gifs?.forEach(onExecutedCreateMedia);
    });
    return () => window.removeEventListener("keydown", shortcutListener);
  }, []);

  if (loadingDB || !positionStyle) {
    return null;
  }
  return (
    <WorkspaceContext.Provider
      value={{
        curFlowID: flowID,
        onDuplicateWorkflow: onDuplicateWorkflow,
        loadWorkflowID: loadWorkflowID,
        discardUnsavedChanges: discardUnsavedChanges,
        saveCurWorkflow: saveCurWorkflow,
        isDirty: isDirty,
        loadNewWorkflow: loadNewWorkflow,
        loadFilePath: loadFilePath,
      }}
    >
      <Box
        style={{
          width: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        zIndex={1000}
        draggable={false}
      >
        <Draggable
          onDragEnd={(position: { x: number; y: number }) => {
            updatePanelPosition({ top: position.y, left: position.x }, true);
          }}
        >
          <HStack
            style={{
              padding: 2,
              position: "fixed",
              ...positionStyle,
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            draggable={false}
            id="workspaceManagerPanel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              size={"sm"}
              aria-label="workspace folder"
              onClick={() => setRoute("recentFlows")}
              px={2}
            >
              <HStack gap={1}>
                <IconFolder size={21} />
                <IconTriangleInvertedFilled size={8} />
              </HStack>
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              colorScheme="teal"
              aria-label="new workflow"
              onClick={() => loadNewWorkflow()}
              px={2}
            >
              <HStack gap={1}>
                <IconPlus size={16} color={"white"} />
                <Text color={"white"} fontSize={"sm"}>
                  New
                </Text>
              </HStack>
            </Button>
            <EditFlowName
              isDirty={isDirty}
              displayName={curFlowName ?? ""}
              updateFlowName={(newName) => {
                setCurFlowName(newName);
                requestAnimationFrame(() => {
                  updatePanelPosition();
                });
              }}
            />
            <HStack gap={"1px"}>
              {isDirty && (
                <Tooltip label="Save workflow">
                  <IconButton
                    onClick={saveCurWorkflow}
                    icon={<IconDeviceFloppy size={20} color="white" />}
                    size={"sm"}
                    aria-label="save workspace"
                    variant={"ghost"}
                  />
                </Tooltip>
              )}
              <DropdownTitle onClick={() => setIsHovered(false)} />
              <Tooltip label="Open gallery">
                <IconButton
                  onClick={() => setRoute("gallery")}
                  icon={<IconPhoto size={20} color="white" />}
                  size={"sm"}
                  aria-label="open gallery"
                  variant={"ghost"}
                />
              </Tooltip>
            </HStack>
            {isHovered && (
              <IconGripVertical
                id="dragPanelIcon"
                cursor="move"
                size={15}
                color="#FFF"
              />
            )}
          </HStack>
        </Draggable>
        {route === "recentFlows" && (
          <RecentFilesDrawer
            onclose={() => setRoute("root")}
            onClickNewFlow={() => {
              loadNewWorkflow();
              setRoute("root");
            }}
          />
        )}
        {route === "gallery" && (
          <GalleryModal onclose={() => setRoute("root")} />
        )}
      </Box>
    </WorkspaceContext.Provider>
  );
}
