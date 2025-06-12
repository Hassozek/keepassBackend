<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Folder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class FolderDataPersister implements ProcessorInterface
{
    private EntityManagerInterface $em;
    private Security $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($data instanceof Folder && null === $data->getOwner()) {
            $user = $this->security->getUser();
            if ($user) {
                $data->setOwner($user);
            }
        }
        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }
}
