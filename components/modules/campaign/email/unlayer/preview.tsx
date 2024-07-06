import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorRef, EmailEditorProps } from "react-email-editor";
import useGlobalStore from "@/store/global";
import { sdk } from "@/util/graphqlClient";
import ReusableModal from "@/components/common/modal/modal";
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
  const { setToastData } = useGlobalStore();
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

  const sendTestMail = () => {
    if (title === "") {
      setToastData({
        type: "error",
        message: "Please enter subject for the test email to continue",
      });
      return;
    }

    if (title.length >= 60) {
      setToastData({
        type: "error",
        message: "Subject must be less than 60 characters",
      });
      return;
    }

    if (emails === "") {
      setToastData({
        type: "error",
        message: "Please enter email ids",
      });
      return;
    }

    const emailsArr = emails.split(",");
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
            subject: title,
          },
        });

        setLoading(false);

        if (!response.sendTestEmails) {
          setToastData({
            type: "error",
            message: "Something went wrong, please try again later!",
          });
          return;
        }

        setToastData({
          type: "success",
          message: "Test emails sent successfully!",
        });
        handleTestMailDialogClose();
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Helpers
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg min-h-screen">
      <div className="rounded-lg shadow-md mt-4 mb-6">
        <EmailEditor
          style={{ height: "85vh", width: "100%" }}
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
        <button className="btn btn-outlined" onClick={handleCloseClick}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleTestEmailClick}>
          Test Email
        </button>
      </div>
      {showTestMailDialog && (
        <ReusableModal
          title="Test Email"
          isOpen={showTestMailDialog}
          onClose={handleTestMailDialogClose}
        >
          <label className="block text-black mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-primary w-full"
            placeholder="Enter title"
          />
          <label className="block text-black mb-1 mt-4">Test Emails</label>
          <input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="input input-primary w-full"
            placeholder="Enter test email"
          />
          <div className="text-center mt-4 w-full flex justify-end ">
            <button
              className={`btn ${
                !loading && title !== "" && emails !== ""
                  ? "btn-primary"
                  : "btn-primary !opacity-60 !cursor-not-allowed"
              }`}
              onClick={() => {
                if (!loading && title !== "" && emails !== "") {
                  sendTestMail();
                }
              }}
            >
              Send
            </button>
          </div>
        </ReusableModal>
      )}
    </div>
  );
};

export default PreviewEditor;
