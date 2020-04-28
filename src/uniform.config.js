module.exports = function() {
    process.env.PORT = process.env.PORT || '3000';
    process.env.UNIFORM_API_SITENAME = 'Habitat';
    process.env.UNIFORM_API_URL = 'https://habitatuniform.blob.core.windows.net/data'; // when 'next export' there is no logic that UNIFORM_API_URL := UNIFORM_DATA_URL
    process.env.UNIFORM_DATA_URL = 'ignored';
    process.env.UNIFORM_OPTIONS_MVC_SUPPORT = 'true';
    process.env.UNIFORM_OPTIONS_MVC_SPA_ENABLED = 'false';
    process.env.UNIFORM_OPTIONS_MVC_MODE = 'mvconly';
    process.env.UNIFORM_PUBLISH_TARGET = 'none',
    process.env.UNIFORM_API_TOKEN = process.env.UNIFORM_API_TOKEN || '1234';
    process.env.UNIFORM_EXPORT_PREFETCH_ENABLED = 'false';
    process.env.UNIFORM_MODE = 'mixed';
    process.env.UNIFORM_PUBLISH_FAKE_PUBLIC_URL = 'http://localhost:1234';
    process.env.UNIFORM_PUBLISH_PREFETCH_REQUEST_TIMEOUT = '10000';
}
