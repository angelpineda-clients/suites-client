import { Carousel } from "rsuite";

import { Image } from "@/interfaces/models";

import NoImage from "@/assets/images/No_Image.png";

import "./styles/card-images.css";

interface Props {
	images: Image[];
	roomName?: string;
}

const ImageCarousel = ({ images = [], roomName }: Props) => {
	return (
		<div>
			{images.length == 0 ? (
				<img
					src={NoImage}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "fill",
					}}
				/>
			) : (
				<Carousel className="custom-slider">
					{images.map((image) => (
						<img key={image.id} src={image.url} alt={roomName} />
					))}
				</Carousel>
			)}
		</div>
	);
};

export default ImageCarousel;
