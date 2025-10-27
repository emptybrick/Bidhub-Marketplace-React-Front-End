import { useEffect, useRef } from "react";

const UploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    if (window.cloudinary && uploadButtonRef.current) {
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
