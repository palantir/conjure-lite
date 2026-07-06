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

import { describe, expect, it } from "vitest";
import { Widget } from "./generated/widget/__components.js";

describe("Zod Schema Generation", () => {
  it("throw with bad data", async () => {
    expect(() =>
      Widget.parse({
        bad: "data",
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "expected": "boolean",
          "code": "invalid_type",
          "path": [
            "dash-separated"
          ],
          "message": "Invalid input: expected boolean, received undefined"
        },
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            "description"
          ],
          "message": "Invalid input: expected string, received undefined"
        },
        {
          "code": "invalid_union",
          "errors": [
            [
              {
                "code": "invalid_value",
                "values": [
                  "FOO"
                ],
                "path": [],
                "message": "Invalid input: expected \\"FOO\\""
              }
            ],
            [
              {
                "code": "invalid_value",
                "values": [
                  "BAR"
                ],
                "path": [],
                "message": "Invalid input: expected \\"BAR\\""
              }
            ]
          ],
          "path": [
            "exampleEnum"
          ],
          "message": "Invalid input"
        }
      ]]
    `);
  });

  it("should parse valid data", async () => {
    const validData = {
      "dash-separated": true,
      description: "This is a valid description",
      exampleEnum: "FOO", // or "BAR"
    };
    expect(() => Widget.parse(validData)).not.toThrow();
    const parsed = Widget.parse(validData);
    expect(parsed).toEqual(validData);
  });
});
