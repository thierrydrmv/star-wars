import { render } from "@testing-library/react";
import STARWARSProvider from "../context/STARWARSProvider";

function RenderWithProvider(children){
  return (
    render(
      <STARWARSProvider>
        {children}
      </STARWARSProvider>
    )
  )
}

export default RenderWithProvider;