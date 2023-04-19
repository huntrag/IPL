import * as React from "react";
import { Stack, Button, Modal } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import { Box } from "@mui/material";

export default function Loader() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.isLoading);
  const handleOpen = () => {
    dispatch(uiActions.showLoading());
  };

  const handleClose = () => {
    dispatch(uiActions.hideLoading());
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
