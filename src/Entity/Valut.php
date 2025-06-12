<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ValutRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;
use App\Controller\ValutController;
use DateTimeImmutable;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ValutRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/valuts',
            controller: \App\Controller\ValutController::class . '::getValuts',
            extraProperties: [
                'openapi' => [
                    'parameters' => [
                        [
                            'name' => 'folderId',
                            'in' => 'path',
                            'required' => false,
                            'schema' => ['type' => 'string'],
                            'description' => 'Folder id. If not provided, returns all valuts.'
                        ]
                    ],
                    'responses' => [
                        '200' => [
                            'description' => 'Returns a list of vaults',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'array',
                                        'items' => [
                                            'type' => 'object',
                                            'properties' => [
                                                'id' => ['type' => 'string'],
                                                'name' => ['type' => 'string'],
                                                'email' => ['type' => 'string'],
                                                'password' => ['type' => 'string'],
                                                'description' => ['type' => 'string'],
                                                'customFields' => [
                                                    'type' => 'array',
                                                    'items' => [
                                                        'type' => 'object',
                                                        'properties' => [
                                                            'name' => ['type' => 'string'],
                                                            'value' => ['type' => 'string'],
                                                        ]
                                                    ]
                                                ],
                                                'folderId' => ['type' => 'string'],
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
        new Get(),
        new Post(
            uriTemplate: '/valuts',
            controller: ValutController::class . '::createValut',
            name: 'api_valuts_post',
            read: false,
            write: true,
            validate: false,
            extraProperties: [
                'openapi' => [
                    'requestBody' => [
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'name' => ['type' => 'string'],
                                        'email' => ['type' => 'string'],
                                        'password' => ['type' => 'string'],
                                        'description' => ['type' => 'string'],
                                        'customFields' => [
                                            'type' => 'array',
                                            'items' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'name' => ['type' => 'string'],
                                                    'value' => ['type' => 'string'],
                                                ]
                                            ]
                                        ],
                                        'folderId' => ['type' => 'string'],
                                    ],
                                    'required' => ['name', 'email', 'password']
                                ]
                            ]
                        ]
                    ],
                    'responses' => [
                        '201' => [
                            'description' => 'Vault created',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'string'],
                                            'name' => ['type' => 'string'],
                                            'email' => ['type' => 'string'],
                                            'password' => ['type' => 'string'],
                                            'description' => ['type' => 'string'],
                                            'customFields' => [
                                                'type' => 'array',
                                                'items' => [
                                                    'type' => 'object',
                                                    'properties' => [
                                                        'name' => ['type' => 'string'],
                                                        'value' => ['type' => 'string'],
                                                    ]
                                                ]
                                            ],
                                            'folderId' => ['type' => 'string'],
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
                                        'email' => ['type' => 'string'],
                                        'password' => ['type' => 'string'],
                                        'description' => ['type' => 'string'],
                                        'customFields' => [
                                            'type' => 'array',
                                            'items' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'name' => ['type' => 'string'],
                                                    'value' => ['type' => 'string'],
                                                ]
                                            ]
                                        ],
                                        'folderId' => ['type' => 'string'],
                                    ]
                                ]
                            ]
                        ]
                    ],
                    'responses' => [
                        '200' => [
                            'description' => 'Vault updated',
                            'content' => [
                                'application/json' => [
                                    'schema' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'string'],
                                            'name' => ['type' => 'string'],
                                            'email' => ['type' => 'string'],
                                            'password' => ['type' => 'string'],
                                            'description' => ['type' => 'string'],
                                            'customFields' => [
                                                'type' => 'array',
                                                'items' => [
                                                    'type' => 'object',
                                                    'properties' => [
                                                        'name' => ['type' => 'string'],
                                                        'value' => ['type' => 'string'],
                                                    ]
                                                ]
                                            ],
                                            'folderId' => ['type' => 'string'],
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
class Valut
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Assert\Length(max: 1000)]
    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Assert\NotBlank]
    #[Assert\Length(min: 8, max: 255)]
    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $customFields = null;

    #[ORM\ManyToOne(targetEntity: Folder::class, inversedBy: 'valuts')]
    private ?Folder $folder = null;

    private const ENCRYPTION_KEY = 'replace_with_a_32_byte_base64_key'; // Use a secure key in production

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

    private function encrypt(string $plainText): string
    {
        $key = base64_decode(self::ENCRYPTION_KEY);
        $iv = random_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $encrypted = openssl_encrypt($plainText, 'aes-256-cbc', $key, 0, $iv);
        return base64_encode($iv . $encrypted);
    }

    private function decrypt(string $encryptedText): string
    {
        $key = base64_decode(self::ENCRYPTION_KEY);
        $data = base64_decode($encryptedText);
        $ivLength = openssl_cipher_iv_length('aes-256-cbc');
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);
        return openssl_decrypt($encrypted, 'aes-256-cbc', $key, 0, $iv);
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): ?string
    {
        if ($this->password === null) {
            return null;
        }
        return $this->decrypt($this->password);
    }

    public function setPassword(string $password): static
    {
        $this->password = $this->encrypt($password);
        return $this;
    }

    public function getCustomFields(): ?array
    {
        return $this->customFields;
    }

    public function setCustomFields(?array $customFields): static
    {
        $this->customFields = $customFields;
        return $this;
    }

    public function getFolder(): ?Folder
    {
        return $this->folder;
    }

    public function setFolder(?Folder $folder): static
    {
        $this->folder = $folder;
        return $this;
    }
}
