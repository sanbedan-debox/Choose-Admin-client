import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorRef, EmailEditorProps } from "react-email-editor";

import default_template from "./defaultTemplate.json";
const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

interface IUnlayerEditorProps {
  closeHandler: () => void;
  setCounter: Dispatch<SetStateAction<number>>;
}

const UnlayerEditor = () => {
  // Loading & Error Handling
  const [loading, setLoading] = useState<boolean>(false);

  // Data Handling
  const emailEditorRef = useRef<EditorRef | null>(null);

  const [showTestMailDialog, setShowTestMailDialog] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [emails, setEmails] = useState<string>("");

  // Unlayer Email Editor
  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    emailEditorRef.current = { editor: unlayer };
    unlayer.loadDesign(default_template.body);
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    emailEditorRef.current = { editor: unlayer };
  };

  // Handlers
  const handleCloseClick = () => {
    setShowSaveDialog(false);
    setShowTestMailDialog(false);
    setTitle("");
  };

  const handleTestMailDialogClose = () => {
    setShowTestMailDialog(false);
    setTitle("");
    setEmails("");
  };

  const handleSaveDialogClose = () => {
    setShowSaveDialog(false);
    setTitle("");
  };

  const handleSaveClick = () => {
    setLoading(false);
    setTitle("");
    setShowSaveDialog(true);
  };

  const handleTestEmailClick = () => {
    setLoading(false);
    setTitle("");
    setEmails("");
    setShowTestMailDialog(true);
  };

  const saveTemplate = () => {};

  const sendTestMail = () => {};

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div className="mb-10 flex">
        <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px" }}
        />
        <label style={{ display: "block", marginBottom: "5px" }}>Emails:</label>
        <input
          type="text"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          style={{ padding: "8px" }}
        />
      </div>
      <EmailEditor
        style={{
          display: "flex",
          minHeight: "70vh",
          margin: "12px 16px 0 16px",
          width: "100%",
          backgroundColor: "black",
        }}
        ref={emailEditorRef}
        options={{
          id: "editor-container",
          displayMode: "email",
          features: {
            sendTestEmail: true,
          },
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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleSaveClick}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Save
        </button>
        <button
          onClick={handleCloseClick}
          style={{ marginRight: "10px", padding: "10px 20px" }}
        >
          Close
        </button>
        <button onClick={handleTestEmailClick} style={{ padding: "10px 20px" }}>
          Test Email
        </button>
      </div>
    </div>
  );
};

export default UnlayerEditor;
