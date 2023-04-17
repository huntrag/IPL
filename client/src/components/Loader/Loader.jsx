import * as React from "react";
import { Stack, Button, Modal } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          height="100%"
          width="100%"
          alignItems={"center"}
          justifyContent="center"
        >
          <ThreeCircles
            height="100"
            width="100"
            color="blue"
            wrapperStyle={{}}
            wrapperClass=""
            visible={open}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor="white"
            middleCircleColor=""
            alignSelf="center"
          />
        </Stack>
      </Modal>
    </div>
  );
}
