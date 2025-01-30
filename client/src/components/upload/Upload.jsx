import React, { useRef } from "react";
import { IoAttach } from "react-icons/io5";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const urlEndpoint = "https://ik.imagekit.io/dxhkih2g4";
const publicKey = "public_YJMtq8FjtZ90BCIN5j7VnmlevPQ=";
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName={true}
        fileName="test-upload.png"
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        onError={onError}
        onSuccess={onSuccess}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      {
        <label
          onClick={() => {
            ikUploadRef.current.click();
          }}
        >
          <IoAttach />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
