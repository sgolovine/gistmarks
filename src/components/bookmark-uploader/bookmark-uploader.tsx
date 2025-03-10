import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { parse } from "../../services/bookmarks-parser";

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
        const htmlString = reader.result;

        console.log(htmlString);

        parse(htmlString as string, (error, data) => {
          if (error) {
            console.error(error);
          }
          console.log("parsed data: ", data);
        });
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
