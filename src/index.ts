/**
 * Copyright 2024 oribe1115
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// POST {GASのデプロイURL}/exec/{path} の形式でリクエストされる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e: GoogleAppsScript.Events.DoPost) {
  const path = e.pathInfo;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let res: any;

  switch (path) {
    case 'register':
      // TODO
      break;
    case 'form-submit':
      // TODO
      break;
    default:
      res = {
        error: `unexpected URI: ${path}`,
      };
      break;
  }

  return ContentService.createTextOutput(res).setMimeType(
    ContentService.MimeType.JSON
  );
}
