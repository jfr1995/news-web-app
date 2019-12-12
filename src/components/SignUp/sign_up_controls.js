import React from "react";
import { styled } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const formStyle = {
  width: "100vh",

  borderRadius: "10px"
};
const MyForm = styled(FormControl)(formStyle);

export default MyForm;
