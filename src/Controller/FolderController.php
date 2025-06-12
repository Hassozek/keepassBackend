<?php

namespace App\Controller;

use App\Repository\FolderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Folder;

class FolderController extends AbstractController
{
    #[Route('/api/folders', name: 'api_folders', methods: ['GET'])]
    #[Route('/api/folders/parent/{parentId}', name: 'api_folders_by_parent', methods: ['GET'])]
    public function getFolders(Request $request, FolderRepository $folderRepository, $parentId = null): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json([], 200);
        }
        $folders = $folderRepository->findBy(['owner' => $user]);
        $data = array_map(function ($folder) {
            return [
                'id' => (string)$folder->getId(),
                'name' => $folder->getName(),
                'parentId' => $folder->getParent() ? (string)$folder->getParent()->getId() : null,
            ];
        }, $folders);
        return $this->json($data);
    }

    #[Route('/api/folders', name: 'api_folders_post', methods: ['POST'])]
    public function createFolder(Request $request, FolderRepository $folderRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $folder = new Folder();
        $folder->setName($data['name'] ?? '');
        if (isset($data['parentId'])) {
            $parent = $folderRepository->find($data['parentId']);
            if ($parent) {
                $folder->setParent($parent);
            }
        }
        $user = $this->getUser();
        if ($user) {
            $folder->setOwner($user);
        }

        $em->persist($folder);
        $em->flush();
        return $this->json([
            'id' => (string)$folder->getId(),
            'name' => $folder->getName(),
            'parentId' => $folder->getParent() ? (string)$folder->getParent()->getId() : null,
        ], 201);
    }

    #[Route('/api/folders/{id}', name: 'api_folders_patch', methods: ['PATCH'])]
    public function patchFolder($id, Request $request, FolderRepository $folderRepository, EntityManagerInterface $em): JsonResponse
    {
        $folder = $folderRepository->find($id);
        if (!$folder) {
            return $this->json(['error' => 'Folder not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $folder->setName($data['name']);
        }
        if (array_key_exists('parentId', $data)) {
            if ($data['parentId'] === null) {
                $folder->setParent(null);
            } else {
                $parent = $folderRepository->find($data['parentId']);
                if ($parent) {
                    $folder->setParent($parent);
                }
            }
        }

        $em->persist($folder);
        $em->flush();

        return $this->json([
            'id' => (string)$folder->getId(),
            'name' => $folder->getName(),
            'parentId' => $folder->getParent() ? (string)$folder->getParent()->getId() : null,
        ]);
    }
}
