import React from "react";
import styled from "styled-components";

function Form({ fields, bottom, onSubmit }) {
  const _onSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit();
  };

  return (
    <S.Form onSubmit={_onSubmit}>
      <div className="fields">{fields}</div>
      <div className="bottom">{bottom}</div>
    </S.Form>
  );
}

export default Form;

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
