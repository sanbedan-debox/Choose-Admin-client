import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorRef, EmailEditorProps } from "react-email-editor";
const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

interface IPreviewEditorProps {
  closeHandler: () => void;
  design: string;
  title?: string;
}

const PreviewEditor = ({
  closeHandler,
  design,
  title: propsTitle = "",
}: IPreviewEditorProps) => {
  // Loading & Error Handling
  const [loading, setLoading] = useState<boolean>(false);

  // Data Handling
  const emailEditorRef = useRef<EditorRef | null>(null);

  const [showTestMailDialog, setShowTestMailDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(propsTitle);
  const [emails, setEmails] = useState<string>("");

  // Unlayer Email Editor
  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    emailEditorRef.current = { editor: unlayer };
    unlayer.addEventListener("design:loaded", onDesignLoad);
    unlayer.loadDesign(JSON.parse(design));
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    emailEditorRef.current = { editor: unlayer };
    emailEditorRef.current.editor?.showPreview({ device: "desktop" });
    // console.log(document.getElementById("close-preview"));
    // document.getElementById("close-preview")?.remove();
  };

  const onDesignLoad = (data: any) => {
    // console.log("onDesignLoad", data);
    // console.log(document.getElementById("close-preview"));
  };

  // Handlers
  const handleCloseClick = () => {
    setTitle("");
    setEmails("");
    closeHandler();
  };

  const handleTestMailDialogClose = () => {
    setShowTestMailDialog(false);
    setTitle("");
    setEmails("");
  };

  const handleTestEmailClick = () => {
    setLoading(false);
    setShowTestMailDialog(true);
  };

  const sendTestMail = () => {};

  // Helpers
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <EmailEditor
        style={{
          display: "flex",
          minHeight: "90vh",
          margin: "12px 16px 0 16px",
          width: "100vw",
          backgroundColor: "white",
        }}
        ref={emailEditorRef}
        options={{
          tools: {
            button: {
              enabled: false,
            },
            divider: {
              enabled: false,
            },
            form: {
              enabled: false,
            },
            heading: {
              enabled: false,
            },
            image: {
              enabled: false,
            },
            menu: {
              enabled: false,
            },
            social: {
              enabled: false,
            },
            text: {
              enabled: false,
            },
            timer: {
              enabled: false,
            },
            video: {
              enabled: false,
            },
            html: {
              enabled: false,
            },
          },
          tabs: {
            content: {
              enabled: false,
            },
            blocks: {
              enabled: false,
            },
            body: {
              enabled: false,
            },
          },
          id: "editor-container",
          projectId: 232765,
          user: {
            id: 1606,
            email: "mehank@inradius.in",
            name: "Mehank Jain",
            signature:
              "ab67acad136bf9f19eae476c070bd49e39faeb8cb1aec32616ed080b21d15738",
          },
          mergeTags: {
            name: {
              name: "name",
              value: "{{name}}",
            },
          },
          appearance: {
            theme: "modern_dark",
          },
        }}
        onLoad={onLoad}
        onReady={onReady}
      />
    </>
  );
};

export default PreviewEditor;
