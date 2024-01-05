import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export const ShowAlert = ({ variant , text }) => {
  return (
    <Alert variant={variant} dismissible>
      {text}
    </Alert>
  );
};
