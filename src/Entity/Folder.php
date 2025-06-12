<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\{GetCollection, Post, Delete, Patch};
use App\Controller\FolderController;
use App\Repository\FolderRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FolderRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/folders',
            controller: FolderController::class . '::getFolders',
            extraProperties: [
                'openapi' => [
                    'parameters' => [
                        [
                            'name' => 'parentId',
                            'in' => 'path',
                            'required' => false,
                            'schema' => ['type' => 'string'],
                            'description' => 'Parent folder id. If not provided, returns root folders.'
                        ]
                    ],
                    'responses' => [
                        '200' => [
                            'description' => 'Returns a list of folders',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'array',
                                        'items' => [
                                            'type' => 'object',
                                            'properties' => [
                                                'id' => ['type' => 'string'],
                                                'name' => ['type' => 'string'],
                                                'parentId' => ['type' => 'string'],
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ),
        new Post(
            controller: FolderController::class . '::createFolder',
            extraProperties: [
                'openapi' => [
                    'requestBody' => [
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'name' => ['type' => 'string'],
                                        'parentId' => ['type' => 'string'],
                                    ],
                                    'required' => ['name']
                                ]
                            ]
                        ]
                    ],
                    'responses' => [
                        '201' => [
                            'description' => 'Folder created',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'string'],
                                            'name' => ['type' => 'string'],
                                            'parentId' => ['type' => 'string'],
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ),
        new Delete(),
        new Patch(
            extraProperties: [
                'openapi' => [
                    'requestBody' => [
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'name' => ['type' => 'string'],
                                        'parentId' => ['type' => 'string'],
                                    ]
                                ]
                            ]
                        ]
                    ],
                    'responses' => [
                        '200' => [
                            'description' => 'Folder updated',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'string'],
                                            'name' => ['type' => 'string'],
                                            'parentId' => ['type' => 'string'],
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        )
    ]
)]
class Folder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: Folder::class, inversedBy: 'children')]
    private ?Folder $parent = null;

    #[ORM\OneToMany(mappedBy: 'parent', targetEntity: Folder::class, cascade: ['persist', 'remove'])]
    private Collection $children;

    #[ORM\OneToMany(mappedBy: 'folder', targetEntity: Valut::class, cascade: ['persist', 'remove'])]
    private Collection $valuts;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->valuts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getParent(): ?Folder
    {
        return $this->parent;
    }

    public function setParent(?Folder $parent): static
    {
        $this->parent = $parent;
        return $this;
    }

    /**
     * @return Collection<int, Folder>
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(Folder $child): static
    {
        if (!$this->children->contains($child)) {
            $this->children[] = $child;
            $child->setParent($this);
        }
        return $this;
    }

    public function removeChild(Folder $child): static
    {
        if ($this->children->removeElement($child)) {
            if ($child->getParent() === $this) {
                $child->setParent(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, Valut>
     */
    public function getValuts(): Collection
    {
        return $this->valuts;
    }

    public function addValut(Valut $valut): static
    {
        if (!$this->valuts->contains($valut)) {
            $this->valuts[] = $valut;
            $valut->setFolder($this);
        }
        return $this;
    }

    public function removeValut(Valut $valut): static
    {
        if ($this->valuts->removeElement($valut)) {
            if ($valut->getFolder() === $this) {
                $valut->setFolder(null);
            }
        }
        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): static
    {
        $this->owner = $owner;
        return $this;
    }
}
