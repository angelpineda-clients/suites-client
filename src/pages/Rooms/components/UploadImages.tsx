import { Uploader } from "rsuite";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props {
	formHook: UseFormReturn<FieldValues, any, undefined>;
}
const UploadImages = ({ formHook }: Props) => {
	function setFormValue(files: any[]) {
		const newFiles = files.map((file) => file.blobFile);
		formHook.setValue("images", newFiles);
	}

	return (
		<>
			<label
				style={{
					margin: "8px 0",
					display: "inline-block",
				}}
			>
				Imagenes
			</label>
			<Uploader
				action=""
				draggable
				autoUpload={false}
				onChange={setFormValue}
				accept="image/png, image/jpeg"
				multiple
			>
				<div
					style={{
						height: 200,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<span>Click or Drag files to this area to upload</span>
				</div>
			</Uploader>
		</>
	);
};

export default UploadImages;
