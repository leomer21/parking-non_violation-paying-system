import { FC, useState } from "react";
import { Modal, Box } from "@mui/material";

import DetailComponent from "./DetailComponent";
import CardComponent from "./CardComponent";
import CashComponent from "./CashComponent";
import AppleComponent from "./AppleComponent";

type PayingProps = {
  plateNumber: string;
  duration: number;
  amount: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  maxHeight: "90vh", // Set maximum height to 90% of the viewport
  overflowY: "auto", // Enable scrolling for overflowing content
  width: "90%", // Set width to 90% of the viewport for responsiveness
  maxWidth: "500px", // Max width for the modal
};

const PayingComponent: FC<PayingProps> = ({
  plateNumber,
  duration,
  amount,
}) => {
  const [modalOpen, setModalOpen] = useState<string>("");

  const closeModal = () => {
    setModalOpen("");
  };

  return (
    <div className="payment w-full flex flex-col">
      <div className="flex flex-col mt-3 bg-[#FFF2EE] rounded-[10px] p-5 items-center w-full">
        <p className="lg:text-2xl sm:text-xl text-md font-bold text-[#091C62]">
          City Park Management
        </p>
        <div className="text-xl font-bold text-[#091C62] mt-4">
          ${parseFloat((amount * 1.07).toFixed(2)) + 0.5}
        </div>
      </div>
      <div className="mt-4 text-white w-fit self-center">
        <button
          className="btn bg-[#FA551D] w-full py-2.5 px-8 rounded-[10px]"
          onClick={() => setModalOpen("Detail")}
        >
          View Detail
        </button>
      </div>
      <div className="flex flex-col mt-8">
        <div className="text-[#091C62] p-1 text-center lg:text-left text-2xl">
          Payment Method
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <button
            className="search-result w-full lg:w-[250px]"
            onClick={() => setModalOpen("Card")}
          >
            Card
          </button>
          <button
            className="search-result w-full lg:w-[250px]"
            onClick={() => setModalOpen("Cash")}
          >
            Cash App Pay
          </button>
        </div>
      </div>
      <Modal open={!!modalOpen} onClose={closeModal} className="card-modal">
        <Box sx={{ ...style }}>
          {modalOpen === "Detail" && (
            <DetailComponent
              plateNumber={plateNumber}
              duration={duration}
              amount={amount}
              onClose={closeModal}
            />
          )}
          {modalOpen === "Card" && (
            <CardComponent
              plateNumber={plateNumber}
              duration={duration}
              amount={amount}
              onClose={closeModal}
            />
          )}
          {modalOpen === "Cash" && <CashComponent onClose={closeModal} />}
          {modalOpen === "Apple" && <AppleComponent onClose={closeModal} />}
        </Box>
      </Modal>
    </div>
  );
};

export default PayingComponent;
