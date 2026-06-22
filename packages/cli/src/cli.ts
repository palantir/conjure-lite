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

import type { CommandModule } from "yargs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { HandleGenerateArgs } from "./cli/HandleGenerateArgs.js";
import type {} from "node:process";
import { handleGenerate } from "./cli/handleGenerate.js";

/**
 * Entry point for the CLI.
 * @public
 */
export async function cli() {
  const generate: CommandModule<object, HandleGenerateArgs> = {
    command: "generate",
    describe: "Generate code from IR",
    builder: (yargs) => {
      return yargs.options({
        outDir: {
          type: "string",
          required: true,
        },
        in: {
          alias: "ir",
          type: "string",
          required: true,
          description: "Path to IR JSON file or Conjure YAML file",
        },
        includeExtensions: {
          type: "boolean",
          default: true,
        },
        zod: {
          type: "boolean",
          default: false,
          description: "Generate Zod schemas",
        },
        header: {
          type: "string",
        },
      });
    },
    handler: handleGenerate,
  };

  await yargs(hideBin(process.argv))
    .command(generate).demandCommand().parseAsync();
}
