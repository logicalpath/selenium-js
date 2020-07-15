"use strict";
import * as faker from "faker";
import * as fs from "fs";
import * as dotenv from "dotenv";

interface IAPIParams {
  endpoint: string;
  httpMethod?: "GET" | "POST";
  data?: any;
  options?: any;
  token?: any;
}

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
