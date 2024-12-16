import { IService } from "@/interfaces/models";

interface Props {
	services: IService[];
}

const CardServices = ({ services = [] }: Props) => {
	return (
		<p>
			{services.length > 1 ? (
				<>
					{services.map((service, idx) => (
						<span key={service.id}>
							{idx !== 0 && ","}
							{service.name}
						</span>
					))}
				</>
			) : (
				<>No servicios</>
			)}
		</p>
	);
};

export default CardServices;
