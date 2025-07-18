import React, { Fragment } from "react";
import { StyleLoader, StyleLoaderWrapper } from "./style";

const Loader = () => {
  return (
    <Fragment>
      <StyleLoaderWrapper>
        <StyleLoader />
      </StyleLoaderWrapper>
    </Fragment>
  );
};

export default Loader;
