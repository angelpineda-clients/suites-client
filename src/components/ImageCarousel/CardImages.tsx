import { Image } from "@/interfaces/models";
import { Carousel } from "rsuite";

import "./styles/card-images.css";

interface Props {
	images: Image[];
	roomName?: string;
}

const ImageCarousel = ({ images = [], roomName }: Props) => {
	return (
		<div>
			{images.length == 0 ? (
				<p>No imagenes</p>
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
