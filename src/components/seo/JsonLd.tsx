type JsonLdProps = {
  /** One or more schema.org objects. Each is emitted as its own script tag. */
  data: object | object[];
};

/**
 * Renders JSON-LD structured data.
 *
 * Structured data is only added where it accurately describes visible page
 * content, so this component stays a thin, explicit wrapper.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify output is escaped to avoid breaking out of the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
