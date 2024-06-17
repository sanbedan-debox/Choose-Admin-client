import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorRef, EmailEditorProps } from "react-email-editor";
import default_template from "./defaultTemplate.json";
import useGlobalStore from "@/store/global";
import RoundedButton from "@/components/common/button/RoundedButton";

const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

interface IUnlayerEditorProps {
  closeHandler: () => void;
  setCounter: Dispatch<SetStateAction<number>>;
}

const UnlayerEditor = () => {
  const { setEmailBuilderOpen } = useGlobalStore();

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
    setEmailBuilderOpen(false);
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
    <div className="p-6 bg-black rounded-lg shadow-lg max-h-screen">
      <div className="flex mb-6 space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:outline-none block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter title"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 mb-2">Emails:</label>
          <input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="bg-secondary bg-opacity-30 text-sm rounded-lg focus:outline-none block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter emails"
          />
        </div>
      </div>
      <div className="rounded-lg shadow-md p-4 mb-6">
        <EmailEditor
          ref={emailEditorRef}
          style={{ height: "70vh", width: "100%" }}
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
      </div>
      <div className=" text-center">
        <RoundedButton onClick={handleSaveClick}>Save</RoundedButton>
        <RoundedButton onClick={handleCloseClick}>Close</RoundedButton>
        <RoundedButton onClick={handleTestEmailClick}>Test Email</RoundedButton>
      </div>
    </div>
  );
};

export default UnlayerEditor;
