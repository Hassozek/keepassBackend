<?php

namespace ContainerXxKThnb;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_ORyGLnlService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.ORyGLnl' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.ORyGLnl'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'valutRepository' => ['privates', 'App\\Repository\\ValutRepository', 'getValutRepositoryService', true],
            'em' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', false],
        ], [
            'valutRepository' => 'App\\Repository\\ValutRepository',
            'em' => '?',
        ]);
    }
}
