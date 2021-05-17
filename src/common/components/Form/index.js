import React, { useCallback } from "react";
import styled from "styled-components";

function Form({ fieldComponents, bottom, onSubmit }) {
  const _onSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit && onSubmit();
  }, []);

  return (
    <S.Form onSubmit={_onSubmit}>
      <div className="fields">{fieldComponents}</div>
      <div className="bottom">{bottom}</div>
    </S.Form>
  );
}

export default React.memo(Form);

const S = {
  Form: styled.form`
    .fields {
    }

    .bottom {
      display: flex;
      justify-content: flex-end;
      margin-top: 12vh;
    }
  `,
};
