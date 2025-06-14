<?php

namespace ContainerWBlzz23;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getApiPlatform_Openapi_CommandService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'api_platform.openapi.command' shared service.
     *
     * @return \ApiPlatform\OpenApi\Command\OpenApiCommand
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/console/Command/Command.php';
        include_once \dirname(__DIR__, 4).'/vendor/api-platform/core/src/OpenApi/Command/OpenApiCommand.php';

        $container->privates['api_platform.openapi.command'] = $instance = new \ApiPlatform\OpenApi\Command\OpenApiCommand(($container->privates['lexik_jwt_authentication.api_platform.openapi.factory'] ?? $container->load('getLexikJwtAuthentication_ApiPlatform_Openapi_FactoryService')), ($container->privates['debug.serializer'] ?? self::getDebug_SerializerService($container)));

        $instance->setName('api:openapi:export');

        return $instance;
    }
}
