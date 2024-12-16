import { Image } from "@/interfaces/models";
import { Carousel } from "rsuite";

import "./styles/card-images.css";

interface Props {
	images: Image[];
}

const CardImages = ({ images = [] }: Props) => {
	return (
		<div>
			{images.length == 0 ? (
				<p>No imagenes</p>
			) : (
				<Carousel className="custom-slider">
					{images.map((image) => (
						<img key={image.id} src={image.url} />
					))}
				</Carousel>
			)}
		</div>
	);
};

export default CardImages;
