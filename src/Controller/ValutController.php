<?php

namespace App\Controller;

use App\Repository\ValutRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Folder;

class ValutController extends AbstractController
{
    #[Route('/api/valuts', name: 'api_valuts', methods: ['GET'])]
    #[Route('/api/valuts/folder/{folderId}', name: 'api_valuts_by_folder', methods: ['GET'])]
    public function getValuts(Request $request, ValutRepository $valutRepository, $folderId = null): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json([], 401);
        }

        if ($folderId !== null) {
            $valuts = $valutRepository->findBy(['folder' => $folderId, 'owner' => $user]);
        } else {
            $valuts = $valutRepository->findBy(['folder' => null, 'owner' => $user]);
        }

        $data = array_map(function($valut) {
            return [
                'id' => (string)$valut->getId(),
                'name' => $valut->getName(),
                'email' => $valut->getEmail(),
                'password' => $valut->getPassword(),
                'description' => $valut->getDescription(),
                'customFields' => array_map(function($field) {
                    return [
                        'name' => $field['name'],
                        'value' => $field['value'],
                    ];
                }, $valut->getCustomFields() ?? []),
                'folderId' => $valut->getFolder() ? (string)$valut->getFolder()->getId() : null,
            ];
        }, $valuts);
        return $this->json($data);
    }

    #[Route('/api/valuts', name: 'api_valuts_post', methods: ['POST'])]
    public function createValut(Request $request, ValutRepository $valutRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $valut = new \App\Entity\Valut();
        $valut->setName($data['name'] ?? '');
        $valut->setEmail($data['email'] ?? '');
        $valut->setPassword($data['password'] ?? '');
        if (isset($data['description'])) {
            $valut->setDescription($data['description']);
        }
        if (isset($data['folderId'])) {
            $folderRepo = $em->getRepository(Folder::class);
            $folder = $folderRepo->find($data['folderId']);
            if ($folder) {
                $valut->setFolder($folder);
            }
        }
        if (isset($data['customFields'])) {
            $valut->setCustomFields($data['customFields']);
        }
    
        $user = $this->getUser();
        if ($user) {
            $valut->setOwner($user);
        }

        $em->persist($valut);
        $em->flush();
        return $this->json([
            'id' => (string)$valut->getId(),
            'name' => $valut->getName(),
            'email' => $valut->getEmail(),
            'password' => $valut->getPassword(),
            'description' => $valut->getDescription(),
            'customFields' => array_map(function($field) {
                return [
                    'name' => $field['name'],
                    'value' => $field['value'],
                ];
            }, $valut->getCustomFields() ?? []),
            'folderId' => $valut->getFolder() ? (string)$valut->getFolder()->getId() : null,
        ], 201);
    }

    #[Route('/api/valuts/{id}', name: 'api_valuts_patch', methods: ['PATCH'])]
    public function patchValut($id, Request $request, ValutRepository $valutRepository, EntityManagerInterface $em): JsonResponse
    {
        $valut = $valutRepository->find($id);
        if (!$valut) {
            return $this->json(['error' => 'Valut not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $valut->setName($data['name']);
        }
        if (isset($data['email'])) {
            $valut->setEmail($data['email']);
        }
        if (isset($data['password'])) {
            $valut->setPassword($data['password']);
        }
        if (isset($data['description'])) {
            $valut->setDescription($data['description']);
        }
        if (isset($data['customFields'])) {
            $valut->setCustomFields($data['customFields']);
        }
        if (isset($data['folderId'])) {
            $folderRepo = $em->getRepository(\App\Entity\Folder::class);
            $folder = $folderRepo->find($data['folderId']);
            $valut->setFolder($folder ?: null);
        }

        $em->persist($valut);
        $em->flush();

        return $this->json([
            'id' => (string)$valut->getId(),
            'name' => $valut->getName(),
            'email' => $valut->getEmail(),
            'password' => $valut->getPassword(),
            'description' => $valut->getDescription(),
            'customFields' => array_map(function($field) {
                return [
                    'name' => $field['name'],
                    'value' => $field['value'],
                ];
            }, $valut->getCustomFields() ?? []),
            'folderId' => $valut->getFolder() ? (string)$valut->getFolder()->getId() : null,
        ]);
    }
}
