export type HtmlToMarkdown = ({ html, camelCaseReference }: {
    html: string;
    camelCaseReference?: boolean | undefined;
}) => string;
