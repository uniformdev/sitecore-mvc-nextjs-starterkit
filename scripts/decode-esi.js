const replace = require('replace-in-file');
const { createEsiOpenTagsRegExp, decodeEsiOpenTag, getBoolEnv, } = require('@uniformdev/common');

const outputDir = process.argv[2];
if (!outputDir) {
    throw 'decode-esi: output directory is not specified';
}

if (!getBoolEnv(process.env, 'UNIFORM_OPTIONS_ESI', false)) {
    console.log('Decoding ESI is skipped because UNIFORM_OPTIONS_ESI is false');

    return;
}

let results = replace.sync({
    files: outputDir + '/**/index.html',
    from: (file) => createEsiOpenTagsRegExp(),
    to: (match) => decodeEsiOpenTag(match),
});
