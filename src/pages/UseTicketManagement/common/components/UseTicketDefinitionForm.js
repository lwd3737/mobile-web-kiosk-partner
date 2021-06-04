import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, SimpleButton } from "common/components";
import { useUseTicketDefinitionFields } from "../hooks";
import { CREATE_USETICKET_DEFINITION_FAILED } from "modules/usetickets";

function UseTicketDefinitionForm({ callUpdateDispatch }) {
  const history = useHistory();
  const partnerId = useSelector((state) => state.auth.partner.id);
  const { fields, fieldComponents } = useUseTicketDefinitionFields({
    partnerId,
  });

  const handlePrevClick = useCallback(() => {
    history.replace("/partner/usetickets");
  }, []);

  const handleUpdateClick = useCallback((fields) => {
    const { categoryId, periodUnit, period, price } = fields;

    const makeMessage = (text) => {
      return `${text}을(를) 입력해주세요.`;
    };
    if (!categoryId) {
      console.log();
      return alert(makeMessage("이용권 종류"));
    }
    if (!periodUnit) {
      return alert(makeMessage("이용시간 단위"));
    }
    if (!period) {
      return alert(makeMessage("이용시간"));
    }
    if (!price) {
      return alert(makeMessage("가격"));
    }

    const failedCb = (getState) => {
      const { errorMessage } = getState().appStatus;
      console.log("errorMessage: ", errorMessage);
      window.alert(errorMessage);
    };

    callUpdateDispatch(
      { partnerId, inputs: fields },
      {
        successCb: null,
        failedCb,
      }
    );

    handlePrevClick();
  }, []);

  const renderBottom = useCallback(() => {
    return (
      <>
        <SimpleButton
          className="prev-btn"
          backgroundColor={"gray1"}
          onClick={handlePrevClick}
        >
          이전
        </SimpleButton>
        <SimpleButton
          className="next-btn"
          extraStyle={{
            marginLeft: "20px",
          }}
          onClick={() => handleUpdateClick(fields)}
        >
          생성
        </SimpleButton>
      </>
    );
  }, [fields]);

  return <Form fieldComponents={fieldComponents} bottom={renderBottom()} />;
}

export default React.memo(UseTicketDefinitionForm);
