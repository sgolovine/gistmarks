import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import parse from "bookmarks-parser";

const BookmarkUploader = () => {
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [parseError, setParseError] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(false);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => setUploadError(true);
      reader.onerror = () => setUploadError(true);
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        parse(reader.result, (err: unknown, res: unknown) => {
          if (err) {
            setParseError(true);
          }

          console.log("res", res);
        });
        console.log(binaryStr);
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="ring-2 ring-gray-500 h-[128px] hover:bg-gray-100 flex items-center justify-center rounded-lg drop-shadow-sm"
            >
              <input {...getInputProps()} />
              <p className="font-bold">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      {uploadError && (
        <p className="py-1 text-sm font-bold text-red-600">
          Error uploading bookmarks
        </p>
      )}
      {parseError && (
        <p className="py-1 text-sm font-bold text-red-600">
          Error parsing bookmarks
        </p>
      )}
    </>
  );
};

export default BookmarkUploader;
