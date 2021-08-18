import React from "react";
import { Route } from "react-router-dom";
export default function PrivateRoute({ component: Component, ...rest }: any) {
  return <Route render={(props) => <Component {...props} />} {...rest} />;
}
