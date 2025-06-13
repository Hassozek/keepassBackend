<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/folders' => [[['_route' => '_api_/folders_get_collection', '_controller' => 'App\\Controller\\FolderController::getFolders', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Folder', '_api_operation_name' => '_api_/folders_get_collection'], null, ['GET' => 0], null, false, false, null]],
        '/api/valuts' => [
            [['_route' => '_api_/valuts_get_collection', '_controller' => 'App\\Controller\\ValutController::getValuts', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Valut', '_api_operation_name' => '_api_/valuts_get_collection'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_valuts', '_controller' => 'App\\Controller\\ValutController::getValuts'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_valuts_post', '_controller' => 'App\\Controller\\ValutController::createValut'], null, ['POST' => 0], null, false, false, null],
        ],
        '/_wdt/styles' => [[['_route' => '_wdt_stylesheet', '_controller' => 'web_profiler.controller.profiler::toolbarStylesheetAction'], null, null, null, false, false, null]],
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/xdebug' => [[['_route' => '_profiler_xdebug', '_controller' => 'web_profiler.controller.profiler::xdebugAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/auth' => [[['_route' => 'auth'], null, ['POST' => 0], null, false, false, null]],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\UserController::register'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api(?'
                    .'|/(?'
                        .'|docs(?:\\.([^/]++))?(*:37)'
                        .'|\\.well\\-known/genid/([^/]++)(*:72)'
                        .'|validation_errors/([^/]++)(*:105)'
                    .')'
                    .'|(?:/(index)(?:\\.([^/]++))?)?(*:142)'
                    .'|/(?'
                        .'|contexts/([^.]+)(?:\\.(jsonld))?(*:185)'
                        .'|errors/(\\d+)(?:\\.([^/]++))?(*:220)'
                        .'|val(?'
                            .'|idation_errors/([^/]++)(?'
                                .'|(*:260)'
                            .')'
                            .'|uts/(?'
                                .'|([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:304)'
                                .')'
                                .'|folder(?:/([^/]++))?(*:333)'
                                .'|([^/]++)(*:349)'
                            .')'
                        .')'
                        .'|folders(?'
                            .'|/([^/\\.]++)(?:\\.([^/]++))?(*:395)'
                            .'|(?:\\.([^/]++))?(*:418)'
                            .'|/(?'
                                .'|([^/\\.]++)(?:\\.([^/]++))?(?'
                                    .'|(*:458)'
                                .')'
                                .'|parent(?:/([^/]++))?(*:487)'
                                .'|([^/]++)(*:503)'
                            .')'
                            .'|(*:512)'
                        .')'
                        .'|users/([^/\\.]++)(?:\\.([^/]++))?(*:552)'
                    .')'
                .')'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:593)'
                    .'|wdt/([^/]++)(*:613)'
                    .'|profiler/(?'
                        .'|font/([^/\\.]++)\\.woff2(*:655)'
                        .'|([^/]++)(?'
                            .'|/(?'
                                .'|search/results(*:692)'
                                .'|router(*:706)'
                                .'|exception(?'
                                    .'|(*:726)'
                                    .'|\\.css(*:739)'
                                .')'
                            .')'
                            .'|(*:749)'
                        .')'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        37 => [[['_route' => 'api_doc', '_controller' => 'api_platform.action.documentation', '_format' => '', '_api_respond' => 'true'], ['_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        72 => [[['_route' => 'api_genid', '_controller' => 'api_platform.action.not_exposed', '_api_respond' => 'true'], ['id'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        105 => [[['_route' => 'api_validation_errors', '_controller' => 'api_platform.action.not_exposed'], ['id'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        142 => [[['_route' => 'api_entrypoint', '_controller' => 'api_platform.action.entrypoint', '_format' => '', '_api_respond' => 'true', 'index' => 'index'], ['index', '_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        185 => [[['_route' => 'api_jsonld_context', '_controller' => 'api_platform.jsonld.action.context', '_format' => 'jsonld', '_api_respond' => 'true'], ['shortName', '_format'], ['GET' => 0, 'HEAD' => 1], null, false, true, null]],
        220 => [[['_route' => '_api_errors', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => null, '_api_resource_class' => 'ApiPlatform\\State\\ApiResource\\Error', '_api_operation_name' => '_api_errors'], ['status', '_format'], ['GET' => 0], null, false, true, null]],
        260 => [
            [['_route' => '_api_validation_errors_problem', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => null, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_problem'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_hydra', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => null, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_hydra'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_validation_errors_jsonapi', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => null, '_api_resource_class' => 'ApiPlatform\\Validator\\Exception\\ValidationException', '_api_operation_name' => '_api_validation_errors_jsonapi'], ['id'], ['GET' => 0], null, false, true, null],
        ],
        304 => [
            [['_route' => '_api_/valuts/{id}{._format}_get', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Valut', '_api_operation_name' => '_api_/valuts/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null],
            [['_route' => '_api_/valuts/{id}{._format}_delete', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Valut', '_api_operation_name' => '_api_/valuts/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
            [['_route' => '_api_/valuts/{id}{._format}_patch', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Valut', '_api_operation_name' => '_api_/valuts/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
        ],
        333 => [[['_route' => 'api_valuts_by_folder', 'folderId' => null, '_controller' => 'App\\Controller\\ValutController::getValuts'], ['folderId'], ['GET' => 0], null, false, true, null]],
        349 => [[['_route' => 'api_valuts_patch', '_controller' => 'App\\Controller\\ValutController::patchValut'], ['id'], ['PATCH' => 0], null, false, true, null]],
        395 => [[['_route' => '_api_/folders/{id}{._format}_get', '_controller' => 'api_platform.action.not_exposed', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Folder', '_api_operation_name' => '_api_/folders/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        418 => [[['_route' => '_api_/folders{._format}_post', '_controller' => 'App\\Controller\\FolderController::createFolder', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Folder', '_api_operation_name' => '_api_/folders{._format}_post'], ['_format'], ['POST' => 0], null, false, true, null]],
        458 => [
            [['_route' => '_api_/folders/{id}{._format}_delete', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Folder', '_api_operation_name' => '_api_/folders/{id}{._format}_delete'], ['id', '_format'], ['DELETE' => 0], null, false, true, null],
            [['_route' => '_api_/folders/{id}{._format}_patch', '_controller' => 'api_platform.symfony.main_controller', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\Folder', '_api_operation_name' => '_api_/folders/{id}{._format}_patch'], ['id', '_format'], ['PATCH' => 0], null, false, true, null],
        ],
        487 => [[['_route' => 'api_folders_by_parent', 'parentId' => null, '_controller' => 'App\\Controller\\FolderController::getFolders'], ['parentId'], ['GET' => 0], null, false, true, null]],
        503 => [[['_route' => 'api_folders_patch', '_controller' => 'App\\Controller\\FolderController::patchFolder'], ['id'], ['PATCH' => 0], null, false, true, null]],
        512 => [
            [['_route' => 'api_folders', '_controller' => 'App\\Controller\\FolderController::getFolders'], [], ['GET' => 0], null, false, false, null],
            [['_route' => 'api_folders_post', '_controller' => 'App\\Controller\\FolderController::createFolder'], [], ['POST' => 0], null, false, false, null],
        ],
        552 => [[['_route' => '_api_/users/{id}{._format}_get', '_controller' => 'api_platform.action.not_exposed', '_format' => null, '_stateless' => true, '_api_resource_class' => 'App\\Entity\\User', '_api_operation_name' => '_api_/users/{id}{._format}_get'], ['id', '_format'], ['GET' => 0], null, false, true, null]],
        593 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        613 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        655 => [[['_route' => '_profiler_font', '_controller' => 'web_profiler.controller.profiler::fontAction'], ['fontName'], null, null, false, false, null]],
        692 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        706 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        726 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        739 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        749 => [
            [['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
