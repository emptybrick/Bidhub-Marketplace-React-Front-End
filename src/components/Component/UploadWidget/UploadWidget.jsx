import { useEffect, useRef } from "react";

const UploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    // initialize and return cleanup so listeners are removed between effect runs
    if (window.cloudinary && uploadButtonRef.current) {
      console.log("UW config at runtime:", uwConfig);

      uploadWidgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (error) {
            console.error("Cloudinary widget error:", error);
            return;
          }
          if (result && result.event === "success") {
            setPublicId(result.info.public_id);
          }
          if (
            result &&
            result.event === "queues-end" &&
            result.info &&
            result.info.files
          ) {
            // Inspect per-file statuses when something fails
            console.log("Upload queue finished:", result.info.files);
          }
        }
      );

      const handleUploadClick = () => {
        if (uploadWidgetRef.current) uploadWidgetRef.current.open();
      };

      const buttonElement = uploadButtonRef.current;
      buttonElement.addEventListener("click", handleUploadClick);

      return () => {
        buttonElement.removeEventListener("click", handleUploadClick);
        uploadWidgetRef.current = null;
      };
    }
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default UploadWidget;
