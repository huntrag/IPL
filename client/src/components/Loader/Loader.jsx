import * as React from "react";
import { Stack, Modal } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function Loader() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.isLoading);
  const handleClose = () => {
    dispatch(uiActions.hideLoading());
  };

  console.log(open);

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
