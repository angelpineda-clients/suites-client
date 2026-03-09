import { Typography } from "@mui/material";
import { IService } from "@/interfaces/models";
import { ServicePill, ServicesWrap } from "./RoomCard.styled";

interface Props {
  services: IService[];
}

const CardServices = ({ services = [] }: Props) => {
  if (!services.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Sin servicios
      </Typography>
    );
  }

  return (
    <ServicesWrap>
      {services.map((service) => (
        <ServicePill key={service.id}>{service.name}</ServicePill>
      ))}
    </ServicesWrap>
  );
};

export default CardServices;
