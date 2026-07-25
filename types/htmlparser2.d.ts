declare module 'htmlparser2' {
   export interface ParserOptions {
      /** Adds DOM Level 1 accessors (`nodeType`, `firstChild`, …) to nodes. */
      withDomLvl1?: boolean;
      normalizeWhitespace?: boolean;
      xmlMode?: boolean;
      /** When false, entity references are left verbatim in text data. */
      decodeEntities?: boolean;
   }

   interface NodeCommon {
      parent: ContainerNode | null;
      prev: Node | null;
      next: Node | null;
   }

   export interface TextNode extends NodeCommon {
      type: 'text';
      data: string;
   }

   export interface CommentNode extends NodeCommon {
      type: 'comment';
      data: string;
   }

   export interface DirectiveNode extends NodeCommon {
      type: 'directive';
      name: string;
      data: string;
   }

   export interface ElementNode extends NodeCommon {
      type: 'tag' | 'script' | 'style';
      name: string;
      attribs: Record<string, string | undefined>;
      children: Node[];
   }

   export interface CdataNode extends NodeCommon {
      type: 'cdata';
      children: Node[];
   }

   /** Any node which can have children. */
   export type ContainerNode = ElementNode | CdataNode;

   export type Node = TextNode | CommentNode | DirectiveNode | ContainerNode;

   /**
      htmlparser2@3 is CommonJS and builds its exports object with getters, so
      `cjs-module-lexer` cannot see through to named exports: it must be
      imported via the default export.
    */
   const htmlparser2: {
      parseDOM(html: string, options?: ParserOptions): Node[];
   };

   export default htmlparser2;
}
