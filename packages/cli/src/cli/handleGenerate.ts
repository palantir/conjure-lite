/*
 * Copyright 2026 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type * as ConjureApi from "conjure-api";
import * as fs from "node:fs";
import * as path from "node:path";
import { CodeGen } from "../codegen/CodeGen.js";
import { conjureYamlToIrFromFile } from "../conjureYamlToIr/conjureYamlToIr.js";
import type { HandleGenerateArgs } from "./HandleGenerateArgs.js";

export async function handleGenerate(args: HandleGenerateArgs) {
  let ir: ConjureApi.IConjureDefinition;

  const inputPath = args.in;
  const ext = path.extname(inputPath).toLowerCase();

  if (ext === ".yml" || ext === ".yaml") {
    // Convert YAML to IR
    ir = conjureYamlToIrFromFile(inputPath);

    // Write the generated IR JSON file to the output directory
    const irOutputPath = path.join(args.outDir, "generated-ir.json");
    await fs.promises.mkdir(args.outDir, { recursive: true });
    await fs.promises.writeFile(irOutputPath, JSON.stringify(ir, null, 2), "utf-8");
  } else {
    // Assume JSON format
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ir = JSON.parse(
      await fs.promises.readFile(inputPath, "utf-8"),
    );
  }

  const codeGen = new CodeGen(ir, args);
  await codeGen.generate();
}
