import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Head, SimpleButton } from "common/components";
import { UseTicketDefinitionListContainer } from "./containers";

function UseTicketDefinitionDisplayPage() {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleUseTicketCreationClick = () => {
    history.push(`${url}/creation`);
  };

  return (
    <S.UseTicketDefinitionDisplayPage>
      <Head title="이용권 관리">
        <SimpleButton
          extraStyle={extraStyle}
          onClick={handleUseTicketCreationClick}
        >
          + 이용권 생성
        </SimpleButton>
      </Head>

      <UseTicketDefinitionListContainer />
    </S.UseTicketDefinitionDisplayPage>
  );
}

export default UseTicketDefinitionDisplayPage;

const extraStyle = {
  width: "150px",
  height: "40px",
  fontSize: "1rem",
};

const S = {
  UseTicketDefinitionDisplayPage: styled.div``,
};
