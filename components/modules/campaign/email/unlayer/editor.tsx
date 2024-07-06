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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveTestEmail = () => {
    if (testTitle === "") {
      setToastData({
        type: "error",
        message: "Please enter subject for the test email to continue",
      });
      return;
    }

    if (testTitle.length >= 60) {
      setToastData({
        type: "error",
        message: "Subject must be less than 60 characters",
      });
      return;
    }

    if (testEmail === "") {
      setToastData({
        type: "error",
        message: "Please enter email ids",
      });
      return;
    }

    const emailsArr = testEmail.split(",");
    const finalArr: string[] = [];
    for (let i = 0; i < emailsArr.length; i++) {
      const email = emailsArr[i].trim();
      if (!validateEmail(email)) {
        setToastData({
          type: "error",
          message: `${email} is not valid, please enter a valid email id`,
        });
        return;
      }
      finalArr.push(email);
    }

    if (finalArr.length > 5) {
      setToastData({
        type: "error",
        message: "You can only add upto 5 emails for sending test emails.",
      });
      return;
    }

    try {
      const unlayer = emailEditorRef.current?.editor;

      if (unlayer === undefined) {
        setToastData({
          type: "error",
          message: "Something went wrong, please try again later!",
        });
        return;
      }

      setLoading(true);
      unlayer?.exportHtml(async (data) => {
        const { design, html } = data;

        const response = await sdk.SendTestEmails({
          input: {
            emails: finalArr.toString(),
            html,
            subject: testTitle,
          },
        });

        setLoading(false);

        if (response.sendTestEmails === false) {
          setToastData({
            type: "error",
            message:
              "Something went wrong while sending the test emails, please try again later!",
          });
          return;
        }

        setToastData({
          type: "success",
          message: "Test emails sent successfully!",
        });
        setShowTestEmailDialog(false);
        setTestTitle("");
        setTestEmail("");
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
            <button
              className={`btn ${
                loading
                  ? "btn-primary !opacity-60 !cursor-not-allowed"
                  : "btn-primary"
              }`}
              onClick={saveTestEmail}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default UnlayerEditor;
