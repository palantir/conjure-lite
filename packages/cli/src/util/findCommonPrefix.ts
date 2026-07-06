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

export function findCommonPrefix(strings: Array<string>) {
  const splitStrings = strings.map(s => s.split("."));

  for (let i = 0; i < splitStrings[0].length; i++) {
    for (let j = 1; j < splitStrings.length; j++) {
      if (splitStrings[0][i] != splitStrings[j][i]) {
        return splitStrings[0].slice(0, i).join(".");
      }
    }
  }
  return strings[0];
}
