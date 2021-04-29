import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Head, SimpleButton } from "common/components";
import { UseTicketDefinitionCreationFormContainer } from "./containers";
import {
  CREATE_USETICKET_CATEGORY_FAILED,
  createUseTicketCatetoryThunk,
} from "modules/usetickets";

function UseTicketDefinitionCreationPage() {
  const dispatch = useDispatch();
  const partnerId = useSelector((state) => state.auth.partner.id);

  const handleUseTicketCategoryClick = () => {
    const categoryName = prompt("이용권 종류 이름");

    const successCb = () => {
      window.alert("이용권 종류가 추가되었습니다.");
    };

    const failedCb = (getState) => {
      const error = getState().appStatus.errors.find(
        (error) => error.type === CREATE_USETICKET_CATEGORY_FAILED
      );

      error && window.alert(error.message);
    };

    dispatch(
      createUseTicketCatetoryThunk(
        { partnerId, name: categoryName },
        {
          successCb,
          failedCb,
        }
      )
    );
  };

  return (
    <S.UseTicketDefinitionCreationPage>
      <Head title="이용권 생성">
        <SimpleButton
          extraStyle={extraStyle}
          onClick={handleUseTicketCategoryClick}
        >
          + 이용권 종류 생성
        </SimpleButton>
      </Head>
      <UseTicketDefinitionCreationFormContainer />
    </S.UseTicketDefinitionCreationPage>
  );
}

export default UseTicketDefinitionCreationPage;

const extraStyle = {
  width: "180px",
  height: "40px",
  fontSize: "1rem",
};

const S = {
  UseTicketDefinitionCreationPage: styled.div``,
};
