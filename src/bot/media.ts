import { Context } from "telegraf";
import { getMessageFromFile } from "../parsers/message";
import { getScreenshots } from "../parsers/screenshots";

export function getMediaGroup(): Parameters<Context["replyWithMediaGroup"]>[0] {
  const message = getMessageFromFile();
  const screenshots = getScreenshots();

  return screenshots.map((source, index) => {
    return {
      media: { source },
      type: "photo",
      caption: index === 0 ? message : undefined,
    };
  });
}
