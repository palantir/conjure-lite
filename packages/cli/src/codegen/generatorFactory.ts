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
import { BaseFileGenerator } from "./BaseFileGenerator.js";
import type { CodeGen } from "./CodeGen.js";

export function generatorFactory<
  T extends
    | ConjureApi.IServiceDefinition
    | ConjureApi.IEndpointDefinition
    | ConjureApi.ITypeDefinition
    | { packageName: string },
>(
  generateFunction: (this: BaseFileGenerator<T>) => Promise<void>,
): (filePath: string, codeGen: CodeGen, def: T | T[], includeZod: boolean) => () => Promise<void> {
  return (filePath: string, codeGen: CodeGen, def: T | T[], includeZod: boolean) => {
    return async () => {
      const base = new BaseFileGenerator(filePath, codeGen, def, includeZod);
      await generateFunction.apply(base);
    };
  };
}
