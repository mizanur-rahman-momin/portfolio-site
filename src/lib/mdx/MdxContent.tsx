import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";
import { getMdxOptions } from "./options";

type MdxContentProps = {
  source: string;
  /** Content-relative directory of the file, used to resolve ./images paths. */
  baseDir: string;
};

/** Renders an MDX document as a React Server Component. */
export async function MdxContent({ source, baseDir }: MdxContentProps) {
  return (
    <MDXRemote source={source} components={mdxComponents} options={getMdxOptions({ baseDir })} />
  );
}
