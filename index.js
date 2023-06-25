#!/usr/bin/env node

import { argv } from "node:process";

console.info(
  "Hello, world! The first two parameters you gave me are:",
  argv[2],
  argv[3]
);
