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

type UnionTypeInner_<Q extends { type: K }, K extends string> =
  (Q extends any ? (Q & { [KK in K]: KK extends keyof Q ? Q[KK] : never })
    : "wm[")[K];
export type UnionTypeInner<Q extends { type: string }> = UnionTypeInner_<Q, Q["type"]>;

export function drillIntoUnion<Q extends { type: string }>(
  conjureUnion: Q,
): UnionTypeInner<Q> {
  return (conjureUnion as any)[conjureUnion.type] as UnionTypeInner<Q>;
}
