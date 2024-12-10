import { partial } from "filesize";

/**
 * Formats filesize as KiB/MiB/...
 */
export const filesize = partial({ base: 2 });

/**
 * Determines if a file is an archive
 * @param ext File extension
 * @returns boolean
 */
export const isArchive = (ext: string) => {
    const zip_exts = [
      ".zip",
      ".bz2",
      ".br",
      ".tbz2",
      ".gz",
      ".xz",
      ".rar",
      ".tar",
    ];
    return zip_exts.indexOf(ext) > -1;
  };