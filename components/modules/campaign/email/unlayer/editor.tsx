import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorRef, EmailEditorProps } from "react-email-editor";
import default_template from "./defaultTemplate.json";
import useGlobalStore from "@/store/global";
import { AddEmailTemplateInput } from "@/generated/graphql";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";

const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

const UnlayerEditor = () => {
  const { setEmailBuilderOpen } = useGlobalStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [showTestEmailDialog, setShowTestEmailDialog] =
    useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [testTitle, setTestTitle] = useState<string>("");
  const [testEmail, setTestEmail] = useState<string>("");

  const emailEditorRef = useRef<EditorRef | null>(null);

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
    setShowTestEmailDialog(false);
    setTitle("");
    setEmailBuilderOpen(false);
  };

  const handleSaveClick = () => {
    setLoading(true);
    setTitle("");
    setShowSaveDialog(true);
  };

  const handleTestEmailClick = () => {
    setShowTestEmailDialog(true);
  };

  const saveTemplate = async () => {
    if (emailEditorRef.current && emailEditorRef.current.editor) {
      setLoading(true);
      emailEditorRef.current.editor.exportHtml(async (data: any) => {
        try {
          let plainText = "";

          unlayer?.exportPlainText(async (data) => {
            const { text } = data;
            plainText = text;
          });

          const { design, html } = data;
          const input: AddEmailTemplateInput = {
            title,
            designJson: JSON.stringify(design),
            html,
            content: plainText,
          };

          const response = await sdk.CreateEmailTemplate({ input });
          if (response.createEmailTemplate) {
            alert("Email template saved successfully");
          } else {
            alert("Failed to save email template");
          }
        } catch (error) {
          console.error("Error saving email template:", error);
          alert("Error saving email template");
        } finally {
          setLoading(false);
          setShowSaveDialog(false);
        }
      });
    }
  };

  const saveTestEmail = () => {
    console.log("Test Title:", testTitle);
    console.log("Test Email:", testEmail);
    setShowTestEmailDialog(false);
    setTestTitle("");
    setTestEmail("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg min-h-screen">
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
      <div className="text-center flex float-end space-x-4">
        <button className="btn btn-warning" onClick={handleCloseClick}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleSaveClick}>
          Save
        </button>
        <button className="btn btn-primary" onClick={handleTestEmailClick}>
          Test Email
        </button>
      </div>
      {showSaveDialog && (
        <ReusableModal
          title="Save Template"
          isOpen={showSaveDialog}
          onClose={handleCloseClick}
        >
          <label className="block text-black mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-primary"
            placeholder="Enter title"
          />
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={saveTemplate}>
              Save
            </button>
          </div>
        </ReusableModal>
      )}
      {showTestEmailDialog && (
        <ReusableModal
          title="Test Email"
          isOpen={showTestEmailDialog}
          onClose={handleCloseClick}
        >
          <label className="block text-black mb-2">Title:</label>
          <input
            type="text"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            className="input input-primary w-full"
            placeholder="Enter title"
          />
          <label className="block text-black mb-2 mt-4">Test Email:</label>
          <input
            type="text"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="input input-primary w-full"
            placeholder="Enter test email"
          />
          <div className="text-center mt-4 w-full flex justify-end ">
            <button className="btn btn-primary" onClick={saveTestEmail}>
              Save
            </button>
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default UnlayerEditor;
