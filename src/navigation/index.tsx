import { useState } from "react";
import AppStack from "./stacks/app";

type Props = {
  isAuthenticated: boolean;
  requiresBiometrics: boolean;
};


export const Navigation = ({isAuthenticated, requiresBiometrics}: Props) => {

    return <AppStack isAuthenticated={isAuthenticated} requiresBiometrics={requiresBiometrics} />;
} 