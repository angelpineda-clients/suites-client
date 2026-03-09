import { IRoom } from "@/interfaces/models/IRoom";
import { Typography } from "@mui/material";
// icons
import PeopleIcon from "@mui/icons-material/People";
import KingBedIcon from "@mui/icons-material/KingBed";
import { useUiContext } from "@/context/ui/UiProvider";
import { useBookingStore } from "@/store/booking";
import formatNumberToPesosMX from "@/helpers/currencyFormat";
import CardImages from "@/components/ImageCarousel/CardImages";
import CardServices from "./CardServices";
import Cart from "@/components/Cart/Cart";
import {
  BookButton,
  CardInfo,
  GalleryStack,
  MetaGrid,
  MetaInfo,
  MetaItem,
  MetaLabel,
  RoomCardBody,
  RoomCardContainer,
} from "./RoomCard.styled";

const GRID_XS = 6;
const GRID_MD = 4;

const RoomCard = (data: IRoom = {} as IRoom) => {
  const setRomID = useBookingStore((store) => store.setRoomID);
  const { id, name, description, capacity, beds, price, size, floor, services, images } = data;

  const { showDrawer } = useUiContext();

  function openDrawer() {
    setRomID(id);

    showDrawer({ children: <Cart room={data} /> });
  }

  return (
    <RoomCardContainer className="animate__animated animate__fadeIn">
      <RoomCardBody>
        <CardInfo>
          <Typography variant="h4" component="h4">
            {name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>

          <MetaGrid container spacing={2}>
            <MetaItem item xs={GRID_XS} md={GRID_MD}>
              <MetaLabel variant="caption">Desde</MetaLabel>
              <MetaInfo>
                <Typography variant="h6">{formatNumberToPesosMX.format(price)}</Typography>
              </MetaInfo>
            </MetaItem>

            <MetaItem item xs={GRID_XS} md={GRID_MD}>
              <MetaLabel variant="caption">Capacidad</MetaLabel>
              <MetaInfo>
                <PeopleIcon />
                <Typography>{capacity}</Typography>
              </MetaInfo>
            </MetaItem>

            <MetaItem item xs={GRID_XS} md={GRID_MD}>
              <MetaLabel variant="caption">Camas</MetaLabel>
              <MetaInfo>
                <KingBedIcon />
                <Typography>{beds}</Typography>
              </MetaInfo>
            </MetaItem>

            <MetaItem item xs={GRID_XS} md={GRID_MD}>
              <MetaLabel variant="caption">Tamaño</MetaLabel>
              <MetaInfo>
                <Typography>{size?.alias || size?.name}</Typography>
              </MetaInfo>
            </MetaItem>

            <MetaItem item xs={GRID_XS} md={GRID_MD}>
              <MetaLabel variant="caption">Piso</MetaLabel>
              <MetaInfo>
                <Typography>{floor?.name}</Typography>
              </MetaInfo>
            </MetaItem>

            <MetaItem item xs={12}>
              <MetaLabel variant="caption">Servicios</MetaLabel>
              <MetaInfo>
                <CardServices services={services} />
              </MetaInfo>
            </MetaItem>
          </MetaGrid>
        </CardInfo>
        <GalleryStack>
          <CardImages images={images} />
        </GalleryStack>
      </RoomCardBody>
      <BookButton appVariant="primary" onClick={openDrawer}>
        Reservar
      </BookButton>
    </RoomCardContainer>
  );
};

export default RoomCard;
