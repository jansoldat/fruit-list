/**
 * @type {import('@sly-cli/sly/dist').Transformer}
 */
export default function transformIcon(input, meta) {
    input = prependLicenseInfo(input, meta);
    return input;
}
function prependLicenseInfo(input, meta) {
    return [
        `<!-- Downloaded from ${meta.name} -->`,
        `<!-- License ${meta.license} -->`,
        `<!-- ${meta.source} -->`,
        input,
    ].join('\n');
}
