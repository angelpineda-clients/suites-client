import { Uploader } from "rsuite";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { UploadLabel, UploadWrapper, DropZone } from "./UploadImages.styled";

interface Props {
  formHook: UseFormReturn<FieldValues, any, undefined>;
}
const UploadImages = ({ formHook }: Props) => {
  function setFormValue(files: any[]) {
    const newFiles = files.map((file) => file.blobFile);
    formHook.setValue("images", newFiles);
  }

  return (
    <UploadWrapper>
      <UploadLabel variant="subtitle2">Imagenes</UploadLabel>
      <Uploader
        action=""
        draggable
        autoUpload={false}
        onChange={setFormValue}
        accept="image/png, image/jpeg"
        multiple
      >
        <DropZone>Click or Drag files to this area to upload</DropZone>
      </Uploader>
    </UploadWrapper>
  );
};

export default UploadImages;
