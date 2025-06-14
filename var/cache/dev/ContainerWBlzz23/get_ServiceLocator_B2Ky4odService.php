<?php

namespace ContainerWBlzz23;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_B2Ky4odService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.b2Ky4od' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.b2Ky4od'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'kernel::registerContainerConfiguration' => ['privates', '.service_locator.zHyJIs5.kernel::registerContainerConfiguration()', 'get_ServiceLocator_ZHyJIs5_KernelregisterContainerConfigurationService', true],
            'App\\Kernel::registerContainerConfiguration' => ['privates', '.service_locator.zHyJIs5.kernel::registerContainerConfiguration()', 'get_ServiceLocator_ZHyJIs5_KernelregisterContainerConfigurationService', true],
            'kernel::loadRoutes' => ['privates', '.service_locator.zHyJIs5.kernel::loadRoutes()', 'get_ServiceLocator_ZHyJIs5_KernelloadRoutesService', true],
            'App\\Kernel::loadRoutes' => ['privates', '.service_locator.zHyJIs5.kernel::loadRoutes()', 'get_ServiceLocator_ZHyJIs5_KernelloadRoutesService', true],
            'App\\Controller\\FolderController::getFolders' => ['privates', '.service_locator.KI0gtOV.App\\Controller\\FolderController::getFolders()', 'getFolderControllergetFoldersService', true],
            'App\\Controller\\FolderController::createFolder' => ['privates', '.service_locator.SLNq2Zt.App\\Controller\\FolderController::createFolder()', 'getFolderControllercreateFolderService', true],
            'App\\Controller\\UserController::register' => ['privates', '.service_locator.tzOXNm_.App\\Controller\\UserController::register()', 'getUserControllerregisterService', true],
            'App\\Controller\\ValutController::getValuts' => ['privates', '.service_locator.61wxOCo.App\\Controller\\ValutController::getValuts()', 'getValutControllergetValutsService', true],
            'App\\Controller\\ValutController::createValut' => ['privates', '.service_locator.ORyGLnl.App\\Controller\\ValutController::createValut()', 'getValutControllercreateValutService', true],
            'kernel:registerContainerConfiguration' => ['privates', '.service_locator.zHyJIs5.kernel::registerContainerConfiguration()', 'get_ServiceLocator_ZHyJIs5_KernelregisterContainerConfigurationService', true],
            'kernel:loadRoutes' => ['privates', '.service_locator.zHyJIs5.kernel::loadRoutes()', 'get_ServiceLocator_ZHyJIs5_KernelloadRoutesService', true],
            'App\\Controller\\FolderController:getFolders' => ['privates', '.service_locator.KI0gtOV.App\\Controller\\FolderController::getFolders()', 'getFolderControllergetFoldersService', true],
            'App\\Controller\\FolderController:createFolder' => ['privates', '.service_locator.SLNq2Zt.App\\Controller\\FolderController::createFolder()', 'getFolderControllercreateFolderService', true],
            'App\\Controller\\UserController:register' => ['privates', '.service_locator.tzOXNm_.App\\Controller\\UserController::register()', 'getUserControllerregisterService', true],
            'App\\Controller\\ValutController:getValuts' => ['privates', '.service_locator.61wxOCo.App\\Controller\\ValutController::getValuts()', 'getValutControllergetValutsService', true],
            'App\\Controller\\ValutController:createValut' => ['privates', '.service_locator.ORyGLnl.App\\Controller\\ValutController::createValut()', 'getValutControllercreateValutService', true],
        ], [
            'kernel::registerContainerConfiguration' => '?',
            'App\\Kernel::registerContainerConfiguration' => '?',
            'kernel::loadRoutes' => '?',
            'App\\Kernel::loadRoutes' => '?',
            'App\\Controller\\FolderController::getFolders' => '?',
            'App\\Controller\\FolderController::createFolder' => '?',
            'App\\Controller\\UserController::register' => '?',
            'App\\Controller\\ValutController::getValuts' => '?',
            'App\\Controller\\ValutController::createValut' => '?',
            'kernel:registerContainerConfiguration' => '?',
            'kernel:loadRoutes' => '?',
            'App\\Controller\\FolderController:getFolders' => '?',
            'App\\Controller\\FolderController:createFolder' => '?',
            'App\\Controller\\UserController:register' => '?',
            'App\\Controller\\ValutController:getValuts' => '?',
            'App\\Controller\\ValutController:createValut' => '?',
        ]);
    }
}
