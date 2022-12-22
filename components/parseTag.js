let tagName, action;

export default function parseTag(tag, msg = null) {
  tagName = tag;
  msg != null ? (action = msg) : null;
  return tag;
}

export { tagName, action };
