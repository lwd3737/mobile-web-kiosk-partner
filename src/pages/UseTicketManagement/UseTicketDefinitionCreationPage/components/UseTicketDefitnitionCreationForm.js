import React, { useCallback, useMemo } from "react";

import { Form, FormField, SimpleButton } from "common/components";

function UseTicketDefinitionCreationForm({
  fields,
  onInputChange,
  onPrevClick,
  onCreationClick,
}) {
  const renderFields = useCallback(() => {
    return fields.map((field) => (
      <FormField key={field.inputId} {...field} onChange={onInputChange} />
    ));
  }, [fields]);

  const renderBottom = useMemo(() => {
    return (
      <>
        <SimpleButton
          className="prev-btn"
          backgroundColor={"gray1"}
          onClick={onPrevClick}
        >
          이전
        </SimpleButton>
        <SimpleButton
          className="next-btn"
          extraStyle={{
            marginLeft: "20px",
          }}
          onClick={onCreationClick}
        >
          생성
        </SimpleButton>
      </>
    );
  }, []);

  return <Form fields={renderFields()} bottom={renderBottom()} />;
}

export default UseTicketDefinitionCreationForm;
