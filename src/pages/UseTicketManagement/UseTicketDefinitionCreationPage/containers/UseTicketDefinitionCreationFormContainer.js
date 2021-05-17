import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { UseTicketDefinitionForm } from "pages/UseTicketManagement/common/components";
import { createUseTicketDefinitionThunk } from "modules/usetickets";

function UseTicketDefinitionCreationFormContainer() {
  const dispatch = useDispatch();

  const makeCreateDispatch = useCallback(() => {
    const successCb = () => {
      window.alert("이용권이 등록되었습니다.");
    };

    return ({ partnerId, inputs, failedCb }) => {
      dispatch(
        createUseTicketDefinitionThunk(
          {
            partnerId,
            inputs,
          },
          {
            successCb,
            failedCb,
          }
        )
      );
    };
  }, []);

  return <UseTicketDefinitionForm callUpdateDispatch={makeCreateDispatch()} />;
}

export default UseTicketDefinitionCreationFormContainer;
