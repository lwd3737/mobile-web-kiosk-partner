import React from "react";
import styled, { css } from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";

import { RoomListContainer } from "./containers";
import { Head, SimpleButton } from "common/components";

export default function RoomListPage() {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleRoomCreationMoveClick = () => {
    history.push(`${url}/creation`);
  };

  return (
    <S.RoomListPage>
      <Head title="공간 관리">
        <SimpleButton
          extraStyle={extraStyle}
          onClick={handleRoomCreationMoveClick}
        >
          + 공간 생성
        </SimpleButton>
      </Head>

      <RoomListContainer />
    </S.RoomListPage>
  );
}

const extraStyle = {
  width: "140px",
  height: "40px",
  fontSize: "1rem",
};

const S = {
  RoomListPage: styled.div``,
};
