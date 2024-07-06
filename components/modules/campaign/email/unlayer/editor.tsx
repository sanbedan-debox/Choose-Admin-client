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

  const { setToastData } = useGlobalStore();
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
  };
  const handleClose = () => {
    setEmailBuilderOpen(false);
  };

  const handleSaveClick = () => {
    setTitle("");
    setShowSaveDialog(true);
  };

  const handleTestEmailClick = () => {
    setShowTestEmailDialog(true);
  };

  const saveTemplate = async () => {
    if (title === "") {
      setToastData({
        type: "error",
        message: "Please enter title for the email template to continue",
      });
      return;
    }

    if (title.length >= 60) {
      setToastData({
        type: "error",
        message: "Title must be less than 60 characters",
      });
      return;
    }

    const unlayer = emailEditorRef.current?.editor;

    if (unlayer === undefined) {
      setToastData({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
      return;
    }

    let plainText = "";

    unlayer?.exportPlainText(async (data) => {
      const { text } = data;
      plainText = text;

      if (plainText === "") {
        setToastData({
          type: "error",
          message: "Please add some content before saving the template!",
        });
        return;
      }
      unlayer?.exportHtml(async (data) => {
        const { html, design } = data;
        try {
          setLoading(true);
          const response = await sdk.CreateEmailTemplate({
            input: {
              content: plainText,
              designJson: JSON.stringify(design),
              html: html,
              title: title.toString().trim(),
            },
          });
          setLoading(false);

          if (!response.createEmailTemplate) {
            setToastData({
              type: "error",
              message: "Something went wrong, please try again later!",
            });
            return;
          }

          setShowSaveDialog(false);
          setEmailBuilderOpen(false);
          setToastData({
            type: "success",
            message: "Email template saved successfully!",
          });
        } catch (error: any) {
          setLoading(false);
          setToastData({
            type: "error",
            message: error.toString(),
          });
        }
      });
    });
  };

  const saveTestEmail = () => {
    setShowTestEmailDialog(false);
    setTestTitle("");
    setTestEmail("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg min-h-screen">
      <p className="text-black">{`Note: If you want to add a custom link, please add "{{emailLink}}" in place of the url where it's needed. You can only add one custom link.`}</p>
      <div className="rounded-lg shadow-md mt-4 mb-6">
        <EmailEditor
          ref={emailEditorRef}
          style={{ height: "80vh", width: "100%" }}
          options={{
            id: "editor-container",
            displayMode: "email",
            features: {
              sendTestEmail: true,
            },
            projectId: 240672,
            user: {
              id: 1606,
              email: "mehank@choosepos.com",
              name: "Mehank Jain",
              signature:
                "f09cb35eb22affd0e84ca71048a0f18322d0c344905903c72d5f722f61198549",
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
        <button className="btn btn-outlined" onClick={handleClose}>
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
          <label className="block text-black mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-primary"
            placeholder="Enter title"
          />
          <div className="text-end mt-4">
            <button
              className={`btn ${
                loading
                  ? "btn-primary !opacity-60 !cursor-not-allowed"
                  : "btn-primary"
              }`}
              onClick={(e) => {
                if (!loading) {
                  saveTemplate();
                }
              }}
            >
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
          <label className="block text-black mb-1">Title</label>
          <input
            type="text"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            className="input input-primary w-full"
            placeholder="Enter title"
          />
          <label className="block text-black mb-1 mt-4">Test Email</label>
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
