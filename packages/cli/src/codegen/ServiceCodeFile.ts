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

import type { IServiceDefinition } from "conjure-api";
import { generatorFactory } from "./generatorFactory.js";

export const serviceCodeGenerator = generatorFactory<IServiceDefinition>(
  async function() {
    let source = "";
    for (const def of this.defs) {
      source += def.endpoints.map(e =>
        `export { ${e.endpointName} } from "${
          this.getImportModuleSpecifier(this.codeGen.getEndpointPath(def, e))
        }"`
      ).join("\n");
    }

    await this.writeFile(source);
  },
);
