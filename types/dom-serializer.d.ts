declare module 'dom-serializer' {
   import type { Node } from 'htmlparser2';

   export interface SerializerOptions {
      /** When false, text data is written out verbatim rather than re-encoded. */
      decodeEntities?: boolean;
      xmlMode?: boolean;
      selfClosingTags?: boolean;
      emptyAttrs?: boolean;
   }

   export default function serialize(
      dom: Node | Node[],
      options?: SerializerOptions,
   ): string;
}
