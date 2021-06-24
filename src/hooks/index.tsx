import { useContext } from "react";
import { LRContext, LRContextOptions } from "../LRContext";

const useLRAuth = (): LRContextOptions =>
  useContext(LRContext) as LRContextOptions;

export default useLRAuth;
